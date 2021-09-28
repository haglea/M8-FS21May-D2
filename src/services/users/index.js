import express from "express"
import q2m from "query-to-mongo"
import UserModel from "./schema.js"
import { basicAuthMiddleware } from "../../auth/basic.js"

const usersRouter = express.Router()

usersRouter.get("/", basicAuthMiddleware, async (req, res, next) => {
   // basicAuthMiddleware is going also to modify req object and attach the "logged in" user to it --> req.user
  try {
    const query = q2m(req.query)

    console.log(query)

    const total = await UserModel.countDocuments(query.criteria)
    const users = await UserModel.find(query.criteria, query.options.fields)
      .limit(query.options.limit)
      .skip(query.options.skip)
      .sort(query.options.sort) // no matter how I write them, mongo is going to apply  ALWAYS sort skip limit in this order

    res.send({ links: query.links("/users", total), total, users, pageTotal: Math.ceil(total / query.options.limit) })
  } catch (error) {
    next(error)
  }
})

usersRouter.post("/", async (req, res, next) => {
  try {
    const newUser = new UserModel(req.body) // here happens validation of the req.body, if it's not ok mongoose will throw a "ValidationError"
    const { _id } = await newUser.save()

    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})



export default usersRouter