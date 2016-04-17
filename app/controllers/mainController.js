app.controller('MainController',[
    '$scope',
    '$q',
    'authenticationService',
    'projectService',
    'issueService',

    function ($scope, $q,authenticationService,projectService,issueService) {
        $scope.isLogged = authenticationService.isLoggedIn();
        if($scope.isLogged){
            var currentUser = $scope.currentUser;

            authenticationService.userInfo(currentUser).then(function(userData){
                $scope.userInfo = userData.data;
            });

            $scope.getIssuesForUser = function(){


            }
        }
}]);