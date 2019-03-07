const express = require("express");
const mongoose = require("mongoose");

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

app.listen(port, () =>
  console.log(`[Server]: Connection successful on port ${port}`)
);
