module.exports = function() {
    var mongoose = require("mongoose");

    var HotelSchema = mongoose.Schema({
        _user : {type: mongoose.Schema.Types.ObjectId, ref:'UserModel'},
        property_name: String,
        addressline1: String,
        city: String,
        region: String,
        postal_code: String,
        total_price: String,
        phone: String,
        fax : String,
        amenities: String,
        available_from: String,
        available_till: String,
        dateCreated: {type: Date, default: Date.now}

    }, {collection: "hotelDatabase"});

    return HotelSchema;

};