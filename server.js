const express = require("express");
const router = require("./router/router");
const cookieParser = require("cookie-parser");
const DBconnection = require("./config/DBconnection");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 4000;
app.use(cookieParser()); 
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CLINT_URL }));
app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api/v1", router);

DBconnection();

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
