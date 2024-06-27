const express = require('express')
const router = express.Router()
let movies = require("../movies")
const uuid = require('uuid')

router.get("/",(req,res) => {
    res.json(movies)
})

router.post("/add",(req,res) => {
    const movie = req.body.movie
    const direc = req.body.director
    const date = req.body.release

    if (!movie || !direc || !date){
        res.statusCode(404)
    }

    new_movie = {
        id : uuid.v4(),
        name : movie,
        director: direc,
        date_of_release : date

    }
    movies.push(new_movie)
    res.json({
        "message" : "Record added!",
        "added_data" : new_movie,
        "all_data" : movies
    })
})

router.post("/find",(req,res) => {
    const query = req.body

    const key = Object.keys(query)

    if (key.length !== 1){
        res.status(404).send("Too many query params")
    }

    else if (key[0] === "movie"){
        const movie_name = query.movie
        res.json(movies.filter(movie => movie.name === movie_name))
    }

    else if (key[0] === "director"){
        
        const director_name = query.director
        res.json(movies.filter(movie => movie.director === director_name))
    }
})

router.post("/delete/:id",(req,res) => {
    const id = parseInt(req.params.id)

    const found = movies.filter(movie => movie.id === id)

    if (!found){
        res.status(404).send("Id not found")
    }

    else if(found) {
        movies = movies.filter(movie => (movie.id !== id))
        res.json({
            "message" : "record deleted",
            "data" : movies
        })
    }
})

module.exports = router