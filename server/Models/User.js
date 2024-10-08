const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
})

const UserModel = mongoose.model("users", UserSchema)  //here whatever the collection that has been created in the mongodb that collection name shuld be i.e., "users"

module.exports = UserModel;