module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var HotelSchema = require("./hotel.schema.server.js")();
    var HotelModel = mongoose.model("HotelModel", HotelSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        addHotel: addHotel,
        findHotelByUser: findHotelByUser

    };
    return api;
    

    function setModel(_model) {
        model = _model;
    }

    function addHotel (userId, hotel) {
        var deferred = Q.defer();
        hotel._user = userId;
        HotelModel
            .create(hotel, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

    function findHotelByUser (userId) {
        var deferred = Q.defer();
        HotelModel
            .find({"_user": userId}, function (err, hotels) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(hotels);
                }
            });
        return deferred.promise;
    }

};