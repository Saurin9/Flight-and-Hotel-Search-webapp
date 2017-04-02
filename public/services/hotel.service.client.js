(function () {
    angular
        .module("FlightSearchApp")
        .factory('HotelService', HotelService);

    function HotelService($http) {

        var ss_API_KEY = "5NPbEYxDOHBtMEMVCrAYRZuqqOVygdgv";
        var hotel_urlbase = "https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=" + ss_API_KEY +
            "&location=LOCATION_REQ&check_in=CHECKIN_REQ&check_out=CHECKOUT_REQ"

        var api = {
            "getHotels": getHotels,
            "addHotel": addHotel,
            "findHotelsByOwner": findHotelsByOwner,
            "updateHotelAvailibility": updateHotelAvailibility,
            "deleteHotel": deleteHotel
            // "getHotelSearchUrl": getHotelSearchUrl
        };
        return api;


        function getHotels (hotelBookingReq) {
            var hotelSearchUrl = hotel_urlbase.replace("LOCATION_REQ", hotelBookingReq.location)
                .replace("CHECKIN_REQ", hotelBookingReq.checkinDate)
                .replace("CHECKOUT_REQ",hotelBookingReq.checkoutDate);

            return $http.get(hotelSearchUrl);

        }

        function addHotel(hotel, userId) {
            return $http.post('/api/user-hotelowner/' + userId + '/hotel', hotel);
        }

        function findHotelsByOwner (userId) {
            return $http.get("/api/user-hotelowner/" + userId + "/hotel");
        }

        function updateHotelAvailibility (editedDetails, hotelId) {
            console.log(editedDetails);
            return $http.put('/api/hotel/' + hotelId, editedDetails);
        }

        function deleteHotel (hotelId) {
            return $http.delete('/api/hotel/' + hotelId);
        }

    }
})();