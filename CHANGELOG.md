# 📝 Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- GitHub Actions CI/CD pipeline
- Dependabot configuration for automatic dependency updates
- Comprehensive issue templates
- Security policy and code of conduct
- Contributing guidelines

### Changed

- Updated README with better formatting and badges
- Improved documentation structure

## [1.0.0] - 2024-07-19

### Added

- Initial release of AI Blog Automation
- Google Gemini AI integration for content generation
- WordPress REST API integration for publishing
- Automatic category and tag selection using AI
- Webhook-based scheduling system
- Support for multiple content types (case studies, problem solutions, etc.)
- Comprehensive helper scripts for setup and testing
- Free hosting optimization (Render, Heroku)
- Health check and monitoring endpoints
- Manual trigger functionality
- Keep-alive endpoint to prevent sleep mode

### Features

- **AI Content Generation**: Uses Gemini 1.5 Flash for high-quality content
- **SEO Optimization**: Automatically generates SEO-friendly titles and structured content
- **Smart Categorization**: AI-powered selection of categories and tags
- **Diverse Content**: Generates case studies, implementation guides, trend analysis
- **Automated Publishing**: Scheduled posting to WordPress via REST API
- **Free Hosting Ready**: Optimized for Render and Heroku free tiers
- **External Cron Support**: Webhook-based scheduling for reliable automation

### Technical Stack

- Node.js with Express.js
- Google Generative AI (Gemini 1.5 Flash)
- WordPress REST API
- External cron services (cron-job.org, UptimeRobot)
- Environment-based configuration

### Documentation

- Comprehensive README with setup instructions
- WordPress setup guide with recommended categories and tags
- Deployment guides for Render and Heroku
- External cron service setup instructions
- Helper scripts for testing and configuration

## [0.9.0] - 2024-07-15

### Added

- Basic Node.js application structure
- OpenAI integration (later replaced with Gemini)
- WordPress API integration
- Basic content generation functionality

### Changed

- Switched from OpenAI to Google Gemini AI
- Improved content generation prompts
- Enhanced error handling

### Fixed

- WordPress tag format issues (integers vs strings)
- Authentication problems with WordPress API
- Cron job reliability on free hosting platforms

## [0.8.0] - 2024-07-10

### Added

- Initial project setup
- Basic Express.js server
- Environment configuration

---

## 📋 Version History

- **1.0.0**: First stable release with full AI automation
- **0.9.0**: Beta version with core functionality
- **0.8.0**: Alpha version with basic setup

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/ai-blog-automation)
- [Issues](https://github.com/yourusername/ai-blog-automation/issues)
- [Releases](https://github.com/yourusername/ai-blog-automation/releases)
- [Documentation](https://github.com/yourusername/ai-blog-automation/wiki)

---

**For detailed information about each release, visit our [GitHub Releases page](https://github.com/yourusername/ai-blog-automation/releases).**
