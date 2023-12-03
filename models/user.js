const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, required: true, max: 255 },
  email: { type: String, required: true, max: 255 },
  pwd: { type: String, required: true, max: 255 },
  nameCurso: { type: String, required: true, max: 255 },
  cargaHoraria: {type: Number, required: true}, 
  admin: {type: Boolean, default: false},
  date: { type: Date, default: Date.Now },
});

module.exports = mongoose.model("user", userSchema);
