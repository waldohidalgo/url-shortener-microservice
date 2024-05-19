import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    default: Date.now,
  },
});
const URLModel = mongoose.model("Url", UrlSchema);
export default URLModel;
