import mongoose from 'mongoose'
import bcrypt from "bcrypt"

const {Schema, model} = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },  
  email: { type: String, required: true}  
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
})

UserSchema.pre("save", async function (next) {
  // used not only on creation but also when user document is being modified (PUT)
  // BEFORE saving the user in db, hash the password
  const newUser = this
  const plainPW = newUser.password

  if (newUser.isModified("password")) {
    // only if user is modifying the password we are going to "waste" CPU cycles in running hash function
    newUser.password = await bcrypt.hash(plainPW, 10)
  }
  next()
})

UserSchema.methods.toJSON = function () {
  // toJSON is called every time express does a res.send of the documents, this is not going to affect the db

  const userDocument = this

  const userObject = userDocument.toObject()

  delete userObject.password
  delete userObject.__v

  return userObject
}

UserSchema.statics.checkCredentials = async function (email, plainPW) {
  // This function is going to receive email and pw

  // 1. Find the user by email

  const user = await this.findOne({ email }) // "this" represents the model

  if (user) {
    // 2. If the user is found we are going to compare plainPW with the hashed one
    const isMatch = await bcrypt.compare(plainPW, user.password)

    // 3. Return a meaningful response

    if (isMatch) return user
    else return null
  } else {
    return null
  }
}

export default model("user", UserSchema) // bounded to the "comment" collection, if it is not there it is going to be created automatically