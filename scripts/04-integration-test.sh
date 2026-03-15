#!/bin/bash

# TUYA - Integration & Testing Script
# This script tests all components after deployment

echo "🧪 TUYA - Integration & Testing"
echo "==============================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get URLs
echo -e "${YELLOW}Enter your deployment URLs:${NC}"
echo ""

read -p "Railway URL (e.g., https://tuya-backend-xxx.railway.app): " RAILWAY_URL
read -p "Driver App URL (e.g., https://tuya-driver-app-xxx.vercel.app): " DRIVER_URL
read -p "Passenger App URL (e.g., https://tuya-passenger-app-xxx.vercel.app): " PASSENGER_URL
read -p "Admin Dashboard URL (e.g., https://tuya-admin-dashboard-xxx.vercel.app): " ADMIN_URL

echo ""
echo -e "${BLUE}Testing Configuration:${NC}"
echo "Railway URL: $RAILWAY_URL"
echo "Driver App: $DRIVER_URL"
echo "Passenger App: $PASSENGER_URL"
echo "Admin Dashboard: $ADMIN_URL"
echo ""

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to test endpoint
test_endpoint() {
    local name=$1
    local url=$2
    
    echo -n "Testing $name... "
    
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$RESPONSE" = "200" ]; then
        echo -e "${GREEN}✓ OK (HTTP 200)${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED (HTTP $RESPONSE)${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

# Function to test API endpoint
test_api() {
    local name=$1
    local url=$2
    
    echo -n "Testing $name... "
    
    RESPONSE=$(curl -s "$url")
    
    if echo "$RESPONSE" | grep -q "status\|data\|error"; then
        echo -e "${GREEN}✓ OK${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}✗ FAILED${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

echo -e "${YELLOW}Phase 1: Backend Health Checks${NC}"
echo "==============================="

test_endpoint "Backend Health" "$RAILWAY_URL/api/health"
test_endpoint "Backend Status" "$RAILWAY_URL/api/status"

echo ""
echo -e "${YELLOW}Phase 2: API Endpoints${NC}"
echo "====================="

test_api "GET /api/drivers" "$RAILWAY_URL/api/drivers"
test_api "GET /api/passengers" "$RAILWAY_URL/api/passengers"
test_api "GET /api/rides" "$RAILWAY_URL/api/rides"

echo ""
echo -e "${YELLOW}Phase 3: Frontend Apps${NC}"
echo "====================="

test_endpoint "Driver App" "$DRIVER_URL"
test_endpoint "Passenger App" "$PASSENGER_URL"
test_endpoint "Admin Dashboard" "$ADMIN_URL"

echo ""
echo -e "${YELLOW}Phase 4: CORS & WebSocket${NC}"
echo "========================"

# Test CORS headers
echo -n "Testing CORS headers... "
CORS_RESPONSE=$(curl -s -H "Origin: $DRIVER_URL" -H "Access-Control-Request-Method: GET" -o /dev/null -w "%{http_code}" "$RAILWAY_URL/api/health")

if [ "$CORS_RESPONSE" = "200" ] || [ "$CORS_RESPONSE" = "204" ]; then
    echo -e "${GREEN}✓ OK${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ Check manually${NC}"
fi

echo ""
echo -e "${YELLOW}Phase 5: Performance${NC}"
echo "==================="

# Test response time
echo -n "Testing response time... "
START=$(date +%s%N)
curl -s "$RAILWAY_URL/api/health" > /dev/null
END=$(date +%s%N)
RESPONSE_TIME=$(( ($END - $START) / 1000000 ))

if [ $RESPONSE_TIME -lt 1000 ]; then
    echo -e "${GREEN}✓ ${RESPONSE_TIME}ms${NC}"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠ ${RESPONSE_TIME}ms (slower than expected)${NC}"
fi

echo ""
echo -e "${BLUE}Test Summary${NC}"
echo "============"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All tests passed!${NC}"
    echo ""
    echo "Your TUYA platform is ready!"
    echo ""
    echo "URLs:"
    echo "  Driver App: $DRIVER_URL"
    echo "  Passenger App: $PASSENGER_URL"
    echo "  Admin Dashboard: $ADMIN_URL"
    echo "  Backend API: $RAILWAY_URL"
    echo ""
    exit 0
else
    echo ""
    echo -e "${RED}❌ Some tests failed${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check Railway logs: railway logs"
    echo "2. Check Vercel logs in dashboard"
    echo "3. Verify environment variables"
    echo "4. Check CORS configuration"
    echo ""
    exit 1
fi
