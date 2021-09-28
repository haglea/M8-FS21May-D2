// ----------------------------- comments CRUD ---------------------

import express from 'express'
import q2m from 'query-to-mongo'
import CommentModel from './schema.js'

const commentsRouter = express.Router()

commentsRouter.get("/", async(req,res,next) => {
  try {
    const query = q2m(req.query)

    console.log(query)

    const total = await CommentModel.countDocuments(query.criteria)
    const comments = await CommentModel.find(query.criteria, query.options.fields).limit(query.options.limit).skip(query.options.skip).sort(query.options.sort) // no matter how I write them, mongo is going to apply  ALWAYS sort skip limit in this order

    res.send({links: query.links("/comments", total),total, comments, pageTotal: Math.ceil(total/query.options.limit)})
  } catch (error) {
    next(error)
  }
})

export default commentsRouter