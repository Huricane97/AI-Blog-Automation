require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testGemini() {
  console.log("🤖 Testing Gemini AI Integration...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ GEMINI_API_KEY not found in environment variables");
    console.log("💡 Please add your Gemini API key to your .env file");
    return;
  }

  try {
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    console.log("1. Testing basic content generation...");

    const result = await model.generateContent([
      "You are a helpful assistant. Please respond with a short greeting.",
      "Hello! Please give me a brief response.",
    ]);

    const response = await result.response;
    console.log("✅ Gemini AI is working!");
    console.log(`   Response: ${response.text()}\n`);

    console.log("2. Testing blog content generation...");

    const blogResult = await model.generateContent([
      "You are an expert tech blogger. Write a short paragraph about AI trends.",
      "Write a brief paragraph about the latest developments in artificial intelligence.",
    ]);

    const blogResponse = await blogResult.response;
    console.log("✅ Blog content generation is working!");
    console.log(
      `   Sample content: ${blogResponse.text().substring(0, 100)}...\n`
    );

    console.log("🎉 Gemini AI integration is working perfectly!");
    console.log(
      "💡 You can now use the blog automation system with Gemini AI."
    );
  } catch (error) {
    console.error("❌ Gemini AI test failed:", error.message);

    if (error.message.includes("API_KEY")) {
      console.log("\n💡 API key issue. Please check:");
      console.log("   1. Your Gemini API key is correct");
      console.log("   2. The API key is properly set in your .env file");
      console.log("   3. You have sufficient quota in Google AI Studio");
    } else if (error.message.includes("quota")) {
      console.log("\n💡 Quota issue. Please check:");
      console.log("   1. You have sufficient quota in Google AI Studio");
      console.log("   2. Your API key is active and not expired");
    }
  }
}

// Main execution
if (require.main === module) {
  testGemini().catch(console.error);
}

module.exports = { testGemini };
