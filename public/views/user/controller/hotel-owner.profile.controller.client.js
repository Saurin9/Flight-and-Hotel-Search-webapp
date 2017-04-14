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
        // vm.closeAlert = closeAlert;

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

        // function closeAlert () {
        //     vm.show = true;
        // }


        function update(newUser) {
            var user = UserService
                .updateUser(userId, newUser)
                .success(function (user) {
                    if(user == null) {
                        vm.error = "Unable to update user !!";
                        vm.show = true;
                    } else {
                        vm.message = "User successfully updated !!";
                        vm.show = true;
                    }
                });
        }

        function goToNewHotel() {
            $location.url('/user-hotelowner/hotel/new');
        }

        function goToHotelsList() {
            $location.url('/user-hotelowner/hotel');
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