// Test the new topic diversity system
function testTopicDiversity() {
  console.log("🎯 Testing Topic Diversity System\n");

  // Simulate the topic selection logic
  let usedTopics = [];
  let topicRotationIndex = 0;

  const topicCategories = {
    "Industry Applications": [
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
    ],
    "Technology Focus": [
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
    ],
    "Social Impact": [
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
    ],
    "Case Studies": [
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
    ],
    "Problem Solutions": [
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
    ],
    "Emerging Trends": [
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
    ],
    "Implementation Guides": [
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
    ],
  };

  // Smart topic selection function (same as in index.js)
  function selectDiverseTopic() {
    const categoryNames = Object.keys(topicCategories);
    
    // Reset used topics if we've used all topics
    if (usedTopics.length >= 70) {
      console.log("🔄 Resetting topic rotation - all topics have been used");
      usedTopics = [];
      topicRotationIndex = 0;
    }
    
    // Try to select from different categories
    let attempts = 0;
    let selectedTopic = null;
    
    while (attempts < 10 && !selectedTopic) {
      // Rotate through categories to ensure diversity
      const categoryIndex = topicRotationIndex % categoryNames.length;
      const currentCategory = categoryNames[categoryIndex];
      const categoryTopics = topicCategories[currentCategory];
      
      // Find unused topics in this category
      const availableTopics = categoryTopics.filter(topic => !usedTopics.includes(topic));
      
      if (availableTopics.length > 0) {
        // Select randomly from available topics in this category
        selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
        console.log(`📝 Selected topic from ${currentCategory}: "${selectedTopic}"`);
      } else {
        // If no topics available in this category, move to next category
        topicRotationIndex++;
      }
      
      attempts++;
    }
    
    // Fallback: if no topic found through rotation, select any unused topic
    if (!selectedTopic) {
      const allTopics = Object.values(topicCategories).flat();
      const availableTopics = allTopics.filter(topic => !usedTopics.includes(topic));
      
      if (availableTopics.length > 0) {
        selectedTopic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
        console.log(`📝 Fallback selection: "${selectedTopic}"`);
      } else {
        // Last resort: select any topic
        selectedTopic = allTopics[Math.floor(Math.random() * allTopics.length)];
        console.log(`📝 Last resort selection: "${selectedTopic}"`);
      }
    }
    
    // Mark topic as used and move to next category
    usedTopics.push(selectedTopic);
    topicRotationIndex++;
    
    console.log(`📊 Used topics: ${usedTopics.length}/70`);
    console.log(`🔄 Next category rotation: ${topicRotationIndex % categoryNames.length}`);
    
    return selectedTopic;
  }

  console.log("🧪 Testing 20 consecutive topic selections:\n");
  
  const selections = [];
  const categoryCounts = {};
  
  // Initialize category counts
  Object.keys(topicCategories).forEach(category => {
    categoryCounts[category] = 0;
  });
  
  // Test 20 selections
  for (let i = 1; i <= 20; i++) {
    console.log(`\n--- Selection ${i} ---`);
    const topic = selectDiverseTopic();
    selections.push(topic);
    
    // Count which category this topic belongs to
    Object.entries(topicCategories).forEach(([category, topics]) => {
      if (topics.includes(topic)) {
        categoryCounts[category]++;
      }
    });
  }
  
  console.log("\n📊 Diversity Analysis:");
  console.log("====================");
  
  // Check for duplicates
  const duplicates = selections.filter((topic, index) => selections.indexOf(topic) !== index);
  console.log(`\n🔄 Duplicate topics: ${duplicates.length}`);
  if (duplicates.length > 0) {
    console.log("   Duplicates found:", duplicates);
  } else {
    console.log("   ✅ No duplicates found!");
  }
  
  // Show category distribution
  console.log("\n📈 Category Distribution:");
  Object.entries(categoryCounts).forEach(([category, count]) => {
    const percentage = ((count / 20) * 100).toFixed(1);
    console.log(`   ${category}: ${count} topics (${percentage}%)`);
  });
  
  // Show topic variety
  const uniqueTopics = [...new Set(selections)];
  console.log(`\n🎯 Topic Variety: ${uniqueTopics.length}/20 unique topics`);
  
  // Show rotation pattern
  console.log("\n🔄 Rotation Pattern:");
  const categoryNames = Object.keys(topicCategories);
  for (let i = 0; i < Math.min(10, selections.length); i++) {
    const topic = selections[i];
    const category = Object.entries(topicCategories).find(([cat, topics]) => 
      topics.includes(topic)
    )?.[0] || "Unknown";
    console.log(`   ${i + 1}. ${category}: "${topic.substring(0, 50)}..."`);
  }
  
  console.log("\n✅ Topic diversity test completed!");
  console.log("\n💡 Key improvements:");
  console.log("   - Prevents topic repetition");
  console.log("   - Ensures balanced category distribution");
  console.log("   - Rotates through different content types");
  console.log("   - Tracks usage to maintain variety");
}

// Main execution
if (require.main === module) {
  testTopicDiversity();
}

module.exports = { testTopicDiversity };
