#!/usr/bin/env bash

set -e

if [ ! $# -eq 2 ]; then
  echo "Incorrect amount of arguments"
  return 1
fi

# 1 TAG
# 2 MESSAGE
ncc build src/index.ts --license licenses.txt
git add .
git push --delete origin $1
git tag -d $1
git commit -m "$2"
git tag -a "$1" -m "$2"
git push --follow-tags
