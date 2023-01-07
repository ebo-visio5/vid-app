const express = require('express')
const morgan = require('morgan');
require('dotenv').config({path: './.env'})
const {movies,genresRouter} = require('./routes')

const port = process.env.PORT || 3000
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms - :remote-user :date"))

app.use('/api/movies', movies)
app.use('/api/genres', genresRouter)



app.use('*', (req, res) => {
    res.status(404).send(`You typed an invalid url`)
})
app.listen(port, ()=>{
    console.info('listening on port ', port)
})