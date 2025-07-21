const axios = require("axios");

const RENDER_URL =
  process.env.RENDER_URL || "https://blogging-42rr.onrender.com";

async function testWebhook() {
  console.log("🧪 Testing Webhook Functionality...\n");

  try {
    // Test 1: Health check
    console.log("1. Testing Health Check...");
    const healthResponse = await axios.get(`${RENDER_URL}/`);
    console.log("✅ Health check successful");
    console.log("📊 Status:", healthResponse.data.status);
    console.log("⏰ Next run:", healthResponse.data.nextRun);
    console.log("📅 Last run:", healthResponse.data.lastRun);
    console.log("");

    // Test 2: Keep alive endpoint
    console.log("2. Testing Keep Alive...");
    const keepAliveResponse = await axios.get(`${RENDER_URL}/keep-alive`);
    console.log("✅ Keep alive successful");
    console.log("📊 Status:", keepAliveResponse.data.status);
    console.log("");

    // Test 3: Webhook endpoint (should not trigger blog generation unless it's 9 AM)
    console.log("3. Testing Webhook Endpoint...");
    const webhookResponse = await axios.post(
      `${RENDER_URL}/webhook`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Webhook endpoint working");
    console.log("📊 Triggered:", webhookResponse.data.triggered);
    console.log("💬 Message:", webhookResponse.data.message);
    if (webhookResponse.data.currentTime) {
      console.log("🕐 Current time:", webhookResponse.data.currentTime);
    }
    console.log("");

    // Test 4: Manual trigger (optional - uncomment to test actual blog generation)
    console.log("4. Testing Manual Trigger...");
    console.log("⚠️  This will actually generate and post a blog!");
    console.log("Press Ctrl+C to cancel, or wait 5 seconds to continue...");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const triggerResponse = await axios.post(
      `${RENDER_URL}/trigger`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("✅ Manual trigger successful");
    console.log("📊 Success:", triggerResponse.data.success);
    console.log("💬 Message:", triggerResponse.data.message);
    if (triggerResponse.data.data) {
      console.log("📝 Title:", triggerResponse.data.data.title);
      console.log("🔗 URL:", triggerResponse.data.data.url);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Run the test
testWebhook();
