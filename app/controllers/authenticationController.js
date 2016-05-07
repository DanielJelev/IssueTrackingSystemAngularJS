app.controller('AuthenticationController',[
    '$scope',
    '$location',
    '$rootScope',
    'authenticationService',
    'notifyService',
    '$localStorage',
    '$window',
    function ($scope, $location, $rootScope, authenticationService,notifyService, $localStorage,$window) {

        $scope.isLogged = authenticationService.isLoggedIn();

        $scope.register = function (userData) {
            authenticationService.register(userData).then(
                function success() {
                    var userLogin = {
                        Username: userData.Email,
                        Password:userData.Password
                    };
                    authenticationService.login(userLogin).then(function (serverData) {
                        authenticationService.setCredentials(serverData.data);
                        notifyService.showInfo('Successful register');
                    })


                },
                function error(error) {
                    notifyService.showError("User registration failed", error);
                }
            );
        };

        $scope.login = function (userData) {
            authenticationService.login(userData).then(
                function success(serverData) {
                    var user = serverData.data;
                    authenticationService.userInfo(user , user.access_token).then(function(data){

                        user.isAdmin = data.data.isAdmin;
                        authenticationService.setCredentials(user);
                        notifyService.showInfo('Successful login');
                    })

                },
                function error(error) {
                    notifyService.showError("User login failed", error);
                }
            );
        };

        $scope.logout = function () {
            authenticationService.logout().then(
                function success(serverData) {
                    authenticationService.clearCredentials(serverData.data);
                    notifyService.showInfo('Good Bye!');
                },
                function error(error) {

                }
            );
        };


        $scope.changePassword = function (userData) {
            authenticationService.changePassword(userData).then(
                function success() {
                    notifyService.showInfo('Successful password changed!');
                    $location.path('/');
                },
                function error(err) {
                    notifyService.showInfo('Failed to change password'+err)
                }
            )
        }
    }]);