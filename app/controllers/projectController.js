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
        $scope.authService = authenticationService;
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
                    $scope.totalProjects = data.data.TotalPages * $scope.projectParams.pageSize;
                    $scope.projects = data.data.Projects;

            })
        };
        $scope.getProjects();


        $scope.getProjectById = function(){
            projectService.getProjectById($routeParams.id)
                .then(function success(data){
                    $scope.project = data.data;
                },function error(err){
                    $location.path("/")
                });
        };

        $scope.addNewProjects = function (projectData) {
            var Priorities = [],
                Labels = [];


            projectData.priorities.split(",").forEach(function(p) {

                    Priorities.push({ Name: p.trim() });

            });
            projectData.StringLabels.split(",").forEach(function(p) {

                Labels.push({ Name: p.trim() });

            });

            var project = {
                Name: projectData.Name,
                Description: projectData.Description,
                ProjectKey: projectData.ProjectKey,
                LeadId: projectData.LeadId,
                priorities: Priorities,
                labels: Labels
            };

            projectService.addProject(project)
                .then(function (success) {
                    notifyService.showInfo('successfully created a project!');
                    $location.path("/project/"+success.data.Id)
                },function (error) {
                    console.log(error);
                })
             };

        $scope.getProject = function(){

            projectService.getProjectById($routeParams.id)
                .then(function(data){
                    $scope.newProject = data.data;
                })
        };


}]);
app.controller('ViewProjectController', [
    '$scope',
    '$routeParams',
    '$location',
    'issueService',
    'projectService',
    'notifyService',
    function ($scope,$routeParams, $location,issueService, projectService,notifyService) {


        projectService.getProjectById($routeParams.id)
            .then(function(data){
                $scope.newProject = data.data;

                issueService.getAllProjectIssues($routeParams.id)
                    .then(function(data){
                        $scope.newProject.issues = data.data;
                    })

            })


    }]);
app.controller('EditProjectController', [
    '$scope',
    '$routeParams',
    '$location',
    'issueService',
    'projectService',
    'notifyService',
    function ($scope,$routeParams, $location,issueService, projectService,notifyService) {


        projectService.getProjectById($routeParams.id)
            .then(function(data){
                $scope.currentProject = data.data;

            });

        $scope.editProject = function(editProject){

                var Priorities = [];
                var Labels = [];


                editProject.priorities.split(",").forEach(function(p) {

                    Priorities.push({ Name: p.trim(), });

                });



                editProject.StringLabels.split(",").forEach(function(p) {

                    Labels.push({ Name: p.trim() });

                });

                var project = {
                    Name: editProject.Name,
                    Description: editProject.Description,
                    LeadId: editProject.LeadId,
                    priorities: Priorities,
                    labels: Labels,
                };
                projectService.editProject($routeParams.id,project)
                    .then(function success(){
                            $location.path('/project/'+$routeParams.id);
                            notifyService.showInfo("Successful edited project");
                        },
                        function error(error){
                            notifyService.showError("Failed to edit project");
                        });

        }

    }]);