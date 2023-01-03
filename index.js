const express = require("express");
const app = express();
require("dotenv").config();

const connection = require("./db");
const passwordReset = require("./routes/passwordReset");
const users = require("./routes/users");

connection();
app.use(express.json());

app.use("/sample/users", users);
app.use("/sample/password-reset", passwordReset);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port:${port}....`);
});
