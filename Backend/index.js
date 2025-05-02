import express from "express";
import "dotenv/config";

// db importing
import connectToDb from "./Config/dbConnect.js";

// importing all possible routes
import userRoute from "./Routes/UserRoutes.js";
import adminRoute from "./Routes/AdminRoutes.js";

const app = express();

// db function call to connect
connectToDb();

// ------  urlencoded() middleware
app.use(express.urlencoded({ extended: true }));

// ---------json conversion
app.use(express.json());

// -------------------------using routes middleware

app.use("/user", userRoute);

app.use("/admin", adminRoute);

const port = process.env.PORT_NUM;

app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});
