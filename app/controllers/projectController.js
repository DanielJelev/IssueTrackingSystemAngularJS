app.controller('ProjectController', [
    '$scope',
    '$location',
    'authenticationService',
    'projectService',
    function ($scope, $location, authenticationService, projectService) {


        $scope.addProject = function (projectData) {
            projectService.addProject(projectData).then(
                function success() {

                    $location.path("/dashboard");
                },
                function error(error) {
                    console.log(error)
                }
            );
        };
}]);