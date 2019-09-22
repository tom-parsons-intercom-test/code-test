import express from "express"
import bodyParser from "body-parser"
import routes from "./handlers/rest"

const app = express()

const {PORT = 5000} = process.env

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)

app.listen(PORT, () => {
  console.log(`server started at http://localhost: ${PORT}`)
})
