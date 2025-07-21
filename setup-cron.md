# 🕐 Cron Job Setup for Render Free Tier

Since Render's free tier doesn't support persistent cron jobs, we need to use an external cron service.

## 🚀 Solution: External Cron Service

### Option 1: cron-job.org (Recommended - Free)

1. **Go to**: https://cron-job.org/
2. **Sign up** for a free account
3. **Create a new cron job**:
   - **Title**: AI Blog Automation
   - **URL**: `https://your-render-app.onrender.com/webhook`
   - **Schedule**: Every 5 minutes (to ensure we catch 9 AM)
   - **Method**: POST
   - **Headers**: `Content-Type: application/json`
   - **Body**: `{}`

### Option 2: UptimeRobot (Free)

1. **Go to**: https://uptimerobot.com/
2. **Sign up** for a free account
3. **Add a new monitor**:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://your-render-app.onrender.com/webhook`
   - **Monitoring Interval**: 5 minutes
   - **Method**: POST

### Option 3: GitHub Actions (Free)

Create `.github/workflows/cron.yml`:

```yaml
name: Blog Automation Cron

on:
  schedule:
    - cron: "0 9 * * *" # Every day at 9 AM UTC

jobs:
  trigger-blog:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Blog Generation
        run: |
          curl -X POST https://your-render-app.onrender.com/webhook \
            -H "Content-Type: application/json" \
            -d '{}'
```

## 🔧 How It Works

1. **External service** pings your webhook every 5 minutes
2. **Webhook checks** if it's 9 AM (with 5-minute window)
3. **If it's 9 AM**: Triggers blog generation
4. **If not 9 AM**: Just responds with status

## 📊 Monitoring

- **Health Check**: `https://your-render-app.onrender.com/`
- **Manual Trigger**: `POST https://your-render-app.onrender.com/trigger`
- **Keep Alive**: `https://your-render-app.onrender.com/keep-alive`

## 🎯 Benefits

✅ **Works on Render Free Tier**  
✅ **No server sleep issues**  
✅ **Reliable scheduling**  
✅ **Easy monitoring**  
✅ **Free external service**

## 🔄 Update Your Render URL

Replace `your-render-app.onrender.com` with your actual Render URL in the setup above.
