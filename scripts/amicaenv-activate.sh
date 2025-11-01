#!/bin/bash

# Amicaenv - Project-Isolated Development Environment Activation Script
# This script sets up the complete Amicly development environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Activating amicaenv - Amicly Development Environment${NC}"

# Check if we're in the correct directory
if [ ! -f "package.json" ] || [ ! -f ".nvmrc" ]; then
    echo -e "${RED}❌ Error: Please run this script from the Amicly project root directory${NC}"
    exit 1
fi

# Check Node.js version
REQUIRED_NODE_VERSION=$(cat .nvmrc)
CURRENT_NODE_VERSION=$(node --version | sed 's/v//')

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js ${REQUIRED_NODE_VERSION}${NC}"
    echo -e "${YELLOW}   Recommended: Use nvm to install the correct version${NC}"
    echo -e "${YELLOW}   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash${NC}"
    echo -e "${YELLOW}   nvm install ${REQUIRED_NODE_VERSION}${NC}"
    exit 1
fi

# Check Yarn installation
if ! command -v yarn &> /dev/null; then
    echo -e "${RED}❌ Yarn is not installed. Installing Yarn globally...${NC}"
    npm install -g yarn
fi

# Set environment variables
export PROJECT_ENV="amicaenv"
export PATH="./node_modules/.bin:$PATH"

echo -e "${GREEN}✅ Environment variables set:${NC}"
echo -e "   PROJECT_ENV=${PROJECT_ENV}"
echo -e "   Node.js version: ${CURRENT_NODE_VERSION}"
echo -e "   Yarn version: $(yarn --version)"

# Install dependencies with warning suppression
echo -e "${BLUE}📦 Installing dependencies...${NC}"
echo -e "${YELLOW}   Note: Deprecation warnings from dependencies are normal and will be resolved by package maintainers${NC}"
yarn install --silent 2>/dev/null || yarn install

# Install workspace dependencies to ensure proper linking
echo -e "${BLUE}🔗 Installing workspace dependencies...${NC}"
echo -e "${YELLOW}   Note: Ensuring all workspace dependencies are properly linked for serverless and other tools${NC}"
yarn run install-workspaces

# Verify amicaenv tools are available
echo -e "${BLUE}🔧 Verifying local development tools...${NC}"

if [ -f "node_modules/.bin/expo" ]; then
    echo -e "${GREEN}   ✅ Expo CLI: $(yarn expo --version 2>/dev/null || echo 'installed')${NC}"
else
    echo -e "${YELLOW}   ⚠️  Expo CLI not found in local dependencies${NC}"
fi

if [ -f "node_modules/.bin/eas" ]; then
    echo -e "${GREEN}   ✅ EAS CLI: installed${NC}"
else
    echo -e "${YELLOW}   ⚠️  EAS CLI not found in local dependencies${NC}"
fi

if [ -f "node_modules/.bin/cdk" ]; then
    echo -e "${GREEN}   ✅ AWS CDK: installed${NC}"
else
    echo -e "${YELLOW}   ⚠️  AWS CDK not found in local dependencies${NC}"
fi

if [ -f "node_modules/.bin/serverless" ]; then
    echo -e "${GREEN}   ✅ Serverless Framework: installed${NC}"
else
    echo -e "${YELLOW}   ⚠️  Serverless Framework not found in local dependencies${NC}"
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ] && [ -f ".env.example" ]; then
    echo -e "${BLUE}⚙️  Creating .env.local from template...${NC}"
    cp .env.example .env.local
    echo -e "${YELLOW}   ⚠️  Please edit .env.local with your development values${NC}"
fi

echo -e "${GREEN}🎉 amicaenv activation complete!${NC}"
echo -e ""
echo -e "${BLUE}📋 Available commands:${NC}"
echo -e "   yarn env:status     - Check environment status"
echo -e "   yarn dev            - Start all development services"
echo -e "   yarn dev:mobile     - Start mobile app (Expo)"
echo -e "   yarn test           - Run all tests"
echo -e "   yarn lint           - Run linting"
echo -e "   yarn expo start     - Start Expo development server"
echo -e ""
echo -e "${YELLOW}💡 Tip: Run 'yarn env:status' to verify your environment anytime${NC}"

# Save activation state
echo "amicaenv_activated_at=$(date)" > .amicaenv-state