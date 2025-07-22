# 🤖 AI Blog Automation

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Deploy on Render](https://img.shields.io/badge/Deploy%20on-Render-46E3B7.svg)](https://render.com/)
[![Deploy on Heroku](https://img.shields.io/badge/Deploy%20on-Heroku-430098.svg)](https://heroku.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Gemini%201.5%20Flash-orange.svg)](https://ai.google.dev/)
[![WordPress](https://img.shields.io/badge/Platform-WordPress-21759B.svg)](https://wordpress.org/)

> **Automate your blog content creation with AI-powered posts that publish directly to WordPress daily!**

This Node.js application automatically generates high-quality, SEO-optimized blog posts using Google's Gemini AI and publishes them to your WordPress site via REST API. Perfect for content creators, marketers, and businesses looking to maintain an active blog presence without the daily content creation burden.

## ✨ Features

- 🤖 **AI-Powered Content**: Uses Google Gemini 1.5 Flash for intelligent, engaging content generation
- 📅 **Automated Scheduling**: Publishes posts daily at your preferred time (9 AM UTC by default)
- 🏷️ **Smart Categorization**: Automatically selects relevant categories and tags based on content
- 📊 **SEO Optimized**: Generates SEO-friendly titles and structured content
- 🔄 **Diverse Topics**: Creates varied content including case studies, problem solutions, and industry insights
- 🌐 **Free Hosting Ready**: Deploy on Render, Heroku, or any Node.js hosting platform
- 🔧 **Easy Setup**: Simple configuration with environment variables
- 📱 **Webhook Support**: External cron services for reliable scheduling on free tiers
- 🛡️ **Error Handling**: Robust error handling and logging

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-blog-automation.git
cd ai-blog-automation
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp env.example .env
```

Edit `.env` with your credentials:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# WordPress Configuration
WP_URL=https://yourdomain.com
WP_USER=your_wordpress_username
WP_APP_PASS=your_wordpress_application_password
WP_CATEGORY_ID=1
WP_TAGS=1,2,3
```

### 4. Test Locally

```bash
npm run dev
```

### 5. Deploy to Production

Choose your hosting platform:

**Render (Recommended for Free Tier):**

```bash
# Connect your GitHub repo to Render
# Render will auto-deploy from your main branch
```

**Heroku:**

```bash
heroku create your-app-name
git push heroku main
```

## 📋 Prerequisites

### Required Accounts

- [Google AI Studio](https://aistudio.google.com/) - Get your Gemini API key
- [WordPress Site](https://wordpress.org/) - Your target blog
- [Render](https://render.com/) or [Heroku](https://heroku.com/) - Hosting platform

### WordPress Setup

1. **Create Application Password**:

   - Go to WordPress Admin → Users → Profile
   - Scroll to "Application Passwords"
   - Create a new password with "AI Blog Automation" name
   - Copy the generated password (with spaces)

2. **Set User Permissions**:

   - Ensure your user has "Editor" or "Author" role
   - Verify they can create and publish posts

3. **Get Category/Tag IDs**:
   ```bash
   npm run tags
   ```

## 🔧 Configuration

### Environment Variables

| Variable         | Description                    | Example               |
| ---------------- | ------------------------------ | --------------------- |
| `GEMINI_API_KEY` | Your Google Gemini API key     | `AIzaSyC...`          |
| `WP_URL`         | Your WordPress site URL        | `https://mysite.com`  |
| `WP_USER`        | WordPress username             | `admin`               |
| `WP_APP_PASS`    | WordPress application password | `abcd efgh ijkl mnop` |
| `WP_CATEGORY_ID` | Default category ID            | `1`                   |
| `WP_TAGS`        | Comma-separated tag IDs        | `1,2,3`               |

### Scheduling Configuration

The app publishes posts daily at 9 AM UTC by default. To change this:

1. **For Manual Control**: Use the `/trigger` endpoint
2. **For Automated Scheduling**: Set up external cron service (see [setup-cron.md](setup-cron.md))

## 📚 Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm start           # Start production server

# Testing
npm run test-gemini    # Test Gemini AI integration
npm run test-prompts   # Test content generation prompts
npm run test-auto      # Test auto-categorization
npm run test-webhook   # Test webhook endpoints

# WordPress Setup
npm run tags           # Get available tags/categories
npm run setup-content  # Create recommended categories/tags
npm run test-auth      # Test WordPress authentication

# Analytics
npm run analytics      # Analyze content distribution
```

## 🌐 API Endpoints

| Endpoint      | Method | Description                      |
| ------------- | ------ | -------------------------------- |
| `/`           | GET    | Health check and status          |
| `/trigger`    | POST   | Manually trigger blog generation |
| `/webhook`    | POST   | External cron service endpoint   |
| `/keep-alive` | GET    | Prevent service from sleeping    |

## 📊 Content Types

The AI generates diverse content including:

- **Case Studies**: Real-world AI implementation examples
- **Problem Solutions**: AI solutions to business challenges
- **Technology Deep-Dives**: Technical AI explanations
- **Industry Applications**: AI in specific sectors
- **Implementation Guides**: Step-by-step AI adoption
- **Trend Analysis**: Current AI market trends
- **Best Practices**: AI development guidelines

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   External      │    │   Node.js       │    │   WordPress     │
│   Cron Service  │───▶│   Application   │───▶│   REST API      │
│   (cron-job.org)│    │   (Express.js)  │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   Gemini AI     │
                       │   (Content Gen) │
                       └─────────────────┘
```

## 🔍 Troubleshooting

### Common Issues

**Authentication Errors:**

```bash
npm run test-auth
npm run debug-auth
```

**Content Generation Issues:**

```bash
npm run test-gemini
npm run test-prompts
```

**Scheduling Problems:**

```bash
npm run test-webhook
```

### Error Solutions

1. **WordPress API Errors**: Check user permissions and application password
2. **Gemini API Errors**: Verify API key and model availability
3. **Scheduling Issues**: Use external cron services for free hosting
4. **Content Quality**: Adjust prompts in `index.js`

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powerful content generation
- [WordPress REST API](https://developer.wordpress.org/rest-api/) for seamless publishing
- [Render](https://render.com/) for reliable free hosting
- [Express.js](https://expressjs.com/) for the web framework

## 📈 Roadmap

- [ ] Multi-language support
- [ ] Content templates and themes
- [ ] Social media auto-posting
- [ ] Analytics dashboard
- [ ] A/B testing for content optimization
- [ ] Integration with more AI models
- [ ] Bulk content generation
- [ ] Content scheduling calendar

## 📞 Support

- 📧 **Email**: [your-email@domain.com]
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/ai-blog-automation/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/ai-blog-automation/discussions)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/ai-blog-automation/wiki)

---

<div align="center">

**⭐ Star this repository if it helped you!**

[![GitHub stars](https://img.shields.io/github/stars/yourusername/ai-blog-automation?style=social)](https://github.com/yourusername/ai-blog-automation)
[![GitHub forks](https://img.shields.io/github/forks/yourusername/ai-blog-automation?style=social)](https://github.com/yourusername/ai-blog-automation)
[![GitHub issues](https://img.shields.io/github/issues/yourusername/ai-blog-automation)](https://github.com/yourusername/ai-blog-automation/issues)

_Made with ❤️ for the AI and WordPress communities_

</div>
