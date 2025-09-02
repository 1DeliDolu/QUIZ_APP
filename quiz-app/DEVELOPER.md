tamam! shadcn/ui + Tailwind’i iskelete ekledim—canvas’ta tüm dosyalar ve örnek bileşenler hazır. şimdi terminalde şu adımları uygula:

## Kurulum komutları

```bash
# (proje klasöründeyken)
# Tailwind
npm i -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p

# Router ve yardımcılar
npm i react-router-dom

# shadcn/ui için gerekli paketler
npm i class-variance-authority clsx tailwind-merge lucide-react
npx shadcn@latest init
# sorular:
#  - Framework: React
#  - Typescript: Yes
#  - Alias: @/
#  - Style: default
#  - Base color: slate
#  - CSS file: src/index.css
```

### shadcn bileşenlerini ekle

```bash
npx shadcn@latest add button card navigation-menu scroll-area separator sheet input label badge toggle
```

## Dosya düzenlemeleri

* `vite.config.ts`, `tailwind.config.js`, `src/index.css`, `components.json`, `src/lib/utils.ts` ve temel sayfa/komponent dosyaları **canvas**’ta hazır. Kopyala/yapıştır veya aynen oluştur.

## Çalıştır

```bash
npm run dev
```

> Sol tarafta **Sidebar** (bölümler), üstte **Header** (Yanlış Sorular / Yeni Sınav) ve sayfa iskeleti çalışır durumda. Sonraki adımda quiz akışını ve IndexedDB (yanlış soru havuzu) kısmını bağlayabiliriz.


tamam! shadcn/ui + Tailwind’i iskelete ekledim—canvas’ta tüm dosyalar ve örnek bileşenler hazır. şimdi terminalde şu adımları uygula:

## Kurulum komutları

```bash
# (proje klasöründeyken)
# Tailwind
npm i -D tailwindcss postcss autoprefixer tailwindcss-animate
npx tailwindcss init -p

# Router ve yardımcılar
npm i react-router-dom

# shadcn/ui için gerekli paketler
npm i class-variance-authority clsx tailwind-merge lucide-react
npx shadcn@latest init
# sorular:
#  - Framework: React
#  - Typescript: Yes
#  - Alias: @/
#  - Style: default
#  - Base color: slate
#  - CSS file: src/index.css
```

### shadcn bileşenlerini ekle

```bash
npx shadcn@latest add button card navigation-menu scroll-area separator sheet input label badge toggle
```

## Dosya düzenlemeleri

* `vite.config.ts`, `tailwind.config.js`, `src/index.css`, `components.json`, `src/lib/utils.ts` ve temel sayfa/komponent dosyaları **canvas**’ta hazır. Kopyala/yapıştır veya aynen oluştur.

## Çalıştır

```bash
npm run dev
```

> Sol tarafta **Sidebar** (bölümler), üstte **Header** (Yanlış Sorular / Yeni Sınav) ve sayfa iskeleti çalışır durumda. Sonraki adımda quiz akışını ve IndexedDB (yanlış soru havuzu) kısmını bağlayabiliriz.


süper—tüm soruların **DB’den okunması** ve **yanlışların ayrı tabloda tutulması** için iskeleti canvas’a ekledim:

* `Dexie` ile 4 tablo: `sections`, `topics`, `questions`, `wrong`.
* `seedIfEmpty()` ile örnek veri (istersen JSON’dan toplu importa çevirebilirsin).
* `useQuiz(topicId)` hook’u: soruları **DB’den** çeker, cevap gönderildiğinde yanlışsa `wrong` tablosuna yazar.
* `getWrongQuestions()` ve `clearWrongPool()` ile **Yanlış Soru Havuzu** sayfası.
* `TopicPage` üzerinde canlı örnek akış; `ReviewWrongPage` yanlışları listeler.

### Yapman gereken ek kurulum

```bash
npm i dexie
```

### Veri modelin

* `questions`: `{ id, sectionId, topicId, text, choices[], answerIndex }`
* `wrong`: `{ id(auto), questionId, sectionId, topicId, chosenIndex, correctIndex, lastSeenAt, timesWrong }`

İstersen `seedIfEmpty()` yerine kendi **JSON**/API’den yükleme yazalım; tablo indekslerini (örn. `questions: 'id, topicId, sectionId'`) büyüyen dataset için optimize edebiliriz.
Devam—hangi formatta (JSON/CSV/API) soruları içeri alacağız?
