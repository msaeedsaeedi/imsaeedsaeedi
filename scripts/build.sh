#!/bin/bash

# Cloudflare Pages Build Script
# This script determines which Angular configuration to use based on the CF_PAGES_BRANCH environment variable

echo "Starting build process..."
echo "Branch: $CF_PAGES_BRANCH"
echo "Commit: $CF_PAGES_COMMIT_SHA"

# Default to staging if no branch is specified
BRANCH=${CF_PAGES_BRANCH:-"staging"}

# Run lint check
echo "Running lint check..."
pnpm run lint
if [ $? -ne 0 ]; then
    echo "Lint check failed. Aborting build."
    exit 1
fi
echo "Lint check passed."

case $BRANCH in
    "master" | "main")
        echo "Building for PRODUCTION environment..."
        pnpm run build --configuration=production
        ;;
    "staging")
        echo "Building for STAGING environment..."
        pnpm run build --configuration=staging
        ;;
    *)
        echo "Building for PREVIEW environment (branch: $BRANCH)..."
        # For preview deployments, use staging configuration by default
        pnpm run build --configuration=staging
        ;;
esac

echo "Build completed successfully!"
