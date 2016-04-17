app.controller('ProjectController', [
    '$scope',
    'authenticationService',
    'projectService',


    function ($scope, authenticationService, projectService) {

        $scope.allProjects = function(){

            projectService.getAllProjects()
        };



}]);