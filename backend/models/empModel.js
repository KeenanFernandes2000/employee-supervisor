import mongoose from "mongoose";

const empSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: false,
    default: "employee",
  },
  supervisor: {
    type: String,
    required: false,
  },
});

export const Emp = mongoose.model("Employee", empSchema);
