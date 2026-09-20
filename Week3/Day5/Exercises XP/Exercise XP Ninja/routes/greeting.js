const express = require("express");

const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

router.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Emoji Greeting App</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          input, select, button {
            padding: 10px;
            margin: 10px;
            font-size: 16px;
          }

          button {
            cursor: pointer;
          }
        </style>
      </head>

      <body>
        <div class="container">
          <h1>Emoji Greeting App 👋</h1>

          <form action="/greet" method="POST">

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
            />

            <select name="emoji">
              ${emojis
                .map((emoji) => `<option value="${emoji}">${emoji}</option>`)
                .join("")}
            </select>

            <br>

            <button type="submit">Greet Me</button>

          </form>
        </div>
      </body>
    </html>
  `);
});

router.post("/greet", (req, res) => {
  const { name, emoji } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).send(`
      <h1>Name is required!</h1>
      <a href="/">Go Back</a>
    `);
  }

  if (!emojis.includes(emoji)) {
    return res.status(400).send("Invalid emoji");
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Greeting</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }

          .greeting {
            background: white;
            padding: 50px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          }

          .emoji {
            font-size: 70px;
          }

          a {
            text-decoration: none;
          }
        </style>
      </head>

      <body>
        <div class="greeting">

          <div class="emoji">${emoji}</div>

          <h1>Hello, ${name}!</h1>

          <p>Welcome to the Emoji Greeting App!</p>

          <a href="/">Go Back</a>

        </div>
      </body>
    </html>
  `);
});

module.exports = router;