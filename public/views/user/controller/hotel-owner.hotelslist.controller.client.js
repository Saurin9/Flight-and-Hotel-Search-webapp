(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelOwnerListController", HotelOwnerListController);

    function HotelOwnerListController($routeParams, $location, HotelService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.goToNewHotel = goToNewHotel;
        vm.goToHotelOwnerProfile = goToHotelOwnerProfile;
        vm.updateHotelAvailibility = updateHotelAvailibility;
        vm.deleteHotel = deleteHotel;

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

        function updateHotelAvailibility (editedDetails, hotelId) {
            var available_from = editedDetails.available_from.toISOString().substring(0,10);
            var available_till = editedDetails.available_till.toISOString().substring(0,10);
            editedDetails.available_from = available_from;
            editedDetails.available_till = available_till;

            HotelService
                .updateHotelAvailibility(editedDetails, hotelId)
                .success(function (hotel) {
                    if(hotel==null){
                        vm.error = "Unable to update availability of this hotel ! Please contact the admin.";
                    }
                    else
                    {
                        vm.message = "Hotel availability successfully updated !";
                    }
                })
        }

        function deleteHotel (hotelId) {
            HotelService
                .deleteHotel(hotelId)
                .success(function (hotel) {
                    if(hotel){
                        init();
                        vm.message = "Hotel successfully deleted !";
                    }
                    else
                    {
                        vm.error = "Unable to delete this hotel. Please contact the admin !!";
                    }
                })
        }


    }
})();