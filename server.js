const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const db = require("./config/keys").MONGODB_URI;
const port = require("./config/keys").PORT;
const itemsRoutes = require("./routes/api/items");

const app = express();

// BodyParser
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log(`[MongoDB]: Connection established`))
  .catch(err => console.log(err));

// Routes
app.use("/api/items", itemsRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`[Server]: Connection successful on port ${port}`)
);
