import mongoose from 'mongoose'

const {Schema, model} = mongoose

const BlogPostSchema = new Schema({
  category: { type: String, required: true},
  title: { type: String, required: true},
  cover: { type: String, required: true},
  readTime: {
      value: { type: Number, min: 1, max: 65, required: true },
      unit: { type: String, required: true }
  },
  content: { type: String, required: true },
  comments: [{
      comment: String,
      rate: Number
  }], 
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  authors: [{ type: Schema.Types.ObjectId, ref: "Author" }]
}, { 
  timestamps: true // adds createdAt and updatedAt automatically
})

export default model("blogPost", BlogPostSchema) // bounded to the "blogPost" collection, if it is not there it is going to be created automatically