const messages = [
  {
    text: "Hi there",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello world",
    user: "Charles",
    added: new Date(),
  },
];

const express = require("express");

const app = express();

const router = express();

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/form", router);

app
  .get("/message/:messageId", (req, res) => {
    const messageId = req.params.messageId;
    const text = messages[messageId].text;
    const user = messages[messageId].user;
    const added = messages[messageId].added;

    res.render("message", {
      title: "Message Details",
      text: text,
      user: user,
      added: added,
    });
  })

  .get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages: messages });
  })
  .get("/new", (req, res) => {
    res.render("form", { title: "Mini Messageboard", messages: messages });
  })

  .post("/new", (req, res) => {
    const formAuthorName = req.body.authorname;
    const formMessage = req.body.message;

    messages.push({
      text: formMessage,
      user: formAuthorName,
      added: new Date(),
    });
    res.redirect("/");
  })
  .listen(8080);
