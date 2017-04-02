module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var HotelSchema = require("./hotel.schema.server.js")();
    var HotelModel = mongoose.model("HotelModel", HotelSchema);

    var Q = require("q");

    var api = {
        setModel: setModel,
        addHotel: addHotel,
        findHotelByUser: findHotelByUser,
        updateHotelAvailability: updateHotelAvailability,
        deleteHotel: deleteHotel,
        findHotels: findHotels

    };
    return api;
    

    function setModel(_model) {
        model = _model;
    }

    function findHotels (query) {
        var deferred = Q.defer();

        HotelModel
            .find({},function (err, hotels) {
                if(err){
                    deferred.abort(err);
                }else{
                    deferred.resolve(hotels);
                }
            });
        return deferred.promise;

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

    function updateHotelAvailability (hotelId, bookingDates) {
        var deferred = Q.defer();
        HotelModel
            .update({"_id": hotelId}, {$push : {BookedDates : bookingDates}}, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                } else {
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

    function deleteHotel (hotelId) {
        var deferred = Q.defer();
        HotelModel
            .remove({_id: hotelId}, function (err, hotel) {
                if(err){
                    deferred.abort(err);
                } else{
                    deferred.resolve(hotel);
                }
            });
        return deferred.promise;
    }

};