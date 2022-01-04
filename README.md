# Personal Website

This is my personal website's repository! Hopefully you're here because you like my website.

## Stack

I built my website using Next.js and Tailwind CSS. I added Netlify CMS to provide easy edits to my site. The server's purpose is to authenticate me to access my CMS. I also set up Matomo Analytics for fun, to see where in the world people are looking at my website from!

## Branches

I have 5 important branches in this repository:

- `main` is my production branch. What you see on [samuelping.me](https://samuelping.me) is compiled from here.

- `dev` is my development branch. I add and test out features on this branch until I'm ready to deploy it to production.

- `cms` is my content branch. I can make edits to my website's content here (like projects, work, involvement, etc.) and then merge it into `dev`.

- `gh-pages` is my deployed website branch. After I push to `main`, my GitHub Actions pipeline automatically builds my website from the contents in `./client`, then pushes it to `gh-pages`.

- `server` is my deployed server branch. I host my server on Heroku, and whenever I push to `main`, my GitHub Actions pipeline automatically pushes the contents of `./server` into this branch for Heroku to deploy.
