# Personal Website

This is my personal website's repository! Hopefully you're here because you like my website.

## Stack

I built my website using Next.js and Tailwind CSS. 

## Branches

I have four important branches in this repository:

- `main` is my production branch. What you see on [samuel-ping.github.io](samuel-ping.github.io) is built from here.

- `dev` is my development branch. I add and test out features on this branch until I'm ready to deploy it to production.

- `cms` is my content branch. I can make edits to my website's content here (like projects, work, involvement, etc.) and then merge it into `dev`.

- `server` is my deployed server branch. I host my server on Heroku, and whenever I push to `main`, my GitHub Actions pipeline automatically pushes the contents of `./server` into this branch for Heroku to deploy.

## Past Stuff
### Netlify CMS
I originally added Netlify CMS to simplify content creation on my site. I hosted a server on Heroku to authenticate me to access my CMS. Unfortunately Heroku/Salesforce terminated their free hosting plan so I got rid of it.

### Matomo Analytics
In the past, I had also set up Matomo Analytics for fun, to see where in the world people are looking at my website from! But my server was secretly hosted on an anonymous AWS employee's account and sadly they don't work there anymore.