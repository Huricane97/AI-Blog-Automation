require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testTopics() {
  console.log("📚 Testing New Topic Variety...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ GEMINI_API_KEY not found in environment variables");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Test different content types
    const testTopics = [
      {
        category: "Case Study",
        topic: "how Netflix uses AI for content recommendation",
        description: "Company-specific implementation with results",
      },
      {
        category: "Problem Solution",
        topic: "solving customer churn with AI predictive analytics",
        description: "Problem-focused with actionable solutions",
      },
      {
        category: "Industry Application",
        topic: "AI in retail and e-commerce",
        description: "Industry-wide technology application",
      },
      {
        category: "Implementation Guide",
        topic: "implementing AI in small businesses",
        description: "Step-by-step practical guidance",
      },
    ];

    for (let i = 0; i < testTopics.length; i++) {
      const test = testTopics[i];
      console.log(`${i + 1}. Testing ${test.category}: "${test.topic}"`);
      console.log(`   Description: ${test.description}`);

      try {
        const prompt = `Write a comprehensive, engaging blog post about ${test.topic}. 
        The post should be between 800-1200 words, well-structured with clear headings, 
        include practical examples, real-world applications, case studies, and actionable insights. 
        If the topic is a case study, include specific details about the company, their challenges, AI solution implemented, and results achieved. 
        If the topic is a problem solution, explain the problem clearly, the AI approach used, implementation steps, and measurable outcomes. 
        Write in a professional yet accessible tone that appeals to both technical and business audiences. 
        Include an engaging introduction that hooks the reader and a strong conclusion that summarizes key takeaways and next steps. 
        Format the content with proper HTML tags for headings (h2, h3) and paragraphs. 
        Make the content informative, actionable, and valuable to readers interested in technology and AI. 
        Include specific metrics, statistics, or data points where relevant to support your points.`;

        const result = await model.generateContent([
          "You are an expert tech blogger specializing in AI and technology trends. Write engaging, informative content that provides value to readers. Return ONLY the blog content with HTML formatting, no DOCTYPE, no html/head/body tags.",
          prompt,
        ]);

        const response = await result.response;
        let content = response.text();

        // Clean up any full HTML document structure
        content = content.replace(/<!DOCTYPE[^>]*>/gi, "");
        content = content.replace(/<html[^>]*>/gi, "");
        content = content.replace(/<\/html>/gi, "");
        content = content.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
        content = content.replace(/<body[^>]*>/gi, "");
        content = content.replace(/<\/body>/gi, "");
        content = content.trim();

        console.log(`   ✅ Generated: ${content.length} characters`);
        console.log(`   📝 Sample: ${content.substring(0, 100)}...`);

        // Check for specific content indicators
        const hasMetrics =
          /\d+%|\d+ percent|\$\d+|\d+ million|\d+ billion/i.test(content);
        const hasSteps = /step|phase|stage|process/i.test(content);
        const hasResults = /result|outcome|impact|improvement/i.test(content);

        console.log(`   📊 Has metrics: ${hasMetrics ? "✅" : "❌"}`);
        console.log(`   📋 Has steps: ${hasSteps ? "✅" : "❌"}`);
        console.log(`   🎯 Has results: ${hasResults ? "✅" : "❌"}`);
        console.log();
      } catch (error) {
        console.log(`   ❌ Failed: ${error.message}\n`);
      }
    }

    console.log("🎉 Topic variety testing completed!");
    console.log("💡 The system now supports diverse content types including:");
    console.log("   - Industry applications");
    console.log("   - Case studies with real companies");
    console.log("   - Problem-solution scenarios");
    console.log("   - Implementation guides");
    console.log("   - Emerging trends");
    console.log("   - Social impact topics");
  } catch (error) {
    console.error("❌ Topic testing failed:", error.message);
  }
}

// Main execution
if (require.main === module) {
  testTopics().catch(console.error);
}

module.exports = { testTopics };
