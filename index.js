import express, { Router } from "express"
import dotenv from "dotenv"
import cors from "cors"
import router from "./src/routes/index.js"
import { testConnection } from "./src/database/connection.js"
dotenv.config()

const app = express()
app.use(cors())

import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"

app.get("/",(req, res)=>{
    res.send("Server berjalan lancar")
})

import path from "path"
import url from 'url'
const __dirname = path.dirname(url.fileURLToPath(import.meta.url))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

app.use(express.static("public"))
app.use(
    session({
        secret:"secret key",
        resave:false,
        saveUninitialized:false
    })
)
testConnection()
app.use(router)
const port = 3000
app.listen(port,()=>{
    console.log(`Server Berjalan di ${process.env.SERVER}:${port}`)
})
