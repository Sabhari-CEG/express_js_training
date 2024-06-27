const express = require('express')
const router = express.Router()
const uuid = require('uuid')
const users = require('../user')

router.get('/get',(req,res) => {
    res.json(users)
})

router.get("/:id", (req,res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else{
        res.sendStatus(404)
    }
})

router.post("/add",(req,res) => {
    const newUser = {
        id : uuid.v4(),
        name : req.body.name,
        email : req.body.email
    }

    if (!newUser.name || !newUser.email){
        res.sendStatus(404)
    }
    users.push(newUser)
    res.json(users)
})

router.put("/update/:id",(req,res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found){
        users.forEach( user => {
            if (user.id === parseInt(req.params.id)){
                user.name = req.body.name ? req.body.name : user.name,
                user.email = req.body.email ? req.body.email : user.email
            
            res.json({
                "msg" : "Updated",
                "data" : user
            })
        }
        }
        )
    } else{
        res.statusCode(404)
    }
})

router.post("/delete/:id", (req,res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found){
        const result = users.filter(user => user.id !== parseInt(req.params.id))
        res.json({
            "msg" : "deleted",
            "data" : result
        })
    }
    else{
        res.sendStatus(404)
    }
})

module.exports = router