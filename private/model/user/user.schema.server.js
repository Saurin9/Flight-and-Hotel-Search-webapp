module.exports = function() {
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        passwordRecoveryQuestion: String,
        passwordRecoveryAnswer: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        userType: {
            type: String,
            enum: ['USER', 'AGENT', 'ADMIN', 'HOTELOWNER'],
            default: 'USER'
        },
        organization : String,
        messages: [{type: mongoose.Schema.Types.ObjectId, ref:'MessageModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "userDatabase"});

    return UserSchema;

};