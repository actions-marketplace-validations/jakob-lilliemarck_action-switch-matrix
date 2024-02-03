#!/usr/bin/env bash

set -e

if [ ! $# -eq 2 ]; then
  echo "Incorrect amount of arguments"
  return 1
fi

# 1 TAG
# 2 MESSAGE
ncc build src/index.ts
git add .
# git push --delete origin v2
# git tag -d v2
git commit -m "$2"
git tag -a v2 -m "$2"
git push --follow-tags
