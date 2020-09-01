require("dotenv").config();

import express, { json, static } from "express";
import { connect } from "mongoose";
import cors from "cors";

import userRouter from "./routes/userRouter";
import noteRouter from "./routes/noteRouter";
import { join } from "path";

const app = express();
app.use(json());
app.use(cors());

//Routes
app.use("/users", userRouter);
app.use("/api/notes", noteRouter);

//connect to mongoDB
const db_url = process.env.MONGO_URL;
connect(
  db_url,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to mongoDB ..");
  }
);

// if production use express static
if (process.env.NODE_ENV === "production") {
  app.use(static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(join(__dirname, "client", "build", "index.html"));
  });
}

//Listen Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running at port", PORT);
});
