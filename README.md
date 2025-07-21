# AI Blog Automation

An automated blog posting system that generates AI-powered content using Google's Gemini AI and publishes it to WordPress automatically.

## 🚀 Features

- **AI Content Generation**: Uses Google's Gemini AI to generate engaging blog posts
- **Automatic Scheduling**: Posts blogs daily at a scheduled time (default: 9 AM)
- **WordPress Integration**: Publishes directly to WordPress via REST API
- **Manual Trigger**: Can trigger blog generation manually via API endpoint
- **Health Monitoring**: Built-in health check endpoint
- **Free Hosting Ready**: Optimized for deployment on Heroku, Render, Railway, etc.

## 📋 Prerequisites

1. **Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **WordPress Site**: A WordPress site with REST API enabled
3. **WordPress Application Password**: Create an app password in WordPress admin

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd ai-blog-automation
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your settings:

```bash
cp env.example .env
```

Edit `.env` with your actual values:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your-actual-gemini-api-key

# WordPress Configuration
WP_URL=https://yourdomain.com
WP_USER=your_wordpress_username
WP_APP_PASS=your_app_password
WP_CATEGORY_ID=1
WP_TAGS=1,2,3

# Scheduling Configuration
SCHEDULE_TIME=0 9 * * *
TIMEZONE=UTC
```

### 3. WordPress Setup

1. **Enable REST API**: Ensure your WordPress site has REST API enabled
2. **Create Application Password**:

   - Go to WordPress Admin → Users → Profile
   - Scroll down to "Application Passwords"
   - Create a new app password
   - Use this password in `WP_APP_PASS`

3. **Get Category ID** (optional):
   - Go to Posts → Categories
   - Click on your desired category
   - The ID will be in the URL: `/wp-admin/edit-tags.php?action=edit&taxonomy=category&tag_ID=1`
   - Use this ID in `WP_CATEGORY_ID`

### 4. Test Locally

```bash
npm start
```

Visit `http://localhost:3000` to see the health check.

## 🚀 Deployment

### Heroku Deployment

1. **Install Heroku CLI** and login:

```bash
heroku login
```

2. **Create Heroku app**:

```bash
heroku create your-app-name
```

3. **Set environment variables**:

```bash
heroku config:set GEMINI_API_KEY=your_key
heroku config:set WP_URL=https://yourdomain.com
heroku config:set WP_USER=your_username
heroku config:set WP_APP_PASS=your_app_password
heroku config:set WP_CATEGORY_ID=1
heroku config:set WP_TAGS=1,2,3
```

4. **Deploy**:

```bash
git add .
git commit -m "Initial deployment"
git push heroku main
```

### Render Deployment

1. **Connect your GitHub repo** to Render
2. **Create a new Web Service**
3. **Configure**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add all variables from your `.env` file

### Railway Deployment

1. **Connect your GitHub repo** to Railway
2. **Add environment variables** in the Railway dashboard
3. **Deploy automatically** on push

## 📡 API Endpoints

### Health Check

```
GET /
```

Returns the status of the automation service.

### Manual Trigger

```
POST /trigger
```

Manually triggers blog generation and posting.

## ⏰ Scheduling

The system uses cron expressions for scheduling. Default schedule is `0 9 * * *` (9 AM daily).

**Cron Expression Format**: `minute hour day month day-of-week`

**Examples**:

- `0 9 * * *` - Daily at 9 AM
- `0 12 * * 1-5` - Weekdays at 12 PM
- `0 8,20 * * *` - Twice daily at 8 AM and 8 PM

## 🔧 Configuration Options

| Variable         | Description                           | Default     |
| ---------------- | ------------------------------------- | ----------- |
| `GEMINI_API_KEY` | Your Gemini API key                   | Required    |
| `WP_URL`         | WordPress site URL                    | Required    |
| `WP_USER`        | WordPress username                    | Required    |
| `WP_APP_PASS`    | WordPress app password                | Required    |
| `WP_CATEGORY_ID` | WordPress category ID                 | Optional    |
| `WP_TAGS`        | Comma-separated tag IDs (e.g., 1,2,3) | Optional    |
| `SCHEDULE_TIME`  | Cron expression                       | `0 9 * * *` |
| `TIMEZONE`       | Timezone for scheduling               | `UTC`       |
| `PORT`           | Server port                           | `3000`      |

## 🐛 Troubleshooting

### Common Issues

1. **Gemini API Errors**:

   - Check your API key is correct
   - Ensure you have sufficient quota
   - Verify the API key has proper permissions

2. **WordPress API Errors**:

   - Verify REST API is enabled
   - Check application password is correct
   - Ensure user has publishing permissions

3. **Scheduling Issues**:
   - Check timezone configuration
   - Verify cron expression format
   - Check server logs for errors

### Logs

The application logs all activities. Check your hosting platform's log viewer:

- **Heroku**: `heroku logs --tail`
- **Render**: Dashboard → Logs
- **Railway**: Dashboard → Deployments → Logs

## 🔒 Security Notes

- Never commit your `.env` file to version control
- Use application passwords, not your main WordPress password
- Regularly rotate your Gemini API key
- Monitor your API usage to avoid unexpected charges

## 📈 Monitoring

The application includes built-in monitoring:

- Health check endpoint for uptime monitoring
- Detailed logging of all operations
- Error tracking and reporting

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

MIT License - feel free to use this project for your own automation needs.
