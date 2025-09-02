const http = require("http");

async function testAPI(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:4003${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          status: res.statusCode,
          data: JSON.parse(data),
        });
      });
    });

    req.on("error", reject);
    req.setTimeout(5000, () => reject(new Error("Timeout")));
  });
}

async function testAllAPIs() {
  try {
    console.log("🧪 API testleri başlıyor...\n");

    // Sections test
    console.log("📁 Testing /api/sections:");
    const sections = await testAPI("/api/sections");
    console.log(`   Status: ${sections.status}`);
    console.log(`   Data: ${sections.data.length} section(s)`);
    sections.data.forEach((s) => console.log(`      ${s.id}. ${s.name}`));
    console.log();

    // Topics test
    console.log("📝 Testing /api/topics:");
    const topics = await testAPI("/api/topics");
    console.log(`   Status: ${topics.status}`);
    console.log(`   Data: ${topics.data.length} topic(s)`);
    topics.data
      .slice(0, 3)
      .forEach((t) =>
        console.log(`      ${t.id}. ${t.name} (Section: ${t.sectionId})`)
      );
    console.log();

    // Questions test
    console.log("❓ Testing /api/questions:");
    const questions = await testAPI("/api/questions");
    console.log(`   Status: ${questions.status}`);
    console.log(`   Data: ${questions.data.length} question(s)`);
    questions.data.slice(0, 2).forEach((q) => {
      console.log(`      ${q.id}. ${q.text.substring(0, 30)}...`);
      console.log(`         Choices: ${q.choices.join(", ")}`);
      console.log(`         Answer: ${q.answerIndex}`);
    });

    console.log("\n✅ Tüm API testleri başarılı!");
  } catch (error) {
    console.error("❌ API test hatası:", error.message);
  }
}

testAllAPIs();
