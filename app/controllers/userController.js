app.controller('UserController',[
    '$scope',
    '$location',
    '$localStorage',
    'authenticationService',
    'userService',
    'pageSize',

    function ($scope, $location,$localStorage,authenticationService,userService,pageSize) {
        $scope.loading = true;
        $scope.authService = authenticationService;

            $scope.getAllUsers = function(){
                userService.getAllUsers()
                    .then(function(users){
                        $scope.loading = false;
                       $scope.users = users.data;
                    });
            };
            $scope.getAllUsers();
        $scope.makeAdmin = function(userId){
            userService.makeAdmin(userId).then(function(){
                $location.path("/")
                notifyService.showInfo("Successful make admin")
            },
            function error(err){
                notifyService.showInfo("Failed to make admin"+err)
            })
        }
    }]);