import express from "express"
import { signin } from "../controllers/signinController.js"


const signinRouter = express.Router()

signinRouter
.route("/")
.post(signin)

export default signinRouter