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
            'pageSize': pageSize
        };
        userService.getAllUsers()
            .then(function (success) {
                $scope.users = success.data.sort(function (a, b) {
                    return a.Username.localeCompare(b.Username);
                })
            });


        $scope.getProjects = function () {
            projectService.getProjectsPaging($scope.projectParams)
                .then(function success(data){
                    console.log(data)
                    $scope.totalProjects = data.data.TotalPages * $scope.projectParams.pageSize;
                    $scope.projects = data.data.Projects;

            })
        };
        $scope.getProjects();




        $scope.getProjectById = function(id){
            projectService.getProjectById($routeParams.id)
                .then(function success(data){
                    $scope.project = data.data;
                    console.log(data.data)
                },function error(err){
                    $location.path("/")
                });
        };

        $scope.addNewProjects = function (projectData) {
            projectData.Labels = [];
            var Priorities = [];


            projectData.priorities.split(", ").forEach(function(p) {

                    Priorities.push({ Name: p.trim() });

            });

            var project = {
                Name: projectData.Name,
                Description: projectData.Description,
                ProjectKey: projectData.ProjectKey,
                LeadId: projectData.LeadId,
                Labels: projectData.Labels,
                Priorities: Priorities
            };

            projectService.addProject(project)
                .then(function (success) {
                    console.log(success);
                    notifyService.showInfo('successfully created a project!');
                    $scope.newProject = {};
                },function (error) {
                    console.log(error);
                })
        }

}]);