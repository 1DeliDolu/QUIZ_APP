import { useEffect, useMemo, useState } from "react";
import { useAuth } from '../contexts/AuthContext';

interface Section {
  id: number;
  name: string;
}

interface Topic {
  id: number;
  name: string;
  sectionId: number;
}

const API_BASE_URL = 'http://localhost:4006/api';

export default function CmsPage() {
  const { isAdmin, isAuthenticated } = useAuth();
  const [sections, setSections] = useState<Section[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sectionId, setSectionId] = useState<number | "new">();
  const [topicId, setTopicId] = useState<number | "new">();
  const [newSectionName, setNewSectionName] = useState("");
  const [newTopicName, setNewTopicName] = useState("");
  const [text, setText] = useState("");
  const [choices, setChoices] = useState<string[]>(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  // Hooks'lar her zaman çağrılmalı - koşullu olmamalı
  const filteredTopics = useMemo(() => {
    if (!sectionId || sectionId === "new") return topics;
    return topics.filter((t) => t.sectionId === sectionId);
  }, [topics, sectionId]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('🔄 CMS: Veri çekiliyor...');
        console.log('🔑 Auth durumu:', { isAuthenticated, isAdmin });

        setDataLoading(true);

        // Sections'ı çek
        console.log('📁 Sections çekiliyor...');
        const sectionsResponse = await fetch(`${API_BASE_URL}/sections`);
        console.log('📁 Sections response:', sectionsResponse.status);
        if (!sectionsResponse.ok) throw new Error('Sections yüklenemedi');
        const sectionsData = await sectionsResponse.json();
        console.log('📁 Sections data:', sectionsData.length, 'kayıt');
        setSections(sectionsData);

        // Topics'i çek
        console.log('📝 Topics çekiliyor...');
        const topicsResponse = await fetch(`${API_BASE_URL}/topics`);
        console.log('📝 Topics response:', topicsResponse.status);
        if (!topicsResponse.ok) throw new Error('Topics yüklenemedi');
        const topicsData = await topicsResponse.json();
        console.log('📝 Topics data:', topicsData.length, 'kayıt');
        setTopics(topicsData);

        console.log('✅ CMS: Veri yükleme tamamlandı');

      } catch (error: any) {
        console.error('❌ CMS: Data fetch error:', error);
        setMessage('Veri yüklenirken hata oluştu: ' + error.message);
      } finally {
        setDataLoading(false);
      }
    }

    console.log('🚀 CMS: useEffect çalışıyor', { isAuthenticated, isAdmin });

    if (isAuthenticated && isAdmin) {
      fetchData();
    } else {
      setDataLoading(false);
    }
  }, [isAuthenticated, isAdmin]);

  // Yetki kontrolü - hooks'lardan sonra
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h2 className="text-xl font-semibold mb-2">Erişim Engellendi</h2>
          <p>Bu sayfaya erişim için admin yetkisine sahip olmanız gerekir.</p>
          {!isAuthenticated && <p className="mt-2">Lütfen giriş yapın.</p>}
        </div>
      </div>
    );
  }

  async function ensureSection(): Promise<number> {
    if (sectionId === "new") {
      const name = newSectionName.trim();
      if (!name) throw new Error("Bölüm adı gerekli");

      const response = await fetch(`${API_BASE_URL}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });

      if (!response.ok) throw new Error('Bölüm oluşturulamadı');
      const newSection = await response.json();

      setSections(prev => [...prev, newSection]);
      setSectionId(newSection.id);
      setNewSectionName('');
      return newSection.id;
    }
    if (!sectionId) throw new Error("Bölüm seçiniz");
    return sectionId;
  }

  async function ensureTopic(secId: number): Promise<number> {
    if (topicId === "new") {
      const name = newTopicName.trim();
      if (!name) throw new Error("Sınav/Konu adı gerekli");

      const response = await fetch(`${API_BASE_URL}/topics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, sectionId: secId })
      });

      if (!response.ok) throw new Error('Konu oluşturulamadı');
      const newTopic = await response.json();

      setTopics(prev => [...prev, newTopic]);
      setTopicId(newTopic.id);
      setNewTopicName('');
      return newTopic.id;
    }
    if (!topicId) throw new Error("Sınav/Konu seçiniz");
    return topicId;
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      const secId = await ensureSection();
      const topId = await ensureTopic(secId);
      const qText = text.trim();
      const opts = choices.map((c) => c.trim());
      if (!qText) throw new Error("Soru metni gerekli");
      if (opts.some((c) => !c)) throw new Error("Tüm şıklar doldurulmalı");

      const response = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: qText,
          choices: opts,
          answerIndex,
          sectionId: secId,
          topicId: topId
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Soru kaydedilemedi');
      }

      const savedQuestion = await response.json();

      setText("");
      setChoices(["", "", "", ""]);
      setAnswerIndex(0);
      setMessage(`Soru başarıyla kaydedildi (ID: ${savedQuestion.id})`);
    } catch (err: any) {
      setMessage(err.message || "Kaydetme hatası");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center mb-2">📝 Soru Yönetim Paneli</h1>
        <p className="text-gray-600 text-center">Yeni sorular ekleyin ve mevcut içerikleri yönetin</p>
      </div>

      {/* Status Bar */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">API Bağlantısı: Aktif</span>
            </div>
            <div className="text-sm text-gray-600">
              📊 {sections.length} Bölüm, {topics.length} Konu mevcut
            </div>
          </div>
          {dataLoading && (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <span className="text-sm">Veriler güncelleniyor...</span>
            </div>
          )}
        </div>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`mb-4 p-4 rounded-lg ${message.includes('başarıyla') || message.includes('kaydedildi')
          ? 'bg-green-100 border border-green-400 text-green-700'
          : 'bg-red-100 border border-red-400 text-red-700'
          }`}>
          <div className="flex items-center">
            <span className="mr-2">
              {message.includes('başarıyla') ? '✅' : '❌'}
            </span>
            {message}
          </div>
        </div>
      )}

      <form onSubmit={onSave} className="space-y-6">
        {/* Section ve Topic Seçimi */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            🗂️ Kategori Seçimi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Bölüm</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sectionId as any}
                onChange={(e) => {
                  const v = e.target.value;
                  setSectionId(v === "new" ? "new" : Number(v));
                  setTopicId(undefined); // Reset topic when section changes
                }}
              >
                <option value="">📁 Bölüm seçiniz</option>
                {sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    📂 {s.name}
                  </option>
                ))}
                <option value="new">➕ Yeni Bölüm Oluştur</option>
              </select>
              {sectionId === "new" && (
                <input
                  className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yeni bölüm adını giriniz..."
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Sınav/Konu</label>
              <select
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={topicId as any}
                onChange={(e) => {
                  const v = e.target.value;
                  setTopicId(v === "new" ? "new" : Number(v));
                }}
              >
                <option value="">📝 Konu seçiniz</option>
                {filteredTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    📄 {t.name}
                  </option>
                ))}
                <option value="new">➕ Yeni Konu Oluştur</option>
              </select>
              {topicId === "new" && (
                <input
                  className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yeni konu adını giriniz..."
                  value={newTopicName}
                  onChange={(e) => setNewTopicName(e.target.value)}
                />
              )}
            </div>
          </div>
        </div>

        {/* Soru İçeriği */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            ❓ Soru İçeriği
          </h2>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Soru Metni</label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Sorunuzu buraya yazınız..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>

        {/* Cevap Seçenekleri */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            🎯 Cevap Seçenekleri
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {choices.map((c, idx) => (
              <div key={idx} className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  🔤 Seçenek {String.fromCharCode(65 + idx)}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    className="flex-1 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`${String.fromCharCode(65 + idx)} seçeneğini giriniz...`}
                    value={c}
                    onChange={(e) => {
                      const next = [...choices];
                      next[idx] = e.target.value;
                      setChoices(next);
                    }}
                  />
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={idx}
                    checked={answerIndex === idx}
                    onChange={() => setAnswerIndex(idx)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-xs text-gray-500">Doğru</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${saving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02]"
              }`}
          >
            {saving ? (
              <span className="flex items-center justify-center">
                🔄 Kaydediliyor...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                💾 Soruyu Kaydet
              </span>
            )}
          </button>

          {message && (
            <div className="mt-3 text-center text-sm text-gray-600 bg-blue-50 p-2 rounded">
              ℹ️ {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

