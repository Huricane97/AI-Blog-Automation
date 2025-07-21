require("dotenv").config();
const axios = require("axios");

async function listUsers() {
  console.log("👥 Listing WordPress Users...\n");

  try {
    // Get all users (this endpoint is usually public)
    const response = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/users?per_page=100`
    );

    console.log("✅ Available users:");
    console.log("ID  | Username | Name | Roles");
    console.log("----|----------|------|------");

    response.data.forEach((user) => {
      const roles = user.roles ? user.roles.join(", ") : "none";
      console.log(
        `${user.id.toString().padStart(3)} | ${user.slug.padEnd(
          8
        )} | ${user.name.padEnd(4)} | ${roles}`
      );
    });

    console.log(
      '\n💡 Use the "Username" (slug) column for WP_USER in your .env file'
    );
    console.log("💡 Make sure the user has Editor or Author role");
  } catch (error) {
    console.error(
      "❌ Failed to list users:",
      error.response?.data || error.message
    );

    if (error.response?.status === 401) {
      console.log("\n💡 This endpoint might require authentication.");
      console.log("   Try accessing your WordPress admin to see users:");
      console.log(`   ${process.env.WP_URL}/wp-admin/users.php`);
    }
  }
}

// Main execution
if (require.main === module) {
  listUsers().catch(console.error);
}

module.exports = { listUsers };
