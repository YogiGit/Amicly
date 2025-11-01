#!/bin/bash

# Build All Packages Script for Amicly (amicaenv)
# This script builds all packages and services in the correct order

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔨 Building All Amicly Packages (amicaenv)${NC}"

# Check if amicaenv is active
if [ "$PROJECT_ENV" != "amicaenv" ]; then
    echo -e "${YELLOW}⚠️  amicaenv not detected. Activating...${NC}"
    source ./scripts/amicaenv-activate.sh
fi

# Build order: shared packages first, then apps, then services
echo -e "${BLUE}📦 Building shared packages...${NC}"
yarn build:packages

echo -e "${BLUE}📱 Building mobile app...${NC}"
yarn build:mobile

echo -e "${BLUE}🌐 Building parent dashboard...${NC}"
yarn build:dashboard

echo -e "${BLUE}⚡ Building backend services...${NC}"
yarn build:services

echo -e "${GREEN}✅ All packages built successfully!${NC}"

# Optional: Run type checking across all packages
echo -e "${BLUE}🔍 Running type checks...${NC}"
yarn type-check

echo -e "${GREEN}🎉 Build process complete!${NC}"
echo -e ""
echo -e "${BLUE}📋 Build outputs:${NC}"
echo -e "   Mobile: apps/mobile/dist/"
echo -e "   Dashboard: apps/parent-dashboard/.next/"
echo -e "   Services: services/*/dist/"
echo -e "   Packages: packages/*/dist/"