# 🚀 QUIZ App - Başlatma Talimatları

## 📋 Port Konfigürasyonu

- **Backend Server**: `http://localhost:4000`
- **Frontend Client**: `http://localhost:5174`
- **Database Studio**: `http://localhost:5555`

## 🎮 Başlatma Yöntemleri

### Yöntem 1: Otomatik Başlatma (Önerilen)

```bash
# Windows'da çift tıklayın
start-all.bat
```

### Yöntem 2: NPM Script

```bash
npm run start-all
```

### Yöntem 3: Manuel Başlatma

```bash
# Terminal 1: Backend Server (Port 4000)
cd server
npm run dev

# Terminal 2: Frontend Client (Port 5174)
cd client
npm run dev

# Terminal 3: Database Studio (Port 5555)
cd server
npx prisma studio
```

### Yöntem 4: Concurrently (Tek Terminal)

```bash
npm run start-dev
```

## 🗂️ Servis Detayları

### 🔗 Backend API Endpoints

- `GET /api/auth/users` - Tüm kullanıcıları listele
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `GET /api/sections` - Quiz bölümleri
- `GET /api/topics` - Quiz konuları
- `GET /api/questions` - Quiz soruları

### 🌐 Frontend Sayfaları

- `/` - Ana sayfa
- `/login` - Giriş sayfası
- `/register` - Kayıt sayfası
- `/cms` - Yönetim paneli (sadece admin)
- `/debug` - Debug sayfası (login gerekli)

### 🗄️ Veritabanı

- **MySQL** - Ana veritabanı
- **Prisma Studio** - Veritabanı yönetim arayüzü
- **Models**: User, Section, Topic, Question, WrongAnswer

## 🔧 Geliştirme Notları

### Demo Kullanıcılar

- **Admin**: `admin@quiz.com` / `admin123`
- **User**: `user@quiz.com` / `user123`

### Port Çakışması Durumunda

```bash
# Port 4000 kullanımda ise
netstat -ano | findstr :4000
taskkill /F /PID <PID_NO>

# Veya farklı port kullan
PORT=4000 npm run dev:server
```

## 📊 Veritabanı Kontrol

### Prisma Studio

- URL: `http://localhost:5555`
- Görsel veritabanı yönetimi

### Debug Sayfası

- URL: `http://localhost:5174/debug`
- Kayıtlı kullanıcıları görüntüle
- API test komutları

### MySQL CLI

```sql
USE quiz_app;
SELECT * FROM User;
SELECT COUNT(*) FROM User;
```

## ⚠️ Troubleshooting

### 1. Server başlamıyor

- Port çakışması: `netstat -ano | findstr :4000`
- Dependencies: `npm install` her iki klasörde

### 2. Veritabanı bağlantı hatası

- MySQL çalışıyor mu: `mysql -u root -p`
- .env dosyası var mı: `DATABASE_URL`

### 3. Frontend açılmıyor

- Port 5174 boş mu: `netstat -ano | findstr :5174`
- Dependencies: `cd client && npm install`

## 🔄 Güncellemeler

```bash
# Dependencies güncelle
npm update

# Database migration
cd server
npx prisma db push
npx prisma generate
```
