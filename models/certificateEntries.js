const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let certificateEntrieSchema = new Schema({
  name: { type: String, required: true, max: 255 },
  description: { type: String, required: true, max: 255 },
  file: { type: String, required: true, max: 255 },
  date: { type: Date, default: Date.Now },
  email: { type: String, required: true, max: 255 },
  validated: { type: Boolean, default: false }
});

module.exports = mongoose.model("certificateEntrie", certificateEntrieSchema);
