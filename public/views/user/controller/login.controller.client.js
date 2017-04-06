(function () {
    angular
        .module("FlightSearchApp")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;

        vm.login = login;
        vm.setToRecoveryMode = setToRecoveryMode;

        function init() {
            vm.passwordRecoverymode = false;
        }
        init();

        function login(user) {
            console.log(user.passwordRecoveryAnswer);
            UserService
                .findUserByCredentials(user.username, user.password, user.passwordRecoveryAnswer)
                .success(function (user) {
                    if(user) {
                        if (user.userType === "ADMIN") {
                            $location.url("/user/"+user._id+"/adminProfile");
                        } else if (user.userType === "HOTELOWNER") {
                            $location.url('/user-hotelowner/' + user._id);
                        } else {
                            $location.url("/user/"+user._id+"/flightSearch");
                        }
                    } else {
                        vm.error = "User not found";
                    }
                });
        }

        function setToRecoveryMode (user) {
            vm.passwordRecoverymode = true;
            getSecurityQuestion(user);
        }

        function getSecurityQuestion (user) {
            UserService
                .findSecurityQuestionByUsername(user.username)
                .success(function (securityQuestion) {
                    if(user) {
                        vm.user.passwordRecoveryQuestion = securityQuestion;
                        // vm.user.passwordRecoveryAnswer = null;
                        // vm.user.password = null;
                    } else {
                        vm.error = "User not found";
                    }
                });
        }
    }
})();