require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testPrompts() {
  console.log("🧪 Testing Improved Prompts...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ GEMINI_API_KEY not found in environment variables");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Test 1: Title Generation
    console.log("1. Testing Title Generation...");
    const titleResult = await model.generateContent([
      "You are a professional blog title generator. Generate ONE catchy, SEO-friendly title (max 60 characters) for a blog post about AI and technology. Return ONLY the title, no explanations, no multiple options, no asterisks or formatting.",
      "Based on this blog content, generate a single title: Artificial intelligence is transforming healthcare with diagnostic tools, personalized medicine, and drug discovery...",
    ]);

    const titleResponse = await titleResult.response;
    const title = titleResponse
      .text()
      .replace(/"/g, "")
      .replace(/\*/g, "")
      .trim();
    console.log(`✅ Generated Title: "${title}"`);
    console.log(`   Length: ${title.length} characters\n`);

    // Test 2: Blog Content Generation
    console.log("2. Testing Blog Content Generation...");
    const blogResult = await model.generateContent([
      "You are an expert tech blogger specializing in AI and technology trends. Write engaging, informative content that provides value to readers.",
      "Write a comprehensive, engaging blog post about AI in cybersecurity. The post should be between 800-1200 words, well-structured with clear headings, include practical examples and real-world applications, and be written in a professional yet accessible tone. Include an engaging introduction that hooks the reader and a strong conclusion that summarizes key points. Format the content with proper HTML tags for headings (h2, h3) and paragraphs. Make the content informative, actionable, and valuable to readers interested in technology and AI.",
    ]);

    const blogResponse = await blogResult.response;
    const content = blogResponse.text();
    console.log(`✅ Generated Content: ${content.length} characters`);
    console.log(`   Sample: ${content.substring(0, 150)}...\n`);

    // Test 3: Check for HTML formatting
    console.log("3. Checking HTML Formatting...");
    const hasH2Tags = content.includes("<h2>");
    const hasH3Tags = content.includes("<h3>");
    const hasParagraphs = content.includes("<p>");

    console.log(`   H2 tags: ${hasH2Tags ? "✅" : "❌"}`);
    console.log(`   H3 tags: ${hasH3Tags ? "✅" : "❌"}`);
    console.log(`   Paragraphs: ${hasParagraphs ? "✅" : "❌"}`);

    console.log("\n🎉 Prompt testing completed successfully!");
    console.log(
      "💡 The improved prompts should generate better, more structured content."
    );
  } catch (error) {
    console.error("❌ Prompt testing failed:", error.message);
  }
}

// Main execution
if (require.main === module) {
  testPrompts().catch(console.error);
}

module.exports = { testPrompts };
