import express from "express"
import q2m from "query-to-mongo"

import AuthorModel from "./schema.js"

const authorsRouter = express.Router()

authorsRouter.get("/", async (req, res, next) => {
  try {
    const query = q2m(req.query)

    console.log(query)

    const total = await AuthorModel.countDocuments(query.criteria)
    const authors = await AuthorModel.find(query.criteria, query.options.fields)
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort) // no matter how I write them, mongo is going to apply  ALWAYS sort skip limit in this order

    res.send({ links: query.links("/authors", total), total, authors, pageTotal: Math.ceil(total / query.options.limit) })
  } catch (error) {
    next(error)
  }
})

authorsRouter.post("/", async (req, res, next) => {
  try {
    const newAuthor = new AuthorModel(req.body) // here happens validation of the req.body, if it's not ok mongoose will throw a "ValidationError"
    const { _id } = await newAuthor.save()

    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

export default authorsRouter