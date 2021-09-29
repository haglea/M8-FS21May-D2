import express from "express"
import AuthorModel from "./schema.js"
import BlogModel from "../blogPosts/schema.js";
import { basicAuthMiddleware } from "../../auth/basic.js"
import { adminMiddleware } from "../../auth/admin.js"

const authorsRouter = express.Router()

authorsRouter.post("/register", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body)
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })
  } catch (error) {
    next(error)
    console.log(error)
  }
})

authorsRouter.get("/", adminMiddleware, async (req, res, next) => {
  try {
    const authors = await AuthorModel.find()
    res.send(authors)
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/:authorId", basicAuthMiddleware, adminMiddleware, async (req, res, next) => {
  try {
    //console.log(req.author.role)
    const author = await AuthorModel.findById(req.params.authorId)
    res.send(author)
  } catch (error) {
    next(error)
  }
})

authorsRouter.get("/me/stories", basicAuthMiddleware, async (req, res, next) => {
  try {
    
    const posts = await BlogModel.find({ authors: req.author._id })
    console.log(req.author._id)
    res.status(200).send(posts)

  } catch (error) {
    next(error)
  }
})

export default authorsRouter