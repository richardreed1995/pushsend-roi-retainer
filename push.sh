#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print section header
print_header() {
    echo -e "\n${YELLOW}=== $1 ===${NC}\n"
}

# Add all changes
print_header "Adding changes to Git"
git add .

# Commit changes with timestamp
print_header "Committing changes"
git commit -m "Update $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
print_header "Pushing to GitHub"
git push origin main

# Deploy to Vercel
print_header "Deploying to Vercel"
vercel --prod

print_header "Done!"
echo -e "${GREEN}Changes have been pushed to GitHub and deployed to Vercel${NC}" 