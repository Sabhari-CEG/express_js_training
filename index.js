var express = require('express')
var app = express()
var jwt = require('jsonwebtoken')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')

app.use(express.json())

    
app.use(express.urlencoded({extended: false}))
app.use(bodyparser.urlencoded({extended : false}))
app.use(bodyparser.json())
const userAPI = require("./routes/users")
app.use("/users",userAPI)
app.use("/movies",require("./routes/movies"))
// app.use('/sql', require('./routes/sql'))
app.set('views', path.join(__dirname,"/views/"))
app.engine("hbs", exphbs({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: "hbs",
    defaultLayout: "MainLayout",
    layoutsDir: "/views/layouts",
}))

app.set("view engine", "hbs")

// try{
//     app.use(userAPI)
// } catch {
//     console.log("Error because of this")
// }

app.post('/protected',verifyToken, (req,res) => {
    jwt.verify(req.token, "secretkey", (err,authData) => {
        if (err){
            res.sendStatus(403)
        } else{
            res.json({
                "message" : "checked for jwt authentication and it worked!",
                authData
            })
        }
    })


    
})
app.post("/login", (req,res) => {
    const user = {
        id : 1,
        name : "sabhari",
        email : "sabhari@email.com"
    }
    jwt.sign({user : user}, "secretkey", (err,token) => {
        res.json({token,})
    })
})

function verifyToken(req,res,next) {
const bearerHeader = req.headers['authorization']
if (typeof bearerHeader !== "undefined"){
    const bearerToken = bearerHeader.split(' ')[1]
    req.token = bearerToken
    next()
} else{
    res.sendStatus(403)
}
}


var server = app.listen(8080, () => {
    console.log("Server started!!")
})