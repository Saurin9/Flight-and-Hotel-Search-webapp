module.exports = function (app, model) {

    app.post('/user-hotelowner/:userId/hotel', addHotel);
    app.get('/user-hotelowner/:userId/hotel', findHotelByOwner);


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


};

