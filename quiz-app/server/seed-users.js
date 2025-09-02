const mysql = require("mysql2/promise");

async function seedUsers() {
  let connection;

  try {
    // Veritabanına bağlan
    connection = await mysql.createConnection({
      host: "localhost",
      user: "musta",
      password: "",
      database: "quiz_app",
      port: 3306,
    });

    console.log("🌱 Seed verisi ekleniyor...");

    // Test kullanıcıları
    const testUsers = [
      {
        email: "admin@quiz.com",
        name: "Admin User",
        password: "admin123",
        role: "ADMIN",
      },
      {
        email: "user@quiz.com",
        name: "Test User",
        password: "user123",
        role: "USER",
      },
      {
        email: "john@example.com",
        name: "John Doe",
        password: "john123",
        role: "USER",
      },
    ];

    // Kullanıcıları ekle
    for (const userData of testUsers) {
      try {
        // Kullanıcı var mı kontrol et
        const [existing] = await connection.execute(
          "SELECT id FROM User WHERE email = ?",
          [userData.email]
        );

        if (existing.length === 0) {
          await connection.execute(
            "INSERT INTO User (email, name, password, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())",
            [userData.email, userData.name, userData.password, userData.role]
          );
          console.log(`✅ Kullanıcı eklendi: ${userData.email}`);
        } else {
          console.log(`⏭️ Kullanıcı zaten mevcut: ${userData.email}`);
        }
      } catch (err) {
        console.log(
          `❌ Kullanıcı eklenirken hata: ${userData.email} - ${err.message}`
        );
      }
    }

    console.log("🎉 Seed işlemi tamamlandı!");
  } catch (error) {
    console.error("❌ Seed hatası:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedUsers();
