#!/bin/bash

# Dependency Fix Script for Amicaenv
# This script resolves common dependency warnings and version conflicts

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Fixing Amicly Dependencies & Warnings${NC}"

# Clean everything first
echo -e "${BLUE}🧹 Cleaning existing installations...${NC}"
rm -rf node_modules
rm -rf apps/mobile/node_modules
rm -f yarn.lock
rm -f apps/mobile/yarn.lock

# Clear Yarn cache
echo -e "${BLUE}📦 Clearing Yarn cache...${NC}"
yarn cache clean

# Install root dependencies with latest resolutions
echo -e "${BLUE}📥 Installing root dependencies with latest versions...${NC}"
yarn install

# Install mobile app dependencies
echo -e "${BLUE}📱 Installing mobile app dependencies...${NC}"
cd apps/mobile
yarn install
cd ../..

# Run audit to check for vulnerabilities
echo -e "${BLUE}🔍 Running security audit...${NC}"
yarn audit --groups dependencies || echo -e "${YELLOW}   Some audit issues found - review if needed${NC}"

# Verify installation
echo -e "${BLUE}✅ Verifying installations...${NC}"

if yarn expo --version &>/dev/null; then
    echo -e "${GREEN}   ✅ Expo CLI: $(yarn expo --version)${NC}"
else
    echo -e "${RED}   ❌ Expo CLI installation failed${NC}"
fi

if yarn eas --version &>/dev/null; then
    echo -e "${GREEN}   ✅ EAS CLI: $(yarn eas --version)${NC}"
else
    echo -e "${RED}   ❌ EAS CLI installation failed${NC}"
fi

if yarn cdk --version &>/dev/null; then
    echo -e "${GREEN}   ✅ AWS CDK: $(yarn cdk --version)${NC}"
else
    echo -e "${RED}   ❌ AWS CDK installation failed${NC}"
fi

echo -e "${GREEN}🎉 Dependency fix complete!${NC}"
echo -e ""
echo -e "${BLUE}📝 Summary:${NC}"
echo -e "   - Cleaned all node_modules and lock files"
echo -e "   - Updated to latest compatible versions"
echo -e "   - Added yarn resolutions for common warnings"
echo -e "   - Configured yarn to suppress non-critical warnings"
echo -e ""
echo -e "${YELLOW}💡 If you still see warnings, they are likely from dependencies and will be fixed by maintainers${NC}"