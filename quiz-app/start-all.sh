#!/bin/bash

echo "🚀 QUIZ App - Tam Sistem Başlatılıyor..."
echo "========================================="

# Backend Server başlat (Port 4000)
echo "📡 Backend Server başlatılıyor (Port 4000)..."
cd "d:/QUIZ_APP/quiz-app/server"
start cmd /k "npm run dev"

# Kısa bekleme
sleep 3

# Frontend Client başlat (Port 5174) 
echo "🌐 Frontend Client başlatılıyor (Port 5174)..."
cd "d:/QUIZ_APP/quiz-app/client"
start cmd /k "npm run dev"

# Prisma Studio başlat (Port 5555)
echo "🗄️ Prisma Studio başlatılıyor (Port 5555)..."
cd "d:/QUIZ_APP/quiz-app/server"
start cmd /k "npx prisma studio"

echo ""
echo "✅ Tüm servisler başlatıldı!"
echo "📡 Backend API: http://localhost:4003"
echo "🌐 Frontend App: http://localhost:5173" 
echo "🗄️ Database Studio: http://localhost:5555"
echo ""
echo "❌ Durdurmak için tüm terminal pencerelerini kapatın."
