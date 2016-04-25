'use strict';

app.factory('projectService',['$http','baseServiceUrl','authenticationService',
    function ($http, baseServiceUrl,authenticationService) {

    var projectService = {};

        projectService.getAllProjects = function(params){
            return $http({
                method: 'GET',
                url: baseServiceUrl + 'projects?filter=&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                headers: authenticationService.getHeaders()
            });
        };

        projectService.getProjectById = function(id){
            return $http({
                url : baseServiceUrl+ "/Projects/"+ id,
                method : "GET",
                headers: authenticationService.getHeaders()
            });
        };

        projectService.addProject = function(projectData){
            return $http({
                url : baseServiceUrl + "projects",
                method : "POST",
                headers: authenticationService.getHeaders(),
                data: projectData
            });
        };

        projectService.editProject = function(id , projectData){
            return $http({
                url : baseServiceUrl + "api/Project/"+id,
                method : "PUT",
                headers: authenticationService.getHeaders(),
                data : projectData
            });
        };

    return projectService;
}]);