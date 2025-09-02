const mysql = require("mysql2/promise");

async function createMustaUser() {
  let connection;

  try {
    // Root kullanıcısı ile bağlan
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "", // Root şifresi boşsa
      port: 3306,
    });

    console.log("✅ MySQL'e root olarak bağlandı");

    // Musta kullanıcısını oluştur
    await connection.execute(`DROP USER IF EXISTS 'musta'@'localhost'`);
    console.log("🗑️ Eski musta kullanıcısı silindi");

    await connection.execute(`CREATE USER 'musta'@'localhost'`);
    console.log("👤 musta kullanıcısı oluşturuldu");

    // Quiz_app için tam yetki ver
    await connection.execute(
      `GRANT ALL PRIVILEGES ON quiz_app.* TO 'musta'@'localhost'`
    );
    console.log("🔐 quiz_app veritabanı için yetkiler verildi");

    // Genel okuma yetkisi (isteğe bağlı)
    await connection.execute(`GRANT SELECT ON *.* TO 'musta'@'localhost'`);
    console.log("📖 Genel okuma yetkisi verildi");

    await connection.execute(`FLUSH PRIVILEGES`);
    console.log("🔄 Yetkiler güncellendi");

    // Kontrol et
    const [users] = await connection.execute(
      `SELECT User, Host FROM mysql.user WHERE User = 'musta'`
    );
    console.log("👥 Kullanıcı listesi:", users);

    const [grants] = await connection.execute(
      `SHOW GRANTS FOR 'musta'@'localhost'`
    );
    console.log("🔑 Yetkiler:");
    grants.forEach((grant) => {
      console.log("   -", Object.values(grant)[0]);
    });

    console.log("\n🎉 musta kullanıcısı başarıyla oluşturuldu!");
  } catch (error) {
    console.error("❌ Hata:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createMustaUser();
