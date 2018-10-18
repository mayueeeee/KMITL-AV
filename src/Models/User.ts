import { Document, Schema, Model, model } from "mongoose"

const userSchema = new Schema({
  username: String,
  password: String,
  fullname: String,
  role: String
  
})

// export default model("User", userSchema)
export const User = model("User", userSchema)