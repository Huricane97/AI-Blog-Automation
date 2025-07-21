require("dotenv").config();
const axios = require("axios");
const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "AI Blog Automation is running!",
    timestamp: new Date().toISOString(),
    nextRun: getNextRunTime(),
    lastRun: getLastRunTime(),
  });
});

// Manual trigger endpoint
app.post("/trigger", async (req, res) => {
  try {
    const result = await generateAndPostBlog();
    res.json({
      success: true,
      message: "Blog posted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Manual trigger error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Webhook endpoint for external cron service
app.post("/webhook", async (req, res) => {
  try {
    // Check if it's time to post (9 AM daily)
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Only post if it's around 9 AM (with 5-minute window)
    if (currentHour === 9 && currentMinute >= 0 && currentMinute < 5) {
      console.log("⏰ Webhook triggered at 9 AM - starting blog generation...");
      const result = await generateAndPostBlog();

      res.json({
        success: true,
        message: "Blog posted successfully via webhook",
        data: result,
        triggered: true,
      });
    } else {
      console.log(
        `⏰ Webhook received but not 9 AM yet (${currentHour}:${currentMinute})`
      );
      res.json({
        success: true,
        message: "Webhook received but not time to post yet",
        triggered: false,
        currentTime: `${currentHour}:${currentMinute}`,
      });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Keep-alive endpoint to prevent sleep
app.get("/keep-alive", (req, res) => {
  res.json({
    status: "Server kept alive",
    timestamp: new Date().toISOString(),
  });
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Generate blog content using Gemini AI
async function generateBlog() {
  const topics = [
    // Industry Applications
    "latest AI trends and developments",
    "machine learning applications in business",
    "artificial intelligence in healthcare",
    "AI in financial services and fintech",
    "AI in manufacturing and Industry 4.0",
    "AI in retail and e-commerce",
    "AI in agriculture and food production",
    "AI in energy and utilities",
    "AI in real estate and property management",
    "AI in legal services and compliance",

    // Technology Focus
    "deep learning breakthroughs",
    "natural language processing advances",
    "computer vision innovations",
    "machine learning for predictive analytics",
    "AI-powered cybersecurity solutions",
    "quantum computing and AI integration",
    "edge AI and IoT applications",
    "AI in cloud computing and infrastructure",
    "federated learning and privacy-preserving AI",
    "AI-powered robotics and automation",

    // Social Impact
    "the impact of AI on job markets",
    "AI ethics and responsible development",
    "AI in education and learning",
    "AI for social good and humanitarian aid",
    "AI in government and public services",
    "AI and digital transformation",
    "AI accessibility and inclusive technology",
    "AI in mental health and wellness",
    "AI for environmental conservation",
    "AI in disaster response and emergency management",

    // Case Studies & Problem Solutions
    "how Netflix uses AI for content recommendation",
    "how Amazon optimizes logistics with AI",
    "how Tesla's autonomous driving technology works",
    "how Google's search algorithm uses AI",
    "how Spotify creates personalized playlists",
    "how Facebook detects fake news with AI",
    "how Uber optimizes ride pricing with machine learning",
    "how Airbnb uses AI for dynamic pricing",
    "how LinkedIn matches jobs with candidates using AI",
    "how Instagram's algorithm curates your feed",

    // Problem-Solving Scenarios
    "solving customer churn with AI predictive analytics",
    "reducing fraud in financial transactions with AI",
    "optimizing supply chain management with machine learning",
    "improving customer service with AI chatbots",
    "enhancing product quality control with computer vision",
    "streamlining recruitment with AI-powered screening",
    "personalizing marketing campaigns with AI",
    "detecting and preventing cyber attacks with AI",
    "optimizing energy consumption with smart AI systems",
    "improving healthcare outcomes with predictive medicine",

    // Emerging Trends
    "the future of AI in transportation",
    "AI-powered personal assistants and productivity",
    "AI in creative industries and content creation",
    "the role of AI in climate change solutions",
    "sustainable AI development",
    "AI in space exploration and satellite technology",
    "AI in gaming and virtual reality",
    "AI-powered smart cities and urban planning",
    "AI in biotechnology and drug discovery",
    "the future of human-AI collaboration",

    // Implementation Guides
    "implementing AI in small businesses",
    "building an AI strategy for enterprises",
    "measuring ROI of AI investments",
    "overcoming common AI implementation challenges",
    "selecting the right AI tools for your business",
    "training employees for AI adoption",
    "ensuring data quality for AI projects",
    "managing AI project risks and compliance",
    "scaling AI solutions from pilot to production",
    "creating a data-driven culture with AI",
  ];

  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `Write a comprehensive, engaging blog post about ${randomTopic}. 
  The post should be between 800-1200 words, well-structured with clear headings, 
  include practical examples, real-world applications, case studies, and actionable insights. 
  If the topic is a case study, include specific details about the company, their challenges, AI solution implemented, and results achieved. 
  If the topic is a problem solution, explain the problem clearly, the AI approach used, implementation steps, and measurable outcomes. 
  Write in a professional yet accessible tone that appeals to both technical and business audiences. 
  Include an engaging introduction that hooks the reader and a strong conclusion that summarizes key takeaways and next steps. 
  Format the content with proper HTML tags for headings (h2, h3) and paragraphs. 
  Make the content informative, actionable, and valuable to readers interested in technology and AI. 
  Include specific metrics, statistics, or data points where relevant to support your points.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

    return content.trim();
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    throw new Error("Failed to generate blog content");
  }
}

// Auto-select category and tags based on content
async function autoSelectCategoryAndTags(content, title) {
  try {
    const categoryModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Category mapping
    const categoryMap = {
      "AI Case Studies": 18,
      "AI Solutions": 17,
      "AI Trends": 16,
      "AI Implementation": 1,
      "Industry AI": 159,
      "AI Technology": 160,
      "AI Impact": 161,
      "Healthcare AI": 162,
      "Finance AI": 163,
      "Retail AI": 164,
      "Manufacturing AI": 165,
      "Education AI": 166,
      "Cybersecurity AI": 167,
      "Transportation AI": 168,
      "Creative AI": 169,
    };

    // Tag mapping (key tags with their IDs)
    const tagMap = {
      // Technology
      "Artificial Intelligence": 39,
      "Machine Learning": 40,
      "Deep Learning": 41,
      "Natural Language Processing": 42,
      "Computer Vision": 43,
      Robotics: 44,
      Automation: 45,
      "Predictive Analytics": 46,
      "Neural Networks": 47,
      Algorithm: 48,
      "Data Science": 49,
      "Big Data": 50,
      "Cloud Computing": 51,
      IoT: 52,
      "Edge Computing": 53,
      "Quantum Computing": 54,
      "Blockchain AI": 55,
      "Federated Learning": 56,

      // Industries
      Healthcare: 57,
      Finance: 58,
      Banking: 59,
      Insurance: 60,
      Retail: 61,
      "E-commerce": 62,
      Manufacturing: 63,
      Logistics: 64,
      "Supply Chain": 65,
      Agriculture: 66,
      Energy: 67,
      "Real Estate": 68,
      Legal: 69,
      Education: 70,
      Government: 71,
      Transportation: 72,
      Entertainment: 73,
      Gaming: 74,
      Media: 75,
      Marketing: 76,
      Sales: 77,
      "Customer Service": 78,
      "Human Resources": 79,
      Operations: 80,

      // Applications
      Chatbots: 81,
      "Recommendation Systems": 82,
      "Fraud Detection": 83,
      "Quality Control": 84,
      Personalization: 85,
      Optimization: 86,
      "Predictive Maintenance": 87,
      "Risk Management": 88,
      Compliance: 89,
      Security: 90,
      Privacy: 91,
      Ethics: 92,
      Sustainability: 93,
      Innovation: 94,
      "Digital Transformation": 95,
      "Smart Cities": 96,
      "Smart Homes": 97,
      Wearables: 98,
      "Mobile AI": 99,

      // Companies
      Netflix: 100,
      Amazon: 101,
      Tesla: 102,
      Google: 103,
      Spotify: 104,
      Facebook: 105,
      Uber: 106,
      Airbnb: 107,
      LinkedIn: 108,
      Instagram: 109,
      Microsoft: 110,
      Apple: 111,
      IBM: 112,
      NVIDIA: 113,
      OpenAI: 114,
      DeepMind: 115,
      Palantir: 116,
      Salesforce: 117,
      Adobe: 118,
      Shopify: 119,

      // Business
      ROI: 120,
      "Cost Reduction": 121,
      Efficiency: 122,
      Productivity: 123,
      "Customer Experience": 124,
      "Competitive Advantage": 125,
      "Market Analysis": 126,
      "Business Intelligence": 127,
      "Decision Making": 128,
      "Best Practices": 131,
      Challenges: 132,
      "Case Studies": 135,
      Guides: 137,
      Implementation: 130,

      // Impact
      "Job Market": 140,
      "Future of Work": 144,
      "Remote Work": 145,
      Collaboration: 146,
      Communication: 147,
      Creativity: 148,
      Research: 149,
      Development: 150,
      Enterprise: 152,
      Entrepreneurship: 154,
      Investment: 155,
      Funding: 156,
      "Market Trends": 157,
      "Economic Impact": 158,
    };

    // Analyze content and select category
    const categoryPrompt = `Analyze this blog content and title, then select the most appropriate category from this list:
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

    const categoryResult = await categoryModel.generateContent([
      categoryPrompt,
      `Title: ${title}\nContent: ${content.substring(0, 500)}...`,
    ]);

    const selectedCategoryName = categoryResult.response.text().trim();
    const selectedCategory = categoryMap[selectedCategoryName] || 18; // Default to AI Case Studies

    // Analyze content and select relevant tags
    const tagPrompt = `Analyze this blog content and title, then select 5-8 most relevant tags from this comprehensive list. Return ONLY the tag names separated by commas, no explanations:

    Technology: Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Robotics, Automation, Predictive Analytics, Neural Networks, Algorithm, Data Science, Big Data, Cloud Computing, IoT, Edge Computing, Quantum Computing, Blockchain AI, Federated Learning

    Industries: Healthcare, Finance, Banking, Insurance, Retail, E-commerce, Manufacturing, Logistics, Supply Chain, Agriculture, Energy, Real Estate, Legal, Education, Government, Transportation, Entertainment, Gaming, Media, Marketing, Sales, Customer Service, Human Resources, Operations

    Applications: Chatbots, Recommendation Systems, Fraud Detection, Quality Control, Personalization, Optimization, Predictive Maintenance, Risk Management, Compliance, Security, Privacy, Ethics, Sustainability, Innovation, Digital Transformation, Smart Cities, Smart Homes, Wearables, Mobile AI

    Companies: Netflix, Amazon, Tesla, Google, Spotify, Facebook, Uber, Airbnb, LinkedIn, Instagram, Microsoft, Apple, IBM, NVIDIA, OpenAI, DeepMind, Palantir, Salesforce, Adobe, Shopify

    Business: ROI, Cost Reduction, Efficiency, Productivity, Customer Experience, Competitive Advantage, Market Analysis, Business Intelligence, Decision Making, Best Practices, Challenges, Case Studies, Guides, Implementation

    Impact: Job Market, Future of Work, Remote Work, Collaboration, Communication, Creativity, Research, Development, Enterprise, Entrepreneurship, Investment, Funding, Market Trends, Economic Impact`;

    const tagResult = await categoryModel.generateContent([
      tagPrompt,
      `Title: ${title}\nContent: ${content.substring(0, 500)}...`,
    ]);

    const selectedTagNames = tagResult.response
      .text()
      .split(",")
      .map((tag) => tag.trim());
    const selectedTags = selectedTagNames
      .map((tagName) => tagMap[tagName])
      .filter((tagId) => tagId) // Remove undefined tags
      .slice(0, 8); // Limit to 8 tags

    console.log(
      `🏷️ Auto-selected category: ${selectedCategoryName} (ID: ${selectedCategory})`
    );
    console.log(
      `🏷️ Auto-selected tags: ${selectedTagNames.join(
        ", "
      )} (IDs: ${selectedTags.join(", ")})`
    );

    return { selectedCategory, selectedTags };
  } catch (error) {
    console.error("Auto-selection error:", error.message);
    // Fallback to default category and tags
    return {
      selectedCategory: parseInt(process.env.WP_CATEGORY_ID) || 18,
      selectedTags: process.env.WP_TAGS
        ? process.env.WP_TAGS.split(",")
            .map((tag) => tag.trim())
            .filter((tag) => !isNaN(tag))
            .map((tag) => parseInt(tag))
            .slice(0, 5)
        : [],
    };
  }
}

// Post to WordPress via REST API
async function postToWordPress(content) {
  try {
    // Generate a title from the content using Gemini
    const titleModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const titleResult = await titleModel.generateContent([
      "You are a professional blog title generator. Generate ONE catchy, SEO-friendly title (max 60 characters) for a blog post about AI and technology. Return ONLY the title, no explanations, no multiple options, no asterisks or formatting.",
      `Based on this blog content, generate a single title: ${content.substring(
        0,
        200
      )}...`,
    ]);

    const titleResponse = await titleResult.response;
    const title = titleResponse
      .text()
      .replace(/"/g, "")
      .replace(/\*/g, "")
      .trim();

    // Auto-select category and tags based on content
    const { selectedCategory, selectedTags } = await autoSelectCategoryAndTags(
      content,
      title
    );

    const response = await axios.post(
      `${process.env.WP_URL}/wp-json/wp/v2/posts`,
      {
        title: title,
        content: content,
        status: "publish",
        categories: selectedCategory ? [selectedCategory] : [],
        tags: selectedTags,
      },
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

    console.log("✅ Blog posted successfully!");
    console.log("📝 Title:", title);
    console.log("🔗 URL:", response.data.link);
    console.log("📅 Published at:", new Date().toISOString());

    return {
      title,
      url: response.data.link,
      id: response.data.id,
      publishedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error(
      "WordPress API Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to post to WordPress");
  }
}

// Main function to generate and post blog
async function generateAndPostBlog() {
  console.log("🚀 Starting blog generation...");

  try {
    const blogContent = await generateBlog();
    console.log("📝 Blog content generated successfully");

    const result = await postToWordPress(blogContent);
    console.log("✅ Blog posted successfully!");

    // Update last run time
    process.env.LAST_RUN_TIME = new Date().toISOString();

    return result;
  } catch (error) {
    console.error("❌ Error in blog generation/posting:", error);
    throw error;
  }
}

// Get next scheduled run time
function getNextRunTime() {
  const now = new Date();
  const nextRun = new Date(now);
  nextRun.setHours(9, 0, 0, 0); // 9 AM

  if (nextRun <= now) {
    nextRun.setDate(nextRun.getDate() + 1); // Tomorrow
  }

  return nextRun.toISOString();
}

// Get last run time (for health check)
function getLastRunTime() {
  return process.env.LAST_RUN_TIME || "Never";
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 AI Blog Automation server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}`);
  console.log(`🔧 Manual trigger: POST http://localhost:${PORT}/trigger`);
  console.log(`🌍 Timezone: ${process.env.TIMEZONE || "UTC"}`);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully...");
  process.exit(0);
});
