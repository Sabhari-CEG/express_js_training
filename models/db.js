const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/StudentDB',{
    useNewUrlParser : true
},
err => {
    if(!err){
        console.log("connection success");
    } else {
        console.log("Error in connection ", err);
    }
    
})

require('./student.model')