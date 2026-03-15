#!/bin/bash

# TUYA - Vercel Deployment Script
# This script deploys frontend apps to Vercel

echo "🚀 TUYA - Vercel Frontend Deployment"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get Railway URL
if [ -f /tmp/railway_url.txt ]; then
    RAILWAY_URL=$(cat /tmp/railway_url.txt)
else
    echo -e "${YELLOW}Enter your Railway URL:${NC}"
    read -p "Railway URL: " RAILWAY_URL
fi

echo -e "${GREEN}Using Railway URL: $RAILWAY_URL${NC}"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to install Vercel CLI${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Vercel CLI installed${NC}"
echo ""

# Function to deploy app
deploy_app() {
    local app_name=$1
    local app_path=$2
    
    echo -e "${YELLOW}Deploying $app_name...${NC}"
    
    cd "$app_path"
    
    # Update environment variables
    cat > .env.production << EOF
NEXT_PUBLIC_API_URL=$RAILWAY_URL
NEXT_PUBLIC_SOCKET_URL=wss://$RAILWAY_URL
NEXT_PUBLIC_APP_NAME=$app_name
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
EOF
    
    echo "Environment variables updated"
    
    # Deploy to Vercel
    echo "Running: vercel --prod"
    vercel --prod --yes
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ Failed to deploy $app_name${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✓ $app_name deployed${NC}"
    echo ""
    
    return 0
}

# Deploy Driver App
echo -e "${YELLOW}Step 1: Deploy Driver App${NC}"
deploy_app "TUYA Driver" "/home/ubuntu/tuya-monorepo/apps/driver-app"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy Driver App${NC}"
    exit 1
fi

# Deploy Passenger App
echo -e "${YELLOW}Step 2: Deploy Passenger App${NC}"
deploy_app "TUYA Passenger" "/home/ubuntu/tuya-monorepo/apps/passenger-app"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy Passenger App${NC}"
    exit 1
fi

# Deploy Admin Dashboard
echo -e "${YELLOW}Step 3: Deploy Admin Dashboard${NC}"
deploy_app "TUYA Admin" "/home/ubuntu/tuya-monorepo/apps/admin-dashboard"

if [ $? -ne 0 ]; then
    echo -e "${RED}Failed to deploy Admin Dashboard${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Vercel Deployment Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Get your Vercel URLs from the deployment output"
echo "2. Update Railway CORS settings"
echo "3. Run: ./scripts/04-integration-test.sh"
echo ""
