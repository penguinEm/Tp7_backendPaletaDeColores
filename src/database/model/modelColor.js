import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema({
  nombreColor: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },
});

const Color = mongoose.model("color", colorSchema);
export default Color;
