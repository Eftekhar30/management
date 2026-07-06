const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const admin = require('./routes/admin')
require('dotenv').config()

const indexRouter= require('./routes/index')
const authRouter = require('./routes/auth')
const dashboardRouter = require('./routes/dashboard')

const app = express()

connectDB()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://management-frontend-five.vercel.app",
    "https://management-frontend-git-main-g3nix.vercel.app",
    "https://management-frontend-omxly2br6-g3nix.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))
app.use(express.json())

app.use('/api', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/admin', admin)

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart_management"
app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})