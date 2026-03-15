#!/bin/bash

# TUYA - Railway Deployment Script
# This script deploys the backend to Railway

echo "🚀 TUYA - Railway Backend Deployment"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Installing Railway CLI...${NC}"
    npm install -g @railway/cli
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Railway CLI${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Railway CLI installed${NC}"
echo ""

echo -e "${YELLOW}Step 1: Login to Railway${NC}"
echo "Running: railway login"
railway login

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to login to Railway${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Logged in to Railway${NC}"
echo ""

echo -e "${YELLOW}Step 2: Initialize Railway Project${NC}"
cd /home/ubuntu/tuya-monorepo/packages/backend

echo "Running: railway init"
railway init

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to initialize Railway project${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Railway project initialized${NC}"
echo ""

echo -e "${YELLOW}Step 3: Deploy to Railway${NC}"
echo "Running: railway up"
railway up

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to deploy to Railway${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Deployed to Railway${NC}"
echo ""

echo -e "${YELLOW}Step 4: Get Railway URL${NC}"
echo "Running: railway status"
RAILWAY_URL=$(railway status | grep -oP 'https://[^\s]+' | head -1)

if [ -z "$RAILWAY_URL" ]; then
    echo -e "${YELLOW}Could not automatically get Railway URL${NC}"
    echo "Please get it from: https://railway.app/dashboard"
    read -p "Enter your Railway URL: " RAILWAY_URL
fi

echo -e "${GREEN}✓ Railway URL: $RAILWAY_URL${NC}"
echo ""

echo -e "${YELLOW}Step 5: Configure Environment Variables${NC}"
echo "Setting environment variables in Railway..."

# Set environment variables in Railway
railway variables set PORT=4000
railway variables set NODE_ENV=production
railway variables set LOG_LEVEL=info
railway variables set ENABLE_GPS_VALIDATION=true
railway variables set ENABLE_APP_ATTESTATION=true
railway variables set ENABLE_PHONE_VERIFICATION=true
railway variables set ENABLE_SURGE_PRICING=true

echo -e "${GREEN}✓ Environment variables set${NC}"
echo ""

echo -e "${YELLOW}Step 6: Test Backend Health${NC}"
echo "Waiting for deployment to be ready..."
sleep 10

echo "Testing health endpoint..."
HEALTH_RESPONSE=$(curl -s "$RAILWAY_URL/api/health")

if echo "$HEALTH_RESPONSE" | grep -q "OK"; then
    echo -e "${GREEN}✓ Backend is healthy${NC}"
    echo "Response: $HEALTH_RESPONSE"
else
    echo -e "${YELLOW}⚠ Could not verify backend health${NC}"
    echo "Please check manually: $RAILWAY_URL/api/health"
fi

echo ""
echo -e "${GREEN}✅ Railway Deployment Complete!${NC}"
echo ""
echo "Railway URL: $RAILWAY_URL"
echo ""
echo "Next steps:"
echo "1. Update Vercel environment variables with this URL"
echo "2. Run: ./scripts/03-vercel-deploy.sh"
echo "3. Deploy frontend apps to Vercel"
echo ""

# Save Railway URL for next script
echo "$RAILWAY_URL" > /tmp/railway_url.txt
