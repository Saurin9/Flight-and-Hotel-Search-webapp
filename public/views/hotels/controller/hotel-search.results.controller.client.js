(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelSearchResultsController", HotelSearchResultsController);

    function HotelSearchResultsController($routeParams, HotelService) {
        var vm = this;

        var hotelLoc = $routeParams['loc'];
        var cinDate = $routeParams['cin'];
        var coutDate = $routeParams['cout'];



        function init() {
            vm.hotelReq = {"location": hotelLoc, "checkinDate": cinDate, "checkoutDate": coutDate};



            HotelService
                .getHotels(vm.hotelReq)
                .success(function (hotels) {
                vm.apiHotels = hotels;
                HotelService
                    .getRegisteredHotels(vm.hotelReq)
                    .success(function (hotels) {
                        vm.registeredHotels = hotels;
                    });
            });

                // .success(function (hotels) {
                //
                //     vm.hotels = hotels.apiHotels;
                //     for (var i = 0; i < hotels.registeredHotels.length ; i++) {
                //         var hotel = hotels.registeredHotels[i];
                //         console.log(hotel);
                //     }
                //
                //     //vm.hotels = hotels;
                // })
                // .error(function (err) {
                //     vm.err = err;
                // });

        }
        init();


        // function getHotels(hotelBookingReq) {

        //
        // }
    }
})();