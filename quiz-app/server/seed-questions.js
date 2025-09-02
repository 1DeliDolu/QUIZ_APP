const mysql = require("mysql2/promise");

async function seedQuestions() {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "musta",
      password: "",
      database: "quiz_app",
      port: 3306,
    });

    console.log("🌱 Soru verileri ekleniyor...\n");

    // Sections ekle
    const sections = [
      { name: "Matematik" },
      { name: "Türkçe" },
      { name: "Fen Bilgisi" },
    ];

    for (const section of sections) {
      const [result] = await connection.execute(
        "INSERT INTO section (name) VALUES (?)",
        [section.name]
      );
      console.log(`✅ Section eklendi: ${section.name}`);
    }

    // Topics ekle
    const topics = [
      { sectionId: 1, name: "Toplama İşlemi" },
      { sectionId: 1, name: "Çıkarma İşlemi" },
      { sectionId: 2, name: "Noktalama İşaretleri" },
      { sectionId: 2, name: "Yazım Kuralları" },
      { sectionId: 3, name: "Canlı Cansız" },
      { sectionId: 3, name: "Su Döngüsü" },
    ];

    for (const topic of topics) {
      await connection.execute(
        "INSERT INTO topic (sectionId, name) VALUES (?, ?)",
        [topic.sectionId, topic.name]
      );
      console.log(`✅ Topic eklendi: ${topic.name}`);
    }

    // Questions ekle
    const questions = [
      {
        sectionId: 1,
        topicId: 1,
        text: "5 + 3 kaç eder?",
        choices: JSON.stringify(["6", "7", "8", "9"]),
        answerIndex: 2,
      },
      {
        sectionId: 1,
        topicId: 1,
        text: "12 + 8 kaç eder?",
        choices: JSON.stringify(["18", "19", "20", "21"]),
        answerIndex: 2,
      },
      {
        sectionId: 1,
        topicId: 2,
        text: "15 - 7 kaç eder?",
        choices: JSON.stringify(["6", "7", "8", "9"]),
        answerIndex: 2,
      },
      {
        sectionId: 2,
        topicId: 3,
        text: "Hangi cümlede nokta doğru kullanılmıştır?",
        choices: JSON.stringify([
          "Ali okula gitti.",
          "Ali okula gitti,",
          "Ali okula gitti!",
          "Ali okula gitti?",
        ]),
        answerIndex: 0,
      },
      {
        sectionId: 3,
        topicId: 5,
        text: "Hangi seçenek canlıdır?",
        choices: JSON.stringify(["Taş", "Ağaç", "Su", "Toprak"]),
        answerIndex: 1,
      },
    ];

    for (const question of questions) {
      await connection.execute(
        "INSERT INTO question (sectionId, topicId, text, choices, answerIndex) VALUES (?, ?, ?, ?, ?)",
        [
          question.sectionId,
          question.topicId,
          question.text,
          question.choices,
          question.answerIndex,
        ]
      );
      console.log(`✅ Soru eklendi: ${question.text.substring(0, 30)}...`);
    }

    console.log("\n🎉 Soru seed işlemi tamamlandı!");
  } catch (error) {
    console.error("❌ Seed hatası:", error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedQuestions();
