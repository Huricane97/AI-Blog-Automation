require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
  console.log("🤖 Checking Available Gemini Models...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ GEMINI_API_KEY not found in environment variables");
    console.log("💡 Please add your Gemini API key to your .env file");
    return;
  }

  try {
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    console.log("Available models:");
    console.log("1. gemini-1.5-pro (Recommended)");
    console.log("2. gemini-1.5-flash");
    console.log("3. gemini-pro");
    console.log("4. gemini-pro-vision");
    console.log();

    // Test different models
    const modelsToTest = ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-pro"];

    for (const modelName of modelsToTest) {
      try {
        console.log(`Testing ${modelName}...`);
        const model = genAI.getGenerativeModel({ model: modelName });

        const result = await model.generateContent(
          'Hello, please respond with "OK"'
        );
        const response = await result.response;

        console.log(`✅ ${modelName} is working!`);
        console.log(`   Response: ${response.text()}\n`);

        // If this model works, suggest using it
        if (modelName === "gemini-1.5-pro") {
          console.log(
            "💡 Using gemini-1.5-pro (latest and most capable model)"
          );
        }
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message}\n`);
      }
    }
  } catch (error) {
    console.error("❌ Failed to check models:", error.message);

    if (error.message.includes("API_KEY")) {
      console.log("\n💡 API key issue. Please check:");
      console.log("   1. Your Gemini API key is correct");
      console.log("   2. The API key is properly set in your .env file");
      console.log("   3. You have sufficient quota in Google AI Studio");
    }
  }
}

// Main execution
if (require.main === module) {
  listModels().catch(console.error);
}

module.exports = { listModels };
