import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  googleId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  name: { type: String, required:  true },
  followers: { type: [String], default: [] },
  following: { type: [String], default: [] }
});

export default mongoose.model("User", userSchema);