require("dotenv").config();
const axios = require("axios");

async function debugAuth() {
  console.log("🔍 WordPress Authentication Debug\n");

  console.log("Current Configuration:");
  console.log(`   URL: ${process.env.WP_URL}`);
  console.log(`   User: ${process.env.WP_USER}`);
  console.log(
    `   App Password Length: ${
      process.env.WP_APP_PASS ? process.env.WP_APP_PASS.length : 0
    } characters`
  );
  console.log(
    `   App Password Contains Spaces: ${
      process.env.WP_APP_PASS ? process.env.WP_APP_PASS.includes(" ") : false
    }`
  );
  console.log(
    `   App Password Format: ${
      process.env.WP_APP_PASS
        ? process.env.WP_APP_PASS.replace(/./g, "*")
        : "NOT SET"
    }\n`
  );

  try {
    // Test 1: Basic REST API access
    console.log("1. Testing REST API access...");
    const apiResponse = await axios.get(`${process.env.WP_URL}/wp-json/`);
    console.log("✅ REST API is accessible");
    console.log(`   Site Name: ${apiResponse.data.name}`);
    console.log(`   Site URL: ${apiResponse.data.url}`);
    console.log(
      `   REST API Version: ${apiResponse.data.namespaces.join(", ")}\n`
    );

    // Test 2: Check if user exists
    console.log("2. Testing if user exists...");
    try {
      const usersResponse = await axios.get(
        `${process.env.WP_URL}/wp-json/wp/v2/users?search=${process.env.WP_USER}`
      );
      if (usersResponse.data.length > 0) {
        console.log("✅ User found in WordPress");
        const user = usersResponse.data[0];
        console.log(`   User ID: ${user.id}`);
        console.log(`   User Name: ${user.name}`);
        console.log(`   User Slug: ${user.slug}`);
      } else {
        console.log("❌ User not found in WordPress");
        console.log("💡 Check the username spelling");
      }
    } catch (error) {
      console.log(
        "⚠️  Could not check user existence (might need authentication)"
      );
    }
    console.log();

    // Test 3: Try different authentication methods
    console.log("3. Testing authentication methods...");

    // Method 1: Basic auth with app password
    console.log("   Method 1: Basic Auth with App Password");
    try {
      const authResponse = await axios.get(
        `${process.env.WP_URL}/wp-json/wp/v2/users/me`,
        {
          auth: {
            username: process.env.WP_USER,
            password: process.env.WP_APP_PASS,
          },
        }
      );
      console.log("   ✅ Basic auth successful!");
      console.log(`      User: ${authResponse.data.name}`);
      console.log(`      Roles: ${authResponse.data.roles.join(", ")}`);
      return; // Success, exit early
    } catch (error) {
      console.log(
        `   ❌ Basic auth failed: ${error.response?.status} - ${
          error.response?.data?.message || error.message
        }`
      );
    }

    // Method 2: Try with different password format
    console.log("   Method 2: App Password without spaces");
    try {
      const noSpacesPassword = process.env.WP_APP_PASS.replace(/\s/g, "");
      const authResponse2 = await axios.get(
        `${process.env.WP_URL}/wp-json/wp/v2/users/me`,
        {
          auth: {
            username: process.env.WP_USER,
            password: noSpacesPassword,
          },
        }
      );
      console.log("   ✅ Auth successful without spaces!");
      console.log(
        "   💡 Update your .env file to remove spaces from WP_APP_PASS"
      );
      return;
    } catch (error) {
      console.log(
        `   ❌ Auth without spaces failed: ${error.response?.status}`
      );
    }

    // Method 3: Try with different username case
    console.log("   Method 3: Different username case");
    const usernameVariations = [
      process.env.WP_USER.toLowerCase(),
      process.env.WP_USER.toUpperCase(),
      process.env.WP_USER.charAt(0).toUpperCase() +
        process.env.WP_USER.slice(1).toLowerCase(),
    ];

    for (const username of usernameVariations) {
      if (username === process.env.WP_USER) continue; // Skip original

      try {
        const authResponse3 = await axios.get(
          `${process.env.WP_URL}/wp-json/wp/v2/users/me`,
          {
            auth: {
              username: username,
              password: process.env.WP_APP_PASS,
            },
          }
        );
        console.log(`   ✅ Auth successful with username: ${username}`);
        console.log(
          "   💡 Update your .env file with the correct username case"
        );
        return;
      } catch (error) {
        // Continue to next variation
      }
    }
    console.log("   ❌ All username variations failed");
  } catch (error) {
    console.error("❌ Debug failed:", error.response?.data || error.message);
  }

  console.log("\n🔧 Troubleshooting Steps:");
  console.log("1. Go to WordPress Admin → Users → Profile");
  console.log('2. Scroll to "Application Passwords"');
  console.log("3. Delete any existing passwords for this user");
  console.log("4. Create a new application password");
  console.log("5. Copy the EXACT password (with spaces)");
  console.log("6. Update your .env file");
  console.log("7. Make sure the user role is Editor or Author");
  console.log("\n💡 Alternative: Create a new user with Editor role");
}

// Main execution
if (require.main === module) {
  debugAuth().catch(console.error);
}

module.exports = { debugAuth };
