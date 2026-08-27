import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
  avatar: {
    type: {
      url: String,
      localPath: String,
    },
    default: {
      url: `https://placehold.co/200x200`,
      localPath: "",
    },
  },
})

export const User = mongoose.model("User", userSchema)
