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