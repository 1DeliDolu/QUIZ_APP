-- MySQL'de musta kullanıcısını oluştur ve yetkiler ver

-- Kullanıcı var mı kontrol et ve sil
DROP USER IF EXISTS 'musta'@'localhost';

-- Yeni kullanıcı oluştur (şifresiz)
CREATE USER 'musta'@'localhost';

-- Quiz_app veritabanı için tam yetki ver
GRANT ALL PRIVILEGES ON quiz_app.* TO 'musta'@'localhost';

-- Tüm veritabanları için okuma yetkisi ver (isteğe bağlı)
GRANT SELECT ON *.* TO 'musta'@'localhost';

-- Yetkileri uygula
FLUSH PRIVILEGES;

-- Kullanıcıyı listele
SELECT User, Host FROM mysql.user WHERE User = 'musta';

-- Yetkileri kontrol et  
SHOW GRANTS FOR 'musta'@'localhost';
