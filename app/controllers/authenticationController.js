app.controller('AuthenticationController',[
    '$scope',
    '$location',
    '$rootScope',
    'authenticationService',
    'notifyService',
    '$localStorage',

    function ($scope, $location, $rootScope, authenticationService,notifyService, $localStorage) {

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
                    notifyService.showInfo('Successful login');
                    $location.path("/dashboard");
                },
                function error(error) {
                    notifyService.showError('Cannot login' + error)
                }
            );
        };

        $scope.login = function (userData) {

            authenticationService.login(userData).then(
                function success(serverData) {
                    authenticationService.setCredentials(serverData.data);
                    notifyService.showInfo('Successful login');
                    $location.path("/dashboard");
                },
                function error(error) {
                    notifyService.showError('Cannot register' + error)
                }
            );
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials(serverData.data);
                    notifyService.showInfo('GoodBy!');
                    $location.path('/');
                },
                function error(error) {

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