require("dotenv").config();
const axios = require("axios");

async function getTagIds() {
  console.log("🔍 Fetching available tags from WordPress...\n");

  try {
    const response = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/tags?per_page=100`
    );

    console.log("✅ Available tags:");
    console.log("ID  | Name");
    console.log("----|------------------");

    response.data.forEach((tag) => {
      console.log(`${tag.id.toString().padStart(3)} | ${tag.name}`);
    });

    console.log("\n💡 To use tags, set WP_TAGS in your .env file like this:");
    console.log("   WP_TAGS=1,2,3");
    console.log("\n   Replace 1,2,3 with the actual tag IDs you want to use.");
  } catch (error) {
    console.error(
      "❌ Failed to fetch tags:",
      error.response?.data || error.message
    );

    if (error.response?.status === 404) {
      console.log("\n💡 REST API not found. Please check:");
      console.log("   - WP_URL is correct");
      console.log("   - REST API is enabled on your WordPress site");
    }
  }
}

async function getCategoryIds() {
  console.log("\n🔍 Fetching available categories from WordPress...\n");

  try {
    const response = await axios.get(
      `${process.env.WP_URL}/wp-json/wp/v2/categories?per_page=100`
    );

    console.log("✅ Available categories:");
    console.log("ID  | Name");
    console.log("----|------------------");

    response.data.forEach((cat) => {
      console.log(`${cat.id.toString().padStart(3)} | ${cat.name}`);
    });

    console.log(
      "\n💡 To use a category, set WP_CATEGORY_ID in your .env file like this:"
    );
    console.log("   WP_CATEGORY_ID=1");
    console.log("\n   Replace 1 with the actual category ID you want to use.");
  } catch (error) {
    console.error(
      "❌ Failed to fetch categories:",
      error.response?.data || error.message
    );
  }
}

// Main execution
async function main() {
  console.log("🚀 WordPress Tag & Category ID Helper\n");
  console.log("Configuration:");
  console.log(`   URL: ${process.env.WP_URL}`);
  console.log(`   User: ${process.env.WP_USER}`);
  console.log(
    `   App Password: ${process.env.WP_APP_PASS ? "***" : "NOT SET"}\n`
  );

  await getTagIds();
  await getCategoryIds();

  console.log("\n✨ Helper completed!");
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { getTagIds, getCategoryIds };
