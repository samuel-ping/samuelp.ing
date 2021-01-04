require("dotenv").config();
const express = require("express");
const tiny = require("tiny-json-http");

const app = express();

const github_client_id = process.env.GITHUB_OAUTH_CLIENT_ID;
const github_secret_key = process.env.GITHUB_OAUTH_SECRET_KEY;
const authURL = "https://github.com/login/oauth/authorize?client_id="
  .concat(github_client_id)
  .concat("&scope=repo,user");
const tokenURL = "https://github.com/login/oauth/access_token";

// if someone tries to views this
app.get("/", (req, res) => {
  res.send("Nothing to see here! *whistles*");
});

// Netlify CMS makes a request to /auth, so I redirect the user to GitHub login
app.get("/auth", (req, res) => {
  console.log("Redirecting to: ", authURL);
  res.redirect(authURL);
});

// after logging in, GitHub redirects to here
app.get("/callback", async (req, res) => {
  const data = {
    code: req.query.code,
    github_client_id,
    github_secret_key,
  };

  try {
    const { body } = await tiny.post({
      url: tokenURL,
      data,
      headers: {
        Accept: "application/json",
      },
    });

    const postMessageContent = {
      token: body.access_token,
      provider: "github",
    };

    const script = `
    <script>
        (function() {
            function receiveMessage(e) {
                console.log("receiveMessage %o", e);
        
                // send message to main window with the app
                window.opener.postMessage(
                    'authorization:github:success:${JSON.stringify(
                      postMessageContent
                    )}', 
                    e.origin
                );
            }

            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
        })()
    </script>`;

    return res.send(script);
  } catch (err) {
    console.log(err);
  }
});
