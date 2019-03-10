const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const config = require("config");

const db = config.get("MONGODB_URI");

const app = express();

// BodyParser
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log(`[MongoDB]: Connection established`))
  .catch(err => console.log(err));

// Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`[Server]: Connection successful on port ${port}`)
);
