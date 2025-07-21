require("dotenv").config();
const axios = require("axios");

async function testWordPressConnection() {
  console.log("🔍 Testing WordPress connection...\n");

  try {
    // Test basic REST API access
    console.log("1. Testing REST API access...");
    const apiResponse = await axios.get(`${process.env.WP_URL}/wp-json/`);
    console.log("✅ REST API is accessible");
    console.log(`   Site Name: ${apiResponse.data.name}`);
    console.log(`   Site URL: ${apiResponse.data.url}\n`);

    // Test authentication
    console.log("2. Testing authentication...");
    const authResponse = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/users/me`,
      {
        auth: {
          username: process.env.WP_USER,
          password: process.env.WP_APP_PASS,
        },
      }
    );
    console.log("✅ Authentication successful");
    console.log(`   User: ${authResponse.data.name}`);
    console.log(`   User ID: ${authResponse.data.id}\n`);

    // Test categories
    console.log("3. Testing categories...");
    const categoriesResponse = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/categories`
    );
    console.log("✅ Categories accessible");
    console.log("   Available categories:");
    categoriesResponse.data.forEach((cat) => {
      console.log(`   - ID: ${cat.id}, Name: ${cat.name}`);
    });
    console.log();

    // Test tags
    console.log("4. Testing tags...");
    const tagsResponse = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/tags`
    );
    console.log("✅ Tags accessible");
    console.log("   Available tags:");
    tagsResponse.data.slice(0, 5).forEach((tag) => {
      console.log(`   - ID: ${tag.id}, Name: ${tag.name}`);
    });
    console.log();

    console.log(
      "🎉 All tests passed! Your WordPress setup is ready for automation."
    );
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log("\n💡 Authentication failed. Please check:");
      console.log("   - WP_USER is correct");
      console.log("   - WP_APP_PASS is correct");
      console.log("   - Application password has proper permissions");
    } else if (error.response?.status === 404) {
      console.log("\n💡 REST API not found. Please check:");
      console.log("   - WP_URL is correct");
      console.log("   - REST API is enabled on your WordPress site");
    }
  }
}

async function createTestPost() {
  console.log("📝 Creating test post...\n");

  try {
    const testPost = {
      title: "Test Post - AI Blog Automation",
      content:
        "<p>This is a test post created by the AI Blog Automation system.</p><p>If you can see this post, your setup is working correctly!</p>",
      status: "draft",
    };

    const response = await axios.post(
      `${process.env.WP_URL}/wp-json/wp/v2/posts`,
      testPost,
      {
        auth: {
          username: process.env.WP_USER,
          password: process.env.WP_APP_PASS,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Test post created successfully!");
    console.log(`   Post ID: ${response.data.id}`);
    console.log(`   Post URL: ${response.data.link}`);
    console.log(`   Status: ${response.data.status}`);
  } catch (error) {
    console.error(
      "❌ Failed to create test post:",
      error.response?.data || error.message
    );
  }
}

// Main execution
async function main() {
  console.log("🚀 WordPress Setup Test\n");
  console.log("Configuration:");
  console.log(`   URL: ${process.env.WP_URL}`);
  console.log(`   User: ${process.env.WP_USER}`);
  console.log(
    `   App Password: ${process.env.WP_APP_PASS ? "***" : "NOT SET"}`
  );
  console.log(`   Category ID: ${process.env.WP_CATEGORY_ID || "NOT SET"}`);
  console.log(`   Tags: ${process.env.WP_TAGS || "NOT SET"}\n`);

  await testWordPressConnection();

  console.log("\n" + "=".repeat(50) + "\n");

  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    "Would you like to create a test post? (y/n): ",
    async (answer) => {
      if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
        await createTestPost();
      }
      rl.close();
      console.log("\n✨ Setup test completed!");
    }
  );
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testWordPressConnection, createTestPost };
