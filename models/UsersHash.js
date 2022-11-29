const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UsersHash = new Schema({
login:{
    type:String
},
hash:{
    type:String
},
session:{
    type:String
}
})
module.exports = mongoose.model('user-hash',UsersHash)