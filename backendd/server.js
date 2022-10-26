import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import Lang from "./langModel.js";
import Skill from './skillModel.js'

//app config
const app = express()
const port = 8000;

//middlewares
app.use(express.json())
app.use(cors())

//db config
const connection_url = 'mongodb+srv://admin:abcd1234@cluster0.zivz2w5.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_url).then(() => console.log("Connected!"))

//api endpoint

app.get('/lang', (req, res) => {
    Lang.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})
app.get('/skills', (req, res) => {
    Skill.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(data)
        }
    })
})

app.post('/new-lang', (req, res) => {
    let newlang = req.body;
    Lang.create(newlang, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})
app.post('/new-skill', (req, res) => {
    let newskill = req.body;
    Skill.create(newskill, (err, data) => {
        if(err) {
            res.status(500).send(err)
        }
        else {
            res.status(201).send(data)
        }
    })
})

//listen
app.listen(port, () => {console.log(`listening on localhost: ${port}`)})