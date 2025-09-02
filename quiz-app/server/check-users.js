const mysql = require("mysql2/promise");

async function checkUsers() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "musta",
      password: "",
      database: "quiz_app",
      port: 3306,
    });

    console.log("📋 Kayıtlı kullanıcılar:");

    const [users] = await connection.execute(
      "SELECT id, email, name, role, createdAt FROM User ORDER BY id"
    );

    users.forEach((user) => {
      console.log(
        `${user.id}. ${user.name} (${user.email}) - ${
          user.role
        } [${user.createdAt.toLocaleString()}]`
      );
    });

    console.log(`\n✨ Toplam ${users.length} kullanıcı bulundu!`);
  } catch (error) {
    console.error("❌ Hata:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkUsers();
