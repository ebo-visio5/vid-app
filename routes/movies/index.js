const express = require('express')
const Joi = require('joi')
const { getById, getIndexById } = require('../../functions')
const { genres, movies, customers } = require('../../database')

const moviesRouter = express.Router()

moviesRouter.get('/', (req, res) => {
    if (!movies) return res.status(404).send('no movie available')
    res.status(200).send(movies)
})

moviesRouter.get('/:id', (req, res) => {
    const movie = getById(movies, req.params.id)
    if (!movie) return res.status(404).send('movie not found')
    res.status(200).json({ movie })
})

moviesRouter.post('/', (req, res) => {
    const result = validateSchema(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return
    }
    const genre = genres.find(genre => genre.name.toLowerCase() === req.body.genre.toLowerCase());
    if (!genre) return res.status(404).send('genre not found');
    const newMovie = req.body
    newMovie.id = movies.length + 1
    movies.push(newMovie)
    genre.availableMovies += 1 //incrementing the movie to the genre
    res.status(200).json({ newMovie })

})

moviesRouter.put('/:movieId/:adminId', (req, res) => {
    if (req.params.adminId !== "1") return res.status(401).send('unauthorized user');
    const movie = getById(movies, req.params.movieId)
    const movieIndex = getIndexById(movies, req.params.movieId)
    if (!movie) return res.status(404).send('movie not found');

    const result = validateSchema(req.body)
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return
    }
    const updatedMovie = req.body
    // some values can't be changed
    updatedMovie.id = movie.id
    updatedMovie.genre = movie.genre
    updatedMovie.availableQuantity = movie.availableQuantity

    movies.splice(movieIndex, 1, updatedMovie)
    res.status(200).json({ updatedMovie })
})

moviesRouter.delete('/:movieId/:adminId', (req, res) => {
    if (req.params.adminId !== "1") return res.status(401).send('unauthorized user');

    const movie = getById(movies, req.params.movieId)
    const movieIndex = getIndexById(movies, req.params.movieId)
    if (!movie) return res.status(404).send('movie not found');

    const genre = movies.find(m => m.genre === movie.genre) //finding the genre to update the availableMovies  
    movies.splice(movieIndex, 1)
    genre.availableQuantity -= 1 //reducing the number of available quantity for the genre
    res.status(200).send('delete successful')
})


function validateSchema(req) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(24).required(),
        genre:Joi.string().min(3).max(24).required(), 
        producer: Joi.string().min(3).max(24).required(),
        actors: Joi.array().items(Joi.string()).required(),
        releasedYear: Joi.date().required(),
        availableQuantity: Joi.number().required()
    }).validate(req);
    return schema
}
module.exports = moviesRouter