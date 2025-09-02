@echo off
echo 🚀 QUIZ App - Tam Sistem Başlatılıyor...
echo =========================================

echo 📡 Backend Server başlatılıyor (Port 4003)...
cd /d "d:\QUIZ_APP\quiz-app\server"
start "Backend Server" cmd /k "npm run dev"

timeout /t 3 /nobreak >nul

echo 🌐 Frontend Client başlatılıyor (Port 5173)...
cd /d "d:\QUIZ_APP\quiz-app\client"
start "Frontend Client" cmd /k "npm run dev"

timeout /t 2 /nobreak >nul

echo 🗄️ Prisma Studio başlatılıyor (Port 5555)...
cd /d "d:\QUIZ_APP\quiz-app\server"
start "Prisma Studio" cmd /k "npx prisma studio"

echo.
echo ✅ Tüm servisler başlatıldı!
echo 📡 Backend API: http://localhost:4003
echo 🌐 Frontend App: http://localhost:5173
echo 🗄️ Database Studio: http://localhost:5555
echo.
echo ❌ Durdurmak için tüm terminal pencerelerini kapatın.
pause
