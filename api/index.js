import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./router/router.js";
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("public"));

app.use("/", router);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

export default app;
