#!/usr/bin/env bash

is_dir() {
  [[ -d $1 ]]
}

for r in *; do
  if is_dir "$r"; then
    cd "$r"
    git gc --prune --aggressive
    cd ..
  fi
done
