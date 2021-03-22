const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  nombre: { type: String, default: "Usuaario" },
  role: {
    type: String,
    default: "cliente",
    enum: ["cliente", "desarrollador"],
  },
});

module.exports = mongoose.model("Usuario", UserSchema);
