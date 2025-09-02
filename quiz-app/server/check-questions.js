const mysql = require("mysql2/promise");

async function checkQuestions() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "musta",
      password: "",
      database: "quiz_app",
      port: 3306,
    });

    console.log("📊 Veritabanı tabloları kontrol ediliyor...\n");

    // Sections
    const [sections] = await connection.execute(
      "SELECT * FROM section ORDER BY id"
    );
    console.log(`📁 Section tablosu: ${sections.length} kayıt`);
    sections.forEach((section) => {
      console.log(`   ${section.id}. ${section.name}`);
    });
    console.log();

    // Topics
    const [topics] = await connection.execute(
      "SELECT * FROM topic ORDER BY id"
    );
    console.log(`📝 Topic tablosu: ${topics.length} kayıt`);
    topics.forEach((topic) => {
      console.log(
        `   ${topic.id}. ${topic.name} (Section: ${topic.sectionId})`
      );
    });
    console.log();

    // Questions
    const [questions] = await connection.execute(
      "SELECT * FROM question ORDER BY id"
    );
    console.log(`❓ Question tablosu: ${questions.length} kayıt`);
    questions.slice(0, 3).forEach((q) => {
      console.log(
        `   ${q.id}. ${q.text.substring(0, 50)}... (Section: ${
          q.sectionId
        }, Topic: ${q.topicId})`
      );
    });
    if (questions.length > 3) {
      console.log(`   ... ve ${questions.length - 3} kayıt daha`);
    }
  } catch (error) {
    console.error("❌ Hata:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

checkQuestions();
