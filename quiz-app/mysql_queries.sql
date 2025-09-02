-- MySQL'den kayıtlı kullanıcıları bulmak için SQL sorguları

-- 1. Tüm kullanıcıları listele
SELECT * FROM User;

-- 2. Sadece belirli alanları göster
SELECT id, name, email, role, createdAt FROM User;

-- 3. Sadece admin kullanıcıları
SELECT * FROM User WHERE role = 'ADMIN';

-- 4. Sadece normal kullanıcıları  
SELECT * FROM User WHERE role = 'USER';

-- 5. Son kayıt olan kullanıcıları (son 7 gün)
SELECT * FROM User WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 7 DAY);

-- 6. Email adresi belirli bir domain'de olanlar
SELECT * FROM User WHERE email LIKE '%@quiz.com';

-- 7. Kullanıcı sayısını öğren
SELECT COUNT(*) as total_users FROM User;

-- 8. Rol bazında kullanıcı sayısı
SELECT role, COUNT(*) as count FROM User GROUP BY role;
