require("dotenv").config();
const axios = require("axios");

async function testAuth() {
  console.log("🔐 Testing WordPress Authentication...\n");

  console.log("Configuration:");
  console.log(`   URL: ${process.env.WP_URL}`);
  console.log(`   User: ${process.env.WP_USER}`);
  console.log(
    `   App Password: ${process.env.WP_APP_PASS ? "***" : "NOT SET"}\n`
  );

  try {
    // Test basic REST API access first
    console.log("1. Testing REST API access...");
    const apiResponse = await axios.get(`${process.env.WP_URL}/wp-json/`);
    console.log("✅ REST API is accessible");
    console.log(`   Site Name: ${apiResponse.data.name}\n`);

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

    console.log("✅ Authentication successful!");
    console.log(`   User: ${authResponse.data.name}`);
    console.log(`   User ID: ${authResponse.data.id}`);
    console.log(
      `   Roles: ${
        authResponse.data.roles ? authResponse.data.roles.join(", ") : "none"
      }`
    );
    console.log(`   Email: ${authResponse.data.email}`);

    // Check capabilities
    const capabilities = authResponse.data.capabilities || {};
    console.log("\n3. User Capabilities:");
    console.log(`   Can edit posts: ${capabilities.edit_posts ? "✅" : "❌"}`);
    console.log(
      `   Can publish posts: ${capabilities.publish_posts ? "✅" : "❌"}`
    );
    console.log(
      `   Can delete posts: ${capabilities.delete_posts ? "✅" : "❌"}`
    );

    if (capabilities.edit_posts || capabilities.publish_posts) {
      console.log("\n🎉 User has permission to create posts!");
    } else {
      console.log("\n⚠️  User does NOT have permission to create posts");
      console.log("   You need to change the user role to Editor or Author");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log("\n💡 Authentication failed. Common issues:");
      console.log("   1. Application password is incorrect");
      console.log("   2. Application password format is wrong");
      console.log("   3. User does not exist");
      console.log("\n🔧 How to fix:");
      console.log("   1. Go to WordPress Admin → Users → Profile");
      console.log('   2. Scroll to "Application Passwords"');
      console.log("   3. Create a new application password");
      console.log("   4. Copy the exact password (with spaces)");
      console.log("   5. Update your .env file");
    } else if (error.response?.status === 404) {
      console.log("\n💡 REST API not found. Please check:");
      console.log("   - WP_URL is correct");
      console.log("   - REST API is enabled");
    }
  }
}

// Main execution
if (require.main === module) {
  testAuth().catch(console.error);
}

module.exports = { testAuth };
