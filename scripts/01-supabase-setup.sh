#!/bin/bash

# TUYA - Supabase Setup Script
# This script helps you set up Supabase database

echo "🚀 TUYA - Supabase Database Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Step 1: Create Supabase Project${NC}"
echo "1. Go to https://supabase.com/dashboard"
echo "2. Click 'New Project'"
echo "3. Fill in:"
echo "   - Name: tuya-db"
echo "   - Database Password: (create strong password)"
echo "   - Region: Europe or Middle East (closest to Sudan)"
echo "4. Click 'Create new project'"
echo "5. Wait 5 minutes for creation"
echo ""

read -p "Press Enter when Supabase project is created..."

echo ""
echo -e "${YELLOW}Step 2: Get Connection String${NC}"
echo "1. Go to Settings → Database"
echo "2. Copy PostgreSQL Connection String"
echo "3. Format: postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"
echo ""

read -p "Enter your PostgreSQL Connection String: " DB_CONNECTION_STRING

# Validate connection string
if [[ ! $DB_CONNECTION_STRING =~ ^postgresql:// ]]; then
    echo -e "${RED}❌ Invalid connection string format${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Connection string saved${NC}"
echo ""

echo -e "${YELLOW}Step 3: Initialize Database Schema${NC}"
echo "1. Go to SQL Editor in Supabase"
echo "2. Create new query"
echo "3. Copy entire content from:"
echo "   /home/ubuntu/tuya-monorepo/packages/backend/src/migrations/init.sql"
echo "4. Execute the SQL"
echo "5. Verify all 8 tables are created"
echo ""

read -p "Press Enter when database schema is initialized..."

echo ""
echo -e "${YELLOW}Step 4: Test Connection${NC}"

# Test connection
echo "Testing database connection..."
psql "$DB_CONNECTION_STRING" -c "SELECT version();" > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo "Please verify your connection string"
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 5: Save Connection String${NC}"

# Save to .env file
cat > /home/ubuntu/tuya-monorepo/packages/backend/.env.production << EOF
# Backend Production Environment Variables
PORT=4000
NODE_ENV=production
DATABASE_URL=$DB_CONNECTION_STRING
JWT_SECRET=your-super-secret-jwt-key-min-32-chars-here-12345678
GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
SOCKET_IO_CORS_ORIGIN=https://tuya-driver-app-xxx.vercel.app,https://tuya-passenger-app-xxx.vercel.app,https://tuya-admin-dashboard-xxx.vercel.app
LOG_LEVEL=info
ENABLE_GPS_VALIDATION=true
ENABLE_APP_ATTESTATION=true
ENABLE_PHONE_VERIFICATION=true
ENABLE_SURGE_PRICING=true
EOF

echo -e "${GREEN}✓ Environment file created${NC}"
echo "Location: /home/ubuntu/tuya-monorepo/packages/backend/.env.production"

echo ""
echo -e "${GREEN}✅ Supabase Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Run: ./scripts/02-railway-deploy.sh"
echo "2. Deploy Backend to Railway"
echo "3. Get Railway URL"
echo ""
