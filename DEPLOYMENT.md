# TruthLens V7 - Deployment Guide

Complete deployment instructions for TruthLens V7 on various platforms.

---

## Table of Contents
- [Vercel (Recommended)](#vercel-recommended)
- [AWS](#aws)
- [Docker](#docker)
- [Netlify](#netlify)
- [Self-Hosted](#self-hosted)
- [Environment Variables](#environment-variables)

---

## Vercel (Recommended)

**Easiest deployment option with automatic CI/CD**

### Prerequisites
- Vercel account (free at vercel.com)
- GitHub repository

### Step 1: Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your GitHub account
4. Select `truthlens-v7` repository

### Step 2: Configure Project
- Framework: React
- Root Directory: ./
- Build Command: `npm run build`
- Output Directory: build

### Step 3: Add Environment Variables
In Vercel dashboard:
```
REACT_APP_API_URL=https://api.truthlens.io
REACT_APP_API_KEY=your_api_key_here
NODE_ENV=production
```

### Step 4: Deploy
Click "Deploy" button. Vercel will automatically:
- Build your project
- Run tests
- Deploy to production
- Generate unique URL

**Your app will be live in ~2 minutes!**

### Deploy Updates
Just push to main branch - Vercel auto-deploys!

```bash
git push origin main
```

---

## AWS

### Using S3 + CloudFront

#### Prerequisites
- AWS Account
- AWS CLI installed
- AWS credentials configured

#### Step 1: Create S3 Bucket
```bash
aws s3 mb s3://truthlens-v7-prod --region us-east-1
```

#### Step 2: Enable Static Website Hosting
```bash
aws s3 website s3://truthlens-v7-prod/ \
  --index-document index.html \
  --error-document index.html
```

#### Step 3: Build Project
```bash
npm run build
```

#### Step 4: Upload to S3
```bash
aws s3 sync build/ s3://truthlens-v7-prod/ \
  --delete \
  --cache-control "max-age=31536000,public"
```

#### Step 5: Create CloudFront Distribution
```bash
aws cloudfront create-distribution \
  --origin-domain-name truthlens-v7-prod.s3.amazonaws.com \
  --default-root-object index.html
```

#### Step 6: Add Custom Domain
```bash
aws route53 create-resource-record-set \
  --hosted-zone-id YOUR_ZONE_ID \
  --change-batch file://route53-changes.json
```

### Using Elastic Beanstalk (Advanced)

```bash
# Install EB CLI
pip install awsebcli --upgrade --user

# Initialize
eb init -p node.js-16 truthlens-v7

# Create environment
eb create truthlens-prod

# Deploy
eb deploy

# Open in browser
eb open
```

---

## Docker

### Build Docker Image

#### Step 1: Create Dockerfile
```dockerfile
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

#### Step 2: Build Image
```bash
docker build -t truthlens-v7:latest .
```

#### Step 3: Run Container
```bash
docker run -p 3000:3000 \
  -e REACT_APP_API_URL=https://api.truthlens.io \
  truthlens-v7:latest
```

#### Step 4: Push to Docker Hub
```bash
docker tag truthlens-v7:latest yourusername/truthlens-v7:latest
docker push yourusername/truthlens-v7:latest
```

### Deploy with Docker Compose

```yaml
version: '3.8'

services:
  truthlens:
    image: yourusername/truthlens-v7:latest
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_URL: https://api.truthlens.io
      REACT_APP_API_KEY: ${API_KEY}
      NODE_ENV: production
    restart: always
```

Run with:
```bash
docker-compose up -d
```

---

## Netlify

### Prerequisites
- Netlify account (free at netlify.com)
- GitHub repository

### Step 1: Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub account
4. Select `truthlens-v7` repo

### Step 2: Configure Build
- Build command: `npm run build`
- Publish directory: `build`

### Step 3: Set Environment Variables
In Site settings → Build & deploy → Environment:
```
REACT_APP_API_URL=https://api.truthlens.io
REACT_APP_API_KEY=your_key
```

### Step 4: Deploy
Click "Deploy". Netlify will build and deploy automatically.

### Custom Domain
Go to Site settings → Domain management → Custom domain

---

## Self-Hosted

### On Your Own Server (Ubuntu)

#### Prerequisites
- Server with Ubuntu 20.04+
- Node.js 16+
- Nginx or Apache

#### Step 1: SSH into Server
```bash
ssh user@your-server-ip
```

#### Step 2: Clone Repository
```bash
git clone https://github.com/yourusername/truthlens-v7.git
cd truthlens-v7
```

#### Step 3: Install Dependencies
```bash
npm install
npm run build
```

#### Step 4: Setup Nginx
```bash
sudo nano /etc/nginx/sites-available/truthlens
```

Add:
```nginx
server {
    listen 80;
    server_name truthlens.yourdomain.com;
    
    root /home/user/truthlens-v7/build;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Step 5: Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/truthlens /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 6: Setup SSL (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d truthlens.yourdomain.com
```

#### Step 7: Setup Auto-Updates
Create `/home/user/deploy.sh`:
```bash
#!/bin/bash
cd /home/user/truthlens-v7
git pull origin main
npm install
npm run build
sudo systemctl restart nginx
```

Make executable:
```bash
chmod +x /home/user/deploy.sh
```

Add to crontab for auto-deploy on git pushes (or use GitHub webhooks).

---

## Environment Variables

### Required Variables
```env
REACT_APP_API_URL=https://api.truthlens.io
REACT_APP_API_KEY=your_api_key_here
NODE_ENV=production
```

### Optional Variables
```env
REACT_APP_LOG_LEVEL=info
REACT_APP_ANALYTICS_ID=your_analytics_id
REACT_APP_SENTRY_DSN=your_sentry_dsn
REACT_APP_ENVIRONMENT=production
```

### Security Best Practices
- Never commit `.env` files
- Use platform-specific secret management
- Rotate API keys regularly
- Use different keys for dev/prod
- Encrypt sensitive data at rest

---

## Performance Optimization

### Build Size Optimization
```bash
npm run build -- --analyze
```

### Enable Gzip Compression
**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css text/xml application/json application/javascript;
gzip_min_length 1000;
```

**Vercel:** Automatic

### CDN Configuration
Use CloudFront or Cloudflare for:
- Edge caching
- Image optimization
- DDoS protection

---

## Monitoring & Logging

### Setup Sentry (Error Tracking)
```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Setup Analytics
Google Analytics, Mixpanel, or Plausible for user tracking.

### Health Checks
Add endpoint for monitoring:
```javascript
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

---

## Rollback Procedure

### Vercel
```bash
vercel rollback
```

### AWS S3
```bash
aws s3 sync s3://truthlens-v7-prod-backup/ s3://truthlens-v7-prod/ --delete
```

### Docker
```bash
docker run -p 3000:3000 yourusername/truthlens-v7:previous-tag
```

---

## Troubleshooting

### Build Fails
1. Check Node version: `node --version` (need 16+)
2. Clear cache: `rm -rf node_modules && npm install`
3. Check for syntax errors: `npm run lint`

### App Won't Load
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check CORS configuration

### Performance Issues
1. Check bundle size: `npm run build -- --analyze`
2. Enable compression
3. Use CDN for static assets
4. Implement code splitting

---

## Getting Help

- GitHub Issues: Report bugs
- Documentation: https://docs.truthlens.io
- Support Email: support@truthlens.io
- Discord Community: Join our server

---

**Last Updated:** 2024
**Maintainer:** Your Team
