require("dotenv").config();
const axios = require("axios");

async function setupWordPressContent() {
  console.log("🏗️ WordPress Content Setup Helper\n");

  if (!process.env.WP_URL || !process.env.WP_USER || !process.env.WP_APP_PASS) {
    console.log("❌ WordPress credentials not found in .env file");
    console.log("💡 Please set WP_URL, WP_USER, and WP_APP_PASS");
    return;
  }

  const categories = [
    {
      name: "AI Case Studies",
      description: "Real company implementations and success stories",
    },
    {
      name: "AI Solutions",
      description: "Problem-solving content with actionable solutions",
    },
    {
      name: "AI Trends",
      description: "Emerging technology and future-focused content",
    },
    {
      name: "AI Implementation",
      description: "How-to guides and practical implementation advice",
    },
    {
      name: "Industry AI",
      description: "Sector-specific AI applications and use cases",
    },
    {
      name: "AI Technology",
      description: "Technical deep-dives and technology insights",
    },
    {
      name: "AI Impact",
      description: "Social and business impact of AI technologies",
    },
    {
      name: "Healthcare AI",
      description: "AI applications in healthcare and medicine",
    },
    {
      name: "Finance AI",
      description: "AI in financial services, banking, and fintech",
    },
    {
      name: "Retail AI",
      description: "AI in retail, e-commerce, and customer experience",
    },
    {
      name: "Manufacturing AI",
      description: "AI in manufacturing and Industry 4.0",
    },
    {
      name: "Education AI",
      description: "AI in education and learning technologies",
    },
    {
      name: "Cybersecurity AI",
      description: "AI-powered security and threat detection",
    },
    {
      name: "Transportation AI",
      description: "AI in transportation and mobility",
    },
    {
      name: "Creative AI",
      description: "AI in creative industries and content creation",
    },
  ];

  const tags = [
    // Technology Tags
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Robotics",
    "Automation",
    "Predictive Analytics",
    "Neural Networks",
    "Algorithm",
    "Data Science",
    "Big Data",
    "Cloud Computing",
    "IoT",
    "Edge Computing",
    "Quantum Computing",
    "Blockchain AI",
    "Federated Learning",

    // Industry Tags
    "Healthcare",
    "Finance",
    "Banking",
    "Insurance",
    "Retail",
    "E-commerce",
    "Manufacturing",
    "Logistics",
    "Supply Chain",
    "Agriculture",
    "Energy",
    "Real Estate",
    "Legal",
    "Education",
    "Government",
    "Transportation",
    "Entertainment",
    "Gaming",
    "Media",
    "Marketing",
    "Sales",
    "Customer Service",
    "Human Resources",
    "Operations",

    // Application Tags
    "Chatbots",
    "Recommendation Systems",
    "Fraud Detection",
    "Quality Control",
    "Personalization",
    "Optimization",
    "Automation",
    "Predictive Maintenance",
    "Risk Management",
    "Compliance",
    "Security",
    "Privacy",
    "Ethics",
    "Sustainability",
    "Innovation",
    "Digital Transformation",
    "Smart Cities",
    "Smart Homes",
    "Wearables",
    "Mobile AI",

    // Company Tags
    "Netflix",
    "Amazon",
    "Tesla",
    "Google",
    "Spotify",
    "Facebook",
    "Uber",
    "Airbnb",
    "LinkedIn",
    "Instagram",
    "Microsoft",
    "Apple",
    "IBM",
    "NVIDIA",
    "OpenAI",
    "DeepMind",
    "Palantir",
    "Salesforce",
    "Adobe",
    "Shopify",

    // Business Tags
    "ROI",
    "Cost Reduction",
    "Efficiency",
    "Productivity",
    "Customer Experience",
    "Competitive Advantage",
    "Market Analysis",
    "Business Intelligence",
    "Decision Making",
    "Strategy",
    "Implementation",
    "Best Practices",
    "Challenges",
    "Solutions",
    "Success Stories",
    "Case Studies",
    "Tutorials",
    "Guides",
    "Tips",
    "Trends",

    // Impact Tags
    "Job Market",
    "Skills",
    "Training",
    "Upskilling",
    "Future of Work",
    "Remote Work",
    "Collaboration",
    "Communication",
    "Creativity",
    "Innovation",
    "Research",
    "Development",
    "Startups",
    "Enterprise",
    "Small Business",
    "Entrepreneurship",
    "Investment",
    "Funding",
    "Market Trends",
    "Economic Impact",
  ];

  console.log("📂 Setting up Categories...\n");

  for (const category of categories) {
    try {
      const response = await axios.post(
        `${process.env.WP_URL}/wp-json/wp/v2/categories`,
        {
          name: category.name,
          description: category.description,
          slug: category.name
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
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

      console.log(
        `✅ Created category: ${category.name} (ID: ${response.data.id})`
      );
    } catch (error) {
      if (error.response?.data?.code === "term_exists") {
        console.log(`⚠️ Category already exists: ${category.name}`);
      } else {
        console.log(
          `❌ Failed to create category ${category.name}: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  }

  console.log("\n🏷️ Setting up Tags...\n");

  for (const tag of tags) {
    try {
      const response = await axios.post(
        `${process.env.WP_URL}/wp-json/wp/v2/tags`,
        {
          name: tag,
          slug: tag
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, ""),
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

      console.log(`✅ Created tag: ${tag} (ID: ${response.data.id})`);
    } catch (error) {
      if (error.response?.data?.code === "term_exists") {
        console.log(`⚠️ Tag already exists: ${tag}`);
      } else {
        console.log(
          `❌ Failed to create tag ${tag}: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  }

  console.log("\n🎉 WordPress content setup completed!");
  console.log("\n📋 Next Steps:");
  console.log('1. Run "npm run tags" to get category and tag IDs');
  console.log("2. Update your .env file with the appropriate category ID");
  console.log("3. Test the blog automation system");
}

// Main execution
if (require.main === module) {
  setupWordPressContent().catch(console.error);
}

module.exports = { setupWordPressContent };
