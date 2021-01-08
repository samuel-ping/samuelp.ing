const express = require("express");
const tiny = require("tiny-json-http");

const app = express();

const githubClientId = process.env.GITHUB_OAUTH_CLIENT_ID;
const githubSecretKey = process.env.GITHUB_OAUTH_SECRET_KEY;

// building OAuth URL
var oauthURL = new URL("https://github.com/login/oauth/authorize");
oauthURL.searchParams.append("client_id", githubClientId);
oauthURL.searchParams.append("scope", "repo,user");
oauthURL.searchParams.append("allow_signup", false);

const tokenURL = "https://github.com/login/oauth/access_token";

// if someone tries to views this, redirect them to my website
app.get("/", (req, res) => {
  res.redirect("https://samuelping.me");
});

// Netlify CMS makes a request to /auth, so I redirect the user to GitHub login
app.get("/auth", (req, res) => res.redirect(oauthURL));

// after logging in, GitHub redirects to here
app.get("/callback", async (req, res) => {
  const data = {
    code: req.query.code,
    client_id: githubClientId,
    client_secret: githubSecretKey,
  };

  try {
    const { body } = await tiny.post({
      url: tokenURL,
      data,
      headers: {
        Accept: "application/json",
      },
    });

    const postContent = {
      token: body.access_token,
      provider: "github",
    };

    const script = `<script>
                      (function() {
                          function receiveMessage(e) {
                            console.log("receiveMessage %o", e);
                        
                            // send message to main window with the app
                            window.opener.postMessage(
                              'authorization:github:success:${JSON.stringify(
                                postContent
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

app.listen(process.env.PORT);
