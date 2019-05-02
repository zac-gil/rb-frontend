#!/bin/bash

echo "Please enter a commit message: "
read msg
npm run build
git add .
git commit -m $msg
git push