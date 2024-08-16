import express from "express"
import signupRouter from "./signup.js"
import signinRouter from "./signin.js"
import barangRouter from "./barang.js"
const router = express.Router()



router.use("/signup", signupRouter )
router.use("/signin", signinRouter)
router.use("/barang", barangRouter)

router.use("*",(req, res)=>{
    res.status(404).send("Not Found")
})

export default router