app.controller('MainController',[
    '$scope',
    '$q',
    '$localStorage',
    'authenticationService',
    'projectService',
    'issueService',

    function ($scope, $q,$localStorage,authenticationService,projectService,issueService) {

        $scope.authService = authenticationService;

}]);