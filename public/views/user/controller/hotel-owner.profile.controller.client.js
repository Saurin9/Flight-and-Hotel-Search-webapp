(function () {
    angular
        .module("FlightSearchApp")
        .controller("HotelOwnerProfileController", HotelOwnerProfileController);

    function HotelOwnerProfileController($routeParams, $location, UserService) {
        var vm = this;
        var userId;

        vm.update = update;
        vm.goToNewHotel = goToNewHotel;
        vm.goToHotelsList = goToHotelsList;
        vm.logout = logout;

        function init() {
            UserService
                .findCurrentUser()
                .success(function (user) {
                    userId = user._id;
                    vm.user = user;
                    vm.userType = user.userType;
                });
        }
        init();


        function update(newUser) {
            var user = UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user == null) {
                        vm.error = "unable to update user";
                    } else {
                        vm.message = "user successfully updated"
                    }
                });
        }

        function goToNewHotel() {
            $location.url('/user-hotelowner/' + userId +'/hotel/new');
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/' + userId +'/hotel');
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        $location.url("/");
                    }
                );
        }

    }
})();