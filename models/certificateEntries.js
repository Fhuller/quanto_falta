const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let certificateEntrieSchema = new Schema({
  name: { type: String, required: true, min: 6, max: 255 },
  description: { type: String, required: true, min: 6, max: 255 },
  file: { type: String, required: true, min: 6, max: 255 },
  date: { type: Date, default: Date.Now },
  validated: { type: Boolean, default: false }
});

module.exports = mongoose.model("certificateEntrie", certificateEntrieSchema);
