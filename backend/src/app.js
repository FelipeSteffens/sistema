import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import usuarios from "./routers/usuarios.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api", usuarios)

export default app