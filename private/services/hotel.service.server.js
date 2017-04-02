module.exports = function (app, model) {

    app.post('/api/user-hotelowner/:userId/hotel', addHotel);
    app.get('/api/user-hotelowner/:userId/hotel', findHotelByOwner);
    app.put('/api/hotel/:hotelId', updateHotelAvailability);
    app.delete('/api/hotel/:hotelId', deleteHotel);


    function addHotel (req, res) {
        var userId = req.params['userId'];
        var newhotel = req.body;

        model
            .hotelModel
            .addHotel(userId, newhotel)
            .then(
                function (newhotel) {
                    res.json(newhotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function findHotelByOwner (req, res) {
        var userId = req.params['userId'];
        model
            .hotelModel
            .findHotelByUser(userId)
            .then(
                function (hotels) {
                    res.json(hotels);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function updateHotelAvailability (req, res) {
        var hotelId = req.params['hotelId'];
        var editedDetails = req.body;
        // console.log(hotelId);
        // console.log(editedDetails);
        model
            .hotelModel
            .updateHotelAvailability(hotelId, editedDetails)
            .then(
                function (hotel) {
                    res.json(hotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }

    function deleteHotel (req, res) {
        var hotelId = req.params['hotelId'];
        model
            .hotelModel
            .deleteHotel(hotelId)
            .then(
                function (hotel) {
                    res.json(hotel);
                },
                function (err) {
                    res.sendStatus(400);
                }
            );
    }


};

