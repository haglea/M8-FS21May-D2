import mongoose from 'mongoose'

const {Schema, model} = mongoose

const CommentSchema = new Schema({
  comment: { type: String, required: true},
  rate: { type: Number, required: true}  
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
})

export default model("comment", CommentSchema) // bounded to the "comment" collection, if it is not there it is going to be created automatically