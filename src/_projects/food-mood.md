---
layout: projects
title: "Food Mood v3"
thumbnail: "images/food-mood-thumbnail.jpg"
timeframe: "March 2020 - August 2020"
technologies: "React.js, Express.js, Node.js, Nginx, AWS EC2, CodePipeline & CodeDeploy, S3, Amplify"
---

A web app that takes your photo, detects your visible mood, and suggests a restaurant based off of that mood!

v3 (current): The frontend is built with React.js, which makes a request to my AWS Lambda function. My Lambda function

v2: The frontend was built with React.js, while the backend used Express.js and Node.js. The website was deployed on an AWS EC2 instance, using Nginx as a reverse proxy. Updates to the application were automatically deployed using AWS CodePipeline and CodeDeploy.

v1: The <a href='https://oldmyfoodmood.herokuapp.com' target='_blank' rel='noopener noreferrer'>original Food Mood</a> was my first ever website, and I built it as an entry to Capital One's Software Engineering Summit challenge. I originally was going to use solely HTML, CSS, and JavaScript, but I quickly learned that I had no way of hiding my API keys from the client. After much frustration, I found Node.js and Express.js and decided to hail mary it and learn how to create a backend. I'm really proud of this project, because I decided to pursue this project at the last minute and had less than two days to complete it. After the competition ended (I was accepted into the summit!), I decided to continue working on this project. I revamped the whole website with React and deployed it on an AWS EC2 Ubuntu instance to avoid the yucky slow loading times of Heroku.
