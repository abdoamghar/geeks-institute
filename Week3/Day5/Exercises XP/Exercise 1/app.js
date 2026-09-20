import express from "express"
import index_routes from "./routes/index.js"

const app = express()
app.use(express.json())

app.use("/", index_routes)

app.listen(3000, () => {
    console.log("server working successfully")
})