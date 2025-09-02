# Proje yürütme notları (Lauf des Project)

Bu dosya repository içinde yapılmış ana değişiklikleri, çalışma talimatlarını ve sonraki adımları kısaca özetler.

## Kısa özet

- Proje Vite + React + TypeScript frontend (`client/`) ve Express + Prisma + MySQL backend (`server/`) olarak yapılandırıldı.
- Lokal geliştirme için client ve server paralel çalıştırılabilir (root `npm run dev`).
- Frontend ilk aşamada Dexie (IndexedDB) desteği ile geliyordu; backend eklendi ve `useQuiz` API'ye bağlanacak biçimde güncellenebilir.

## Önemli eklenen/düzenlenen dosyalar

- `client/` - frontend uygulaması (kopyalanmış Vite proje)
  - `client/package.json`, `client/vite.config.ts`, `client/index.html`, `client/postcss.config.cjs`, `client/tailwind.config.js`
  - `client/src/` — `main.tsx`, `App.tsx`, `index.css`, `App.css`, `assets/` vb.
- `server/` - backend scaffold
  - `server/package.json`, `server/tsconfig.json`, `server/.env.example`, `server/.env` (lokal olarak oluşturuldu)
  - `server/prisma/schema.prisma` — Prisma modelleri: `Section`, `Topic`, `Question`, `WrongAnswer`
  - `server/src/index.ts` — basit REST API uç noktaları: `/api/sections`, `/api/topics`, `/api/questions`, `/api/wrong`
  - `server/src/seed.ts` — örnek veri ekleme scripti
- Root-level değişiklikler
  - `package.json` — monorepo yardımcı scriptleri eklendi (`dev`, `dev:client`, `dev:server`) ve `concurrently` dev-dependency
  - `components.json` (shadcn placeholder)
  - `src/lib/db.ts`, `src/lib/types.ts`, `src/hooks/useQuiz.ts` — local Dexie DB ve hook (frontend içinde kullanılmak üzere kopyalandı/eklendi)

## Hızlı kurulum & çalıştırma

Ön koşul: Node.js ve npm kurulu; backend için lokal MySQL erişimin hazır olması önerilir.

1. Root, client ve server bağımlılıklarını yükle

```bash
cd /d/ISTQB/quiz-app
npm install           # root (concurrently vs. dev helper)
cd client && npm install
cd ../server && npm install
```

2. Local MySQL kullanıyorsan `server/.env` dosyasını ayarla (örnek zaten: `server/.env` içinde `DATABASE_URL="mysql://root@127.0.0.1:3306/quiz_app"` olarak eklendi). Eğer MySQL yoksa isteğe bağlı olarak Prisma'yı SQLite'a çevirebilirim.

3. Prisma client oluştur, migrate ve seed çalıştır

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

4. Geliştirme sunucularını paralel başlat (root'tan)

```bash
cd /d/ISTQB/quiz-app
npm run dev
```

## Doğrulama

- Frontend: http://localhost:5175/ (Vite dev URL) — sayfa açılmalı.
- Backend: http://localhost:4000/api/sections — seed ile eklenen bölümler JSON olarak dönmeli.

## Bilinen noktalar / notlar

- `client/postcss.config.cjs` kullanıldı — `module.exports` PostCSS konfigürasyonu ESM ortamında hata veriyordu, `.cjs` ile düzeltildi.
- `server/.env` yerel MySQL bağlantısı içindir; üretim değerlerini `.env` içinde saklamayın.
- Bazı root `src/` dosyaları taşıma sırasında korunmuş olabilir; istemezseniz kaldırılabilir.

## Önerilen sonraki adımlar

1. `client/src/hooks/useQuiz.ts`'i Dexie yerine `server` API'sini kullanan versiyona güncelle (ben yapabilirim).
2. `shadcn/ui` bileşenlerini tam olarak kurup `client/src/components/ui/` içine ekle.
3. İsteğe bağlı: `server`'ı SQLite'ya çevirerek local geliştirmeyi Docker/MySQL gerektirmeden kolaylaştır.

## Kısa ileti

Herhangi bir adımı otomatik olarak yapmamı istersen (ör. API bağlama, SQLite geçişi, shadcn bileşenleri ekleme), hangi adımı istediğini söyle; ben uygularım.
