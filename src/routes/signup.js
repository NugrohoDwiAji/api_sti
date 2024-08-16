import express from "express"
import { signup } from "../controllers/signupController.js"
import { getBarangByid } from "../controllers/barangController.js"


const signupRouter = express.Router()

signupRouter
.route("/")
.post(signup)
signupRouter
.route("/:id")
.get(getBarangByid)

export default signupRouter