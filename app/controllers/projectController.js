app.controller('ProjectController', [
    '$scope',
    '$routeParams',
    '$location',
    'authenticationService',
    'userService',
    'projectService',
    'notifyService',
    'pageSize',
    function ($scope,$routeParams, $location, authenticationService,userService, projectService,notifyService,pageSize) {

        $scope.projectParams = {
            'startPage': 1,
            'pageSize': pageSize * 2 - 1
        };
        userService.getAllUsers()
            .then(function (success) {
                console.log(success)
                $scope.users = success.data.sort(function (a, b) {
                    return a.Username.localeCompare(b.Username);
                })
            });

        $scope.getProjects = function () {
            projectService.getAllProjects(
                $scope.projectParams,
                function success(data) {
                    $scope.totalProjects = data.TotalPages * $scope.projectParams.pageSize ,
                        $scope.projects = data.Projects;
                },
                function error(err) {
                    notifyService.showError("Failed loading data...", err);
                });
        }

        $scope.getProjectById = function(id){
            projectService.getProjectById($routeParams.id)
                .then(function success(data){
                    $scope.project = data.data;
                    console.log(data.data)
                },function error(err){
                    $location.path("/")
                });
        };

        $scope.addNewProjects = function (newProject) {
            var priorities = [];

            newProject.priorities.split(', ').forEach(function (a) {
                priorities.push({Name: a});
            });

            newProject.Priorities = priorities;

            projectService.addProject(newProject)
                .then(function (success) {
                    console.log(success);
                    notifyService.showInfo('successfully created a project!');
                    $scope.newProject = {};
                },function (error) {
                    console.log(error);
                })
        }
        $scope.getProjects();
}]);