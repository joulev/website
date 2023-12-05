#!/bin/bash

mkdir -p ./.fonts
cd ./.fonts

# iA Writer Mono
mkdir -p ia-writer-mono
cd ia-writer-mono
declare -a types=("Bold" "BoldItalic" "Italic" "Regular")
for type in "${types[@]}"; do
  lowercase=$(echo "$type" | tr '[:upper:]' '[:lower:]')
  echo -n "Downloading iAWriterMonoS-${type}.woff2..."
  curl -L "https://github.com/iaolo/iA-Fonts/raw/master/iA%20Writer%20Mono/Webfonts/iAWriterMonoS-${type}.woff2" -o "${lowercase}.woff2" -s
  echo " done"
done
cd ..
