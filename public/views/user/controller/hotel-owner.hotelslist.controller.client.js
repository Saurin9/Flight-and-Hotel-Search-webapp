(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelOwnerListController", HotelOwnerListController);

    function HotelOwnerListController($routeParams, $location, HotelService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToNewHotel = goToNewHotel;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;

        function init() {
            HotelService
                .findHotelsByOwner(userId)
                .success(function (hotels) {
                    vm.hotels = hotels;
                    console.log(hotels);
                });
        }
        init();


        function goToNewHotel () {
            $location.url('/user-hotelowner/' + userId +'/hotel/new');
        }

        function goToHotelOwnerProfile () {
            $location.url('/user-hotelowner/' + userId);
        }



    }
})();