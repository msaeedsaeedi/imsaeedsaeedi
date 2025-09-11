#!/bin/bash

# Cloudflare Pages Build Script
# This script determines which Angular configuration to use based on the CF_PAGES_BRANCH environment variable

echo "🚀 Starting build process..."
echo "Branch: $CF_PAGES_BRANCH"
echo "Commit: $CF_PAGES_COMMIT_SHA"

# Default to staging if no branch is specified
BRANCH=${CF_PAGES_BRANCH:-"staging"}

case $BRANCH in
    "master" | "main")
        echo "🏭 Building for PRODUCTION environment..."
        npm run build -- --configuration=production
        ;;
    "staging")
        echo "🧪 Building for STAGING environment..."
        npm run build -- --configuration=staging
        ;;
    *)
        echo "🌟 Building for PREVIEW environment (branch: $BRANCH)..."
        # For preview deployments, use staging configuration by default
        npm run build -- --configuration=staging
        ;;
esac

echo "✅ Build completed successfully!"
