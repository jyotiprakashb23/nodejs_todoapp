import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backend_todo",
    })
    .then((e) => {
      console.log(`Database connected with ${e.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};
