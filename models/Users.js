const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
    id:{
        type: String
    },
    firstName:{
        type: String
    },
    lastName:{
        type:String
    },
    login:{
        type: String
    },
    pass: {
        type: String
    },
    city:{
        type:String
    },
    aboutMe:{type:String},
    date:{
        hours:{
            type:Number
        },
        minutes:{ 
            type:Number
        },
        seconds:{
            type: Number
        }
    },
    follow:{
        type:Boolean
    }
})

module.exports = mongoose.model('Users', Users)