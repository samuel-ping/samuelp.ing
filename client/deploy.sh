#!/bin/bash
npm run export
git add out
git commit -m "deploy to gh-pages"
cd ..
git subtree push --prefix client/out origin gh-pages
cd client