(function () {
    angular
        .module("FlightSearchApp")
        .controller("NewHotelController", NewHotelController);

    function NewHotelController($routeParams, $location, HotelService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToHotelsList = goToHotelsList;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.addHotel = addHotel;

        function init() {
            findAllCityCodeArray();
        }
        init();

        
        function goToHotelOwnerProfile() {
            $location.url('/user-hotelowner/' + userId);
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/' + userId +'/hotel');
        }

        function addHotel(newhotel) {
            
            HotelService
                .addHotel(newhotel, userId)
                .success(function (hotel) {
                    if(hotel){
                        $location.url('/user-hotelowner/' + userId +'/hotel');
                    }
                })
        }

        function findAllCityCodeArray() {
            // Create a new XMLHttpRequest.
            var request = new XMLHttpRequest();

            // Handle state changes for the request.
            request.onreadystatechange = function(response) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        // Parse the JSON
                        var jsonOptions = JSON.parse(request.responseText);

                        vm.allCities = jsonOptions.response;
                    }
                }
            };

            request.open('GET', 'City_Codes.json', true);
            request.send();

        }
        



    }
})();