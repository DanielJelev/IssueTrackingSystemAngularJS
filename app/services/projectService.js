'use strict';

app.factory('projectService',['$http','baseServiceUrl','authenticationService',
    function ($http, baseServiceUrl,authenticationService) {

    var projectService = {};

        projectService.getAllProjects = function(){
            return $http({
                url : baseServiceUrl + "/Project",
                method : "GET",
                headers: authenticationService.getHeaders()
            });
        };

        projectService.getProjectById = function(id){
            return $http({
                url : baseServiceUrl + "/Project/"+ id,
                method : "GET",
                headers: authenticationService.getHeaders()
            });
        };

        projectService.addProject = function(projectData){
            return $http({
                url : baseServiceUrl + "/Project",
                method : "POST",
                headers: authenticationService.getHeaders(),
                data: projectData
            });
        };

        projectService.editProject = function(id , projectData){
            return $http({
                url : baseServiceUrl + "/Project/"+id,
                method : "PUT",
                headers: authenticationService.getHeaders(),
                data : projectData
            });
        };

    return projectService;
}]);