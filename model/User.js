const mongoose = require('mongoose');
const { Schema } = mongoose;

//create the schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  }, 
  roles: {
    "User": {
        type: String,
        default: "2001"
    },
    "Editor": String,
    "Admin": String
  },
  password: String,
  refreshToken: String, // String is shorthand for {type: String}   
});

//create the modal
const userModel = mongoose.model('User', userSchema); // Note the singular form of User & NOT Users. this will map onto a collection called users
module.exports = userModel;
