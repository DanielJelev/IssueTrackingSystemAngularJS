app.controller('AuthenticationController',[
    '$scope',
    '$location',
    '$rootScope',
    'authenticationService',
    '$localStorage',

    function ($scope, $location, $rootScope, authenticationService, $localStorage) {

        $scope.isLogged = authenticationService.isLoggedIn();

        if ($scope.isLogged) {
            $scope.userData = function () {
                authenticationService.getCurrentUserData()
                    .then( function (userData) {

                    },
                    function (error) {
                        console.log(error)
                    }
                );
            }
        }

        $scope.register = function (userData) {
            authenticationService.register(userData).then(
                function success(serverData) {
                    authenticationService.setCredentials(serverData.data);
                    $location.path("/dashboard");
                },
                function error(error) {
                    console.log(error)
                }
            );
        };

        $scope.login = function (userData) {

            authenticationService.login(userData).then(
                function success(serverData) {
                    authenticationService.setCredentials(serverData.data);
                    $location.path("/dashboard");
                },
                function error(error) {
                    console.log(error)
                }
            );
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials(serverData.data);
                    $location.path('/');
                },
                function error(error) {
                    console.log(error)
                }
            );
        };

        $scope.editProfile = function (userData) {

            authenticationService.editProfile(data).then(
                function success() {

                    $location.path('/');
                },
                function error(error) {

                }
            );
        };

        $scope.changePassword = function (userData) {

            authenticationService.changePassword(userData).then(
                function success() {

                    $location.path('/');
                },
                function error(error) {

                }
            )
        }
    }]);