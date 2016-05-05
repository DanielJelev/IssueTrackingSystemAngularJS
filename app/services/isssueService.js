'use strict';

app.factory('issueService',['$http','baseServiceUrl','authenticationService' ,
    function ($http, baseServiceUrl,authenticationService,projectService) {

        var issueService = {};

        issueService.getAllProjectIssues = function(projectId){
            return $http({
                url : baseServiceUrl + "Projects/"+projectId+ '/Issues',
                method : "GET",
                headers: authenticationService.getHeaders()
            });

        };

        issueService.getIssueById = function(id){
            return $http({
                url : baseServiceUrl + "/Issues/"+id,
                method : "GET",
                headers: authenticationService.getHeaders()
            });
        };

        issueService.addProject = function(issueData){
            return $http({
                url : baseServiceUrl + "/Issues/",
                method : "POST",
                headers: authenticationService.getHeaders(),
                data : issueData
            });
        };

        issueService.editProject = function(projectData,id){
            return $http({
                url : baseServiceUrl +"/Project/"+id,
                method : "PUT",
                headers: authenticationService.getHeaders(),
                data : projectData
            });
        };

        issueService.editIssue= function(issueData,id){
            return $http({
                url : baseServiceUrl +"/Issues/"+id,
                method : "PUT",
                headers: authenticationService.getHeaders(),
                data : issueData
            });
        };

        return issueService;
    }]);