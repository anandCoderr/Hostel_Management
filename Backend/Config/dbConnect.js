import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("Mongo Db already Connected");
      return;
    }

    await mongoose.connect("mongodb://127.0.0.1:27017/HostelManagement");

    console.log("Db connection successful");
  } catch (err) {
    console.log(err.message || "Db Connection Error");
    process.exit(1);
  }
};

mongoose.connection.on("connected", () => {
  console.log("Db Connection Successful Event");
});

mongoose.connection.on("disconnected", () => {
  console.log("Db Connection Failure");
});

export default connectToDb;
