import express from "express";
import "dotenv/config";

// db importing
import connectToDb from "./Config/dbConnect.js";

const app = express();

app.use(express.json());

// db function call to connect

connectToDb();

const port = process.env.PORT_NUM;

app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});
