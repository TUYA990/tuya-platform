#!/bin/bash

# TUYA Platform - Automated Railway Deployment Script
# This script deploys all services to Railway

set -e

echo "🚀 TUYA Platform - Railway Deployment"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
RAILWAY_TOKEN="4b628e93-cbbf-4115-9b30-cfe7017005c2"
SUPABASE_URL="postgresql://postgres:M%40ussab2252026@db.pmeftbpnggkaocphbqcw.supabase.co:5432/postgres"
PROJECT_ROOT="/home/ubuntu/tuya-monorepo"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "Project Root: $PROJECT_ROOT"
echo "Railway Token: ${RAILWAY_TOKEN:0:10}..."
echo ""

# Step 1: Create railway.json files
echo -e "${YELLOW}📝 Step 1: Creating railway.json files...${NC}"

# Backend railway.json
cat > "$PROJECT_ROOT/packages/backend/railway.json" << 'EOF'
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 5
  }
}
EOF
echo -e "${GREEN}✅ Backend railway.json created${NC}"

# Driver App railway.json
cat > "$PROJECT_ROOT/apps/driver-app/railway.json" << 'EOF'
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 5
  }
}
EOF
echo -e "${GREEN}✅ Driver App railway.json created${NC}"

# Admin Dashboard railway.json
cat > "$PROJECT_ROOT/apps/admin-dashboard/railway.json" << 'EOF'
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "on_failure",
    "restartPolicyMaxRetries": 5
  }
}
EOF
echo -e "${GREEN}✅ Admin Dashboard railway.json created${NC}"

echo ""

# Step 2: Create Procfile files
echo -e "${YELLOW}📝 Step 2: Creating Procfile files...${NC}"

# Backend Procfile
cat > "$PROJECT_ROOT/packages/backend/Procfile" << 'EOF'
web: npm start
EOF
echo -e "${GREEN}✅ Backend Procfile created${NC}"

# Driver App Procfile
cat > "$PROJECT_ROOT/apps/driver-app/Procfile" << 'EOF'
web: npm start
EOF
echo -e "${GREEN}✅ Driver App Procfile created${NC}"

# Admin Dashboard Procfile
cat > "$PROJECT_ROOT/apps/admin-dashboard/Procfile" << 'EOF'
web: npm start
EOF
echo -e "${GREEN}✅ Admin Dashboard Procfile created${NC}"

echo ""

# Step 3: Create environment files
echo -e "${YELLOW}📝 Step 3: Creating environment files...${NC}"

# Backend .env.production
cat > "$PROJECT_ROOT/packages/backend/.env.production" << EOF
PORT=4000
NODE_ENV=production
DATABASE_URL=$SUPABASE_URL
JWT_SECRET=tuya-jwt-secret-key-2026-production-mode-secure-key-12345
GOOGLE_MAPS_API_KEY=AIzaSyDemoKeyForTUYA2026
SOCKET_IO_CORS_ORIGIN=https://tuya-app-sudan.vercel.app,https://tuya-driver-app.railway.app,https://tuya-admin-dashboard.railway.app
LOG_LEVEL=info
EOF
echo -e "${GREEN}✅ Backend .env.production created${NC}"

# Driver App .env.production
cat > "$PROJECT_ROOT/apps/driver-app/.env.production" << 'EOF'
NEXT_PUBLIC_API_URL=https://tuya-backend.railway.app
NEXT_PUBLIC_SOCKET_URL=wss://tuya-backend.railway.app
NEXT_PUBLIC_APP_NAME=TUYA Driver
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
EOF
echo -e "${GREEN}✅ Driver App .env.production created${NC}"

# Admin Dashboard .env.production
cat > "$PROJECT_ROOT/apps/admin-dashboard/.env.production" << 'EOF'
NEXT_PUBLIC_API_URL=https://tuya-backend.railway.app
NEXT_PUBLIC_SOCKET_URL=wss://tuya-backend.railway.app
NEXT_PUBLIC_APP_NAME=TUYA Admin
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_ENVIRONMENT=production
EOF
echo -e "${GREEN}✅ Admin Dashboard .env.production created${NC}"

echo ""

# Step 4: Summary
echo -e "${GREEN}✅ All files created successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "1. Go to: https://railway.app/dashboard"
echo "2. Create 4 new projects:"
echo "   - Backend (from packages/backend)"
echo "   - Driver App (from apps/driver-app)"
echo "   - Admin Dashboard (from apps/admin-dashboard)"
echo "3. For each project:"
echo "   - Connect GitHub repository: Tuya990/tuya-platform"
echo "   - Select the appropriate folder"
echo "   - Add environment variables"
echo "   - Deploy"
echo ""
echo -e "${YELLOW}📊 Expected URLs:${NC}"
echo "Backend: https://tuya-backend-xxx.railway.app"
echo "Driver App: https://tuya-driver-app-xxx.railway.app"
echo "Admin Dashboard: https://tuya-admin-dashboard-xxx.railway.app"
echo "Passenger App: https://tuya-app-sudan.vercel.app (already deployed)"
echo ""
echo -e "${GREEN}✅ Deployment preparation complete!${NC}"
