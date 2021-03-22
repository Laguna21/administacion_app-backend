const mongoose = require("mongoose");
const { Schema } = mongoose;

const ItemSchema = new Schema({
  admin_id: { type: String, required: true },
  concepto: { type: String, required: true },
  monto: { type: Number, required: true },
  fecha: { type: Date },
  tipo: { type: String },
});

module.exports = mongoose.model("Item", ItemSchema);
