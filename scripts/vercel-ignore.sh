#!/bin/bash

# Vercel Ignore Build Step
# Exit code 1 = Build proceeds
# Exit code 0 = Build is canceled

echo "Checking build constraints for Vercel deployment..."
echo "Commit Author: $VERCEL_GIT_COMMIT_AUTHOR_LOGIN"
echo "Commit Message: $VERCEL_GIT_COMMIT_MESSAGE"

if [[ "$VERCEL_GIT_COMMIT_AUTHOR_LOGIN" == "brittytino" ]]; then
  # Check if the commit message indicates a PR merge
  if [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"Merge pull request"* ]] || [[ "$VERCEL_GIT_COMMIT_MESSAGE" == *"Merge branch"* ]]; then
    echo "🚫 Commit is a PR Merge by brittytino. Skipping immediate build (will deploy at midnight)."
    exit 0
  else
    echo "✅ Direct push by brittytino. Proceeding with build..."
    exit 1
  fi
else
  echo "🚫 Commit by $VERCEL_GIT_COMMIT_AUTHOR_LOGIN (or automated bot). Skipping immediate build (will deploy at midnight)."
  exit 0
fi
