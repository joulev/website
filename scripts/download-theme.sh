#!/bin/bash

mkdir -p ./.theme
cd ./.theme

echo -n "Downloading theme file..."
curl -L "https://l.joulev.dev/theme" -o "theme.json" -s
echo " done"
cd ..
