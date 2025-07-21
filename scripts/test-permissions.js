require("dotenv").config();
const axios = require("axios");

async function testUserPermissions() {
  console.log("🔍 Testing WordPress user permissions...\n");

  try {
    // Test 1: Get current user info
    console.log("1. Testing user authentication...");
    const userResponse = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/users/me`,
      {
        auth: {
          username: process.env.WP_USER,
          password: process.env.WP_APP_PASS,
        },
      }
    );

    console.log("✅ Authentication successful");
    console.log(`   User: ${userResponse.data.name}`);
    console.log(`   User ID: ${userResponse.data.id}`);
    console.log(`   Roles: ${userResponse.data.roles.join(", ")}`);
    console.log(
      `   Capabilities: ${Object.keys(userResponse.data.capabilities).join(
        ", "
      )}\n`
    );

    // Test 2: Check if user can create posts
    console.log("2. Testing post creation permissions...");
    const canCreatePosts =
      userResponse.data.capabilities["edit_posts"] ||
      userResponse.data.capabilities["publish_posts"];

    if (canCreatePosts) {
      console.log("✅ User has permission to create posts");
    } else {
      console.log("❌ User does NOT have permission to create posts");
      console.log("💡 Required capabilities: edit_posts or publish_posts");
    }

    // Test 3: Test actual post creation (draft)
    console.log("\n3. Testing actual post creation (draft)...");
    const testPost = {
      title: "Test Post - Permission Check",
      content: "<p>This is a test post to check permissions.</p>",
      status: "draft",
    };

    const postResponse = await axios.post(
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
    console.log(`   Post ID: ${postResponse.data.id}`);
    console.log(`   Status: ${postResponse.data.status}`);

    // Clean up: Delete the test post
    console.log("\n4. Cleaning up test post...");
    await axios.delete(
      `${process.env.WP_URL}/wp-json/wp/v2/posts/${postResponse.data.id}?force=true`,
      {
        auth: {
          username: process.env.WP_USER,
          password: process.env.WP_APP_PASS,
        },
      }
    );
    console.log("✅ Test post deleted");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log("\n💡 Authentication failed. Please check:");
      console.log("   - WP_USER is correct");
      console.log("   - WP_APP_PASS is correct");
      console.log("   - Application password has proper permissions");
    } else if (error.response?.status === 403) {
      console.log("\n💡 Permission denied. Please check:");
      console.log("   - User role should be Editor, Author, or Administrator");
      console.log('   - User needs "edit_posts" or "publish_posts" capability');
    }
  }
}

// Main execution
async function main() {
  console.log("🚀 WordPress Permission Test\n");
  console.log("Configuration:");
  console.log(`   URL: ${process.env.WP_URL}`);
  console.log(`   User: ${process.env.WP_USER}`);
  console.log(
    `   App Password: ${process.env.WP_APP_PASS ? "***" : "NOT SET"}\n`
  );

  await testUserPermissions();

  console.log("\n✨ Permission test completed!");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testUserPermissions };
