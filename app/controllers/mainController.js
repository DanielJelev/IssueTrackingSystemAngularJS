app.controller('MainController',[
    '$scope',
    '$q',
    '$localStorage',
    'authenticationService',
    'projectService',
    'issueService',

    function ($scope, $q,$localStorage,authenticationService,projectService,issueService) {

        $scope.authService = authenticationService;

        if(authenticationService.isLoggedIn()){
            //debugger
            var currentUser = $localStorage.currentUser;

            authenticationService.userInfo(currentUser).then(function(userData){
                $scope.userInfo = userData.data;
            });

            $scope.getIssuesForUser = function(){


            }
        }
}]);