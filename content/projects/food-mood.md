---
title: Food Mood
short-description: Web app that takes your photo, detects your visible mood, and
  suggests a restaurant based off that mood!
thumbnail: assets/food-mood-thumbnail-raw.jpg
blur-rgb: 47,61,77
start-date: March 2020
end-date: August 2020
repo-url: https://github.com/samuel-ping/food-mood
technologies: React.js, Express.js, Node.js, AWS (Lambda, Amplify, EC2,
  CodeDeploy+CodePipeline, S3), Nginx
---

## Summary

Food Mood is a web app that takes your photo, detects your visible mood, and suggests a restaurant based off of that mood!

The frontend is written in React.js, while the backend uses Express.js and Node.js. The backend is a Lambda function hosted on AWS Lambda, which makes a call to Yelp's Fusion API and Amazon's Rekognition API.

**v3**: My current and most likely final iteration of Food Mood is v3. I completely revamped the way the website looks, making it more visually appealing. I also switched over from hosting on AWS EC2 to AWS Amplify to see what Amplify is like.

## Previous Versions

**v2**: The frontend is built with React.js, while the backend uses Express.js and Node.js. The emotions are detected from the photo using Amazon's Rekognition API, and then I search for a restaurant using Yelp's Fusion API. The website is deployed on an AWS EC2 instance, using Nginx as a reverse proxy. Updates to the application are automatically deployed with AWS CodePipeline and CodeDeploy.

**v1**: The [original Food Mood](https://oldmyfoodmood.herokuapp.com/) was my first ever website, and I built it as an entry to Capital One's Software Engineering Summit challenge. I originally was going to use solely HTML, CSS, and JavaScript, but I quickly learned that I had no way of hiding my API keys from the client. After much frustration, I found Node.js and Express.js and decided to hail mary it and learn how to create a backend. I'm really proud of this project, because I decided to pursue this project at the last minute and had less than two days to complete it. After the competition ended (I was accepted into the summit!), I decided to continue working on this project. I revamped the whole website with React and deployed it on an AWS EC2 Ubuntu instance to avoid the yucky slow loading times of Heroku.
