const http = require("http");

async function testAPI(path) {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://localhost:4006${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode,
            data: JSON.parse(data),
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: data,
          });
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(5000, () => reject(new Error("Timeout")));
  });
}

async function testCmsAPI() {
  try {
    console.log("🧪 CMS API testleri başlıyor...\n");

    // Sections test
    console.log("📁 Testing /api/sections:");
    const sections = await testAPI("/api/sections");
    console.log(`   Status: ${sections.status}`);
    if (sections.data.length) {
      console.log(`   Data: ${sections.data.length} section(s)`);
      sections.data
        .slice(0, 2)
        .forEach((s) => console.log(`      ${s.id}. ${s.name}`));
    } else {
      console.log("   Data: No sections found");
    }
    console.log();

    // Auth users test
    console.log("👥 Testing /api/auth/users:");
    const users = await testAPI("/api/auth/users");
    console.log(`   Status: ${users.status}`);
    if (users.data.success && users.data.users) {
      console.log(`   Data: ${users.data.users.length} user(s)`);
      users.data.users
        .slice(0, 2)
        .forEach((u) =>
          console.log(`      ${u.name} (${u.email}) - ${u.role}`)
        );
    } else {
      console.log("   Data:", users.data);
    }

    console.log("\n✅ CMS API testleri tamamlandı!");
  } catch (error) {
    console.error("❌ CMS API test hatası:", error.message);
  }
}

testCmsAPI();
