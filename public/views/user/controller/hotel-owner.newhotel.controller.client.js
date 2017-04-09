(function () {
    angular
        .module("FlightSearchApp")
        .controller("NewHotelController", NewHotelController);

    function NewHotelController($routeParams, $location, HotelService, UserService) {
        var vm = this;
        var userId;

        vm.goToHotelsList = goToHotelsList;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.addHotel = addHotel;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.user = user;
                    vm.userType = user.userType;
                    findAllCityCodeArray();
                });

        }
        init();

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/");
                    }
                );
        }

        
        function goToHotelOwnerProfile() {
            $location.url('/user-hotelowner/profile');
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/hotel');
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