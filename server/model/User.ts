
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "patient",
      required: true,
    },
    firstTimeLogin: {
      type: Boolean,
      default: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
