import mongoose from 'mongoose'

const {Schema, model} = mongoose

const AuthorSchema = new Schema({
  name: { type: String, required: true },  
  avatar: { type: String, required: true}  
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
})

export default model("author", AuthorSchema) // bounded to the "comment" collection, if it is not there it is going to be created automatically