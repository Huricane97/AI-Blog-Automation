require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function testAutoSelection() {
  console.log("🤖 Testing Auto-Selection of Categories and Tags...\n");

  if (!process.env.GEMINI_API_KEY) {
    console.log("❌ GEMINI_API_KEY not found in environment variables");
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Test different content types
    const testCases = [
      {
        name: "Case Study Content",
        content:
          "Netflix uses sophisticated AI algorithms to analyze user viewing patterns and provide personalized content recommendations. Their recommendation engine processes millions of data points to suggest shows and movies that users are likely to enjoy.",
        expectedCategory: "AI Case Studies",
        expectedTags: [
          "Netflix",
          "Recommendation Systems",
          "Personalization",
          "Artificial Intelligence",
          "Machine Learning",
        ],
      },
      {
        name: "Problem Solution Content",
        content:
          "Customer churn is a major challenge for businesses. AI-powered predictive analytics can identify customers at risk of leaving and enable proactive retention strategies. This solution uses machine learning to analyze customer behavior patterns.",
        expectedCategory: "AI Solutions",
        expectedTags: [
          "Customer Experience",
          "Predictive Analytics",
          "Machine Learning",
          "Challenges",
          "Solutions",
        ],
      },
      {
        name: "Technology Deep-Dive",
        content:
          "Deep learning neural networks are revolutionizing computer vision applications. Convolutional neural networks (CNNs) can now achieve human-level accuracy in image recognition tasks, enabling breakthroughs in autonomous vehicles and medical imaging.",
        expectedCategory: "AI Technology",
        expectedTags: [
          "Deep Learning",
          "Computer Vision",
          "Neural Networks",
          "Artificial Intelligence",
          "Innovation",
        ],
      },
      {
        name: "Industry Application",
        content:
          "AI is transforming healthcare with applications in medical diagnosis, drug discovery, and patient care. Machine learning algorithms can analyze medical images to detect diseases early, improving treatment outcomes and reducing healthcare costs.",
        expectedCategory: "Healthcare AI",
        expectedTags: [
          "Healthcare",
          "Machine Learning",
          "Medical Imaging",
          "Artificial Intelligence",
          "Innovation",
        ],
      },
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];
      console.log(`${i + 1}. Testing: ${testCase.name}`);
      console.log(`   Content: ${testCase.content.substring(0, 100)}...`);

      try {
        // Test category selection
        const categoryPrompt = `Analyze this blog content and select the most appropriate category from this list:
        - AI Case Studies (for company-specific implementations like Netflix, Amazon, Tesla)
        - AI Solutions (for problem-solving content with actionable solutions)
        - AI Trends (for emerging technology and future-focused content)
        - AI Implementation (for how-to guides and practical implementation advice)
        - Industry AI (for sector-specific AI applications)
        - AI Technology (for technical deep-dives and technology insights)
        - AI Impact (for social and business impact of AI)
        - Healthcare AI (for medical and healthcare applications)
        - Finance AI (for financial services and banking)
        - Retail AI (for retail and e-commerce)
        - Manufacturing AI (for manufacturing and Industry 4.0)
        - Education AI (for education and learning technologies)
        - Cybersecurity AI (for security and threat detection)
        - Transportation AI (for transportation and mobility)
        - Creative AI (for creative industries and content creation)

        Return ONLY the category name, nothing else.`;

        const categoryResult = await model.generateContent([
          categoryPrompt,
          `Content: ${testCase.content}`,
        ]);

        const selectedCategory = categoryResult.response.text().trim();
        const isCorrectCategory =
          selectedCategory === testCase.expectedCategory;

        console.log(
          `   🏷️ Selected Category: ${selectedCategory} ${
            isCorrectCategory ? "✅" : "❌"
          }`
        );
        console.log(`   Expected: ${testCase.expectedCategory}`);

        // Test tag selection
        const tagPrompt = `Analyze this blog content and select 5 most relevant tags from this list. Return ONLY the tag names separated by commas, no explanations:

        Technology: Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Robotics, Automation, Predictive Analytics, Neural Networks, Algorithm, Data Science, Big Data, Cloud Computing, IoT, Edge Computing, Quantum Computing, Blockchain AI, Federated Learning

        Industries: Healthcare, Finance, Banking, Insurance, Retail, E-commerce, Manufacturing, Logistics, Supply Chain, Agriculture, Energy, Real Estate, Legal, Education, Government, Transportation, Entertainment, Gaming, Media, Marketing, Sales, Customer Service, Human Resources, Operations

        Applications: Chatbots, Recommendation Systems, Fraud Detection, Quality Control, Personalization, Optimization, Predictive Maintenance, Risk Management, Compliance, Security, Privacy, Ethics, Sustainability, Innovation, Digital Transformation, Smart Cities, Smart Homes, Wearables, Mobile AI

        Companies: Netflix, Amazon, Tesla, Google, Spotify, Facebook, Uber, Airbnb, LinkedIn, Instagram, Microsoft, Apple, IBM, NVIDIA, OpenAI, DeepMind, Palantir, Salesforce, Adobe, Shopify

        Business: ROI, Cost Reduction, Efficiency, Productivity, Customer Experience, Competitive Advantage, Market Analysis, Business Intelligence, Decision Making, Best Practices, Challenges, Case Studies, Guides, Implementation

        Impact: Job Market, Future of Work, Remote Work, Collaboration, Communication, Creativity, Research, Development, Enterprise, Entrepreneurship, Investment, Funding, Market Trends, Economic Impact`;

        const tagResult = await model.generateContent([
          tagPrompt,
          `Content: ${testCase.content}`,
        ]);

        const selectedTags = tagResult.response
          .text()
          .split(",")
          .map((tag) => tag.trim());
        const expectedTagMatches = testCase.expectedTags.filter((tag) =>
          selectedTags.includes(tag)
        );
        const accuracy =
          (expectedTagMatches.length / testCase.expectedTags.length) * 100;

        console.log(`   🏷️ Selected Tags: ${selectedTags.join(", ")}`);
        console.log(`   Expected Tags: ${testCase.expectedTags.join(", ")}`);
        console.log(
          `   Accuracy: ${accuracy.toFixed(0)}% (${expectedTagMatches.length}/${
            testCase.expectedTags.length
          } matches)`
        );
        console.log();
      } catch (error) {
        console.log(`   ❌ Test failed: ${error.message}\n`);
      }
    }

    console.log("🎉 Auto-selection testing completed!");
    console.log(
      "💡 The system will now automatically select the most appropriate category and tags for each blog post."
    );
  } catch (error) {
    console.error("❌ Auto-selection testing failed:", error.message);
  }
}

// Main execution
if (require.main === module) {
  testAutoSelection().catch(console.error);
}

module.exports = { testAutoSelection };
