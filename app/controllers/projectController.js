app.controller('ProjectController', [
    '$scope',
    '$location',
    'authenticationService',
    'projectService',
    'pageSize',
    function ($scope, $location, authenticationService, projectService,pageSize) {

        $scope.projectParams = {
            'startPage' : 1,
            'pageSize' : pageSize
        };
        $scope.reloadProjects = function() {
            projectService.getAllProjects(
                $scope.projectParams,
                function success(data) {
                    console.log(data)
                    $scope.projects = data;
                },
                function error(err) {
                    notifyService.showError("Cannot show projects" + err)
                }
            );
        };
        $scope.reloadProjects();
}]);