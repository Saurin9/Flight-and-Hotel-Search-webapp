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
            "deleteHotel": deleteHotel,
            "getRegisteredHotels" : getRegisteredHotels
            // "getHotelSearchUrl": getHotelSearchUrl
        };
        return api;

        function getRegisteredHotels(hotelBookingReq) {
            return  $http.post('/api/searchHotel/', hotelBookingReq);
        }


        function getHotels (hotelBookingReq) {
            var hotelSearchUrl = hotel_urlbase.replace("LOCATION_REQ", hotelBookingReq.location)
                .replace("CHECKIN_REQ", hotelBookingReq.checkinDate)
                .replace("CHECKOUT_REQ",hotelBookingReq.checkoutDate);

            return $http.get(hotelSearchUrl);
            // console.log(hotelBookingReq);

            // var registeredHotels;
            // var temp1;
            // var allHotelResults = {apiHotels : [],registeredHotels : []};
            //
            //
            // $http.get(hotelSearchUrl).success(function (hotels) {
            //     allHotelResults.apiHotels = hotels.results;
            //     console.log(allHotelResults);
            //     $http.post('/api/searchHotel/', hotelBookingReq).success(function (hotels){
            //         allHotelResults.registeredHotels = hotels;
            //         console.log(allHotelResults);
            //         return allHotelResults;
            //     })
            //         .error(function (err) {
            //             return allHotelResults;
            //         });
            // });

        }

        function addHotel(hotel, userId) {
            return $http.post('/api/user-hotelowner/' + userId + '/hotel', hotel);
        }

        function findHotelsByOwner (userId) {
            return $http.get("/api/user-hotelowner/" + userId + "/hotel");
        }

        function updateHotelAvailibility (bookingDates, hotelId) {
            return $http.put('/api/hotel/' + hotelId, bookingDates);
        }

        function deleteHotel (hotelId) {
            return $http.delete('/api/hotel/' + hotelId);
        }

    }
})();