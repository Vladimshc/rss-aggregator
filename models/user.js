var mongoose = require('mongoose');

module.exports = mongoose.model('User',{

    id: String,
    username: String,
    password: String,
    email: String,
    userChannel: [{
        url: String,
        title: String
    }],
    forTest: String
});