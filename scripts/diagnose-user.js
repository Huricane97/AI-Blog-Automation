require("dotenv").config();
const axios = require("axios");

async function diagnoseUser() {
  console.log("🔍 Diagnosing WordPress User Issues...\n");

  try {
    // Test 1: Get user info via REST API
    console.log("1. Testing REST API user info...");
    const userResponse = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/users/me`,
      {
        auth: {
          username: process.env.WP_USER,
          password: process.env.WP_APP_PASS,
        },
      }
    );

    console.log("✅ User authenticated successfully");
    console.log(`   User ID: ${userResponse.data.id}`);
    console.log(`   Username: ${userResponse.data.slug}`);
    console.log(`   Display Name: ${userResponse.data.name}`);
    console.log(
      `   Roles: ${
        userResponse.data.roles ? userResponse.data.roles.join(", ") : "none"
      }`
    );
    console.log(
      `   Capabilities: ${
        userResponse.data.capabilities
          ? Object.keys(userResponse.data.capabilities).join(", ")
          : "none"
      }`
    );
    console.log();

    // Test 2: Try to get user by ID
    console.log("2. Testing user by ID...");
    try {
      const userByIdResponse = await axios.get(
        `${process.env.WP_URL}/wp-json/wp/v2/users/${userResponse.data.id}`
      );
      console.log("✅ User found by ID");
      console.log(
        `   Roles: ${
          userByIdResponse.data.roles
            ? userByIdResponse.data.roles.join(", ")
            : "none"
        }`
      );
    } catch (error) {
      console.log(
        "❌ Could not get user by ID:",
        error.response?.data?.message || error.message
      );
    }
    console.log();

    // Test 3: Check if user can access admin
    console.log("3. Testing admin access...");
    try {
      const adminResponse = await axios.get(
        `${process.env.WP_URL}/wp-json/wp/v2/posts?context=edit`,
        {
          auth: {
            username: process.env.WP_USER,
            password: process.env.WP_APP_PASS,
          },
        }
      );
      console.log("✅ User has admin access to posts");
    } catch (error) {
      console.log(
        "❌ User does not have admin access:",
        error.response?.data?.message || error.message
      );
    }
    console.log();

    // Test 4: Try to create a draft post
    console.log("4. Testing post creation...");
    try {
      const testPost = {
        title: "Test Post - Role Check",
        content: "<p>Testing user permissions...</p>",
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

      console.log("✅ Post creation successful!");
      console.log(`   Post ID: ${postResponse.data.id}`);
      console.log(`   Status: ${postResponse.data.status}`);

      // Clean up
      await axios.delete(
        `${process.env.WP_URL}/wp-json/wp/v2/posts/${postResponse.data.id}?force=true`,
        {
          auth: {
            username: process.env.WP_USER,
            password: process.env.WP_APP_PASS,
          },
        }
      );
      console.log("✅ Test post cleaned up");
    } catch (error) {
      console.log(
        "❌ Post creation failed:",
        error.response?.data?.message || error.message
      );
    }
  } catch (error) {
    console.error(
      "❌ Diagnosis failed:",
      error.response?.data || error.message
    );
  }

  console.log("\n🔧 Possible Solutions:");
  console.log("1. Clear WordPress cache if using caching plugins");
  console.log("2. Check if any security plugins are blocking API access");
  console.log("3. Verify user role in WordPress admin (Users → All Users)");
  console.log("4. Try creating a new user with Editor role");
  console.log("5. Check WordPress site health (Tools → Site Health)");
}

// Main execution
if (require.main === module) {
  diagnoseUser().catch(console.error);
}

module.exports = { diagnoseUser };
