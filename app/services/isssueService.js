'use strict';

app.factory('issueService',['$http','baseServiceUrl','authenticationService' ,
    function ($http, baseServiceUrl,authenticationService,projectService) {

        var issueService = {};

        issueService.userIssues = function(params){
            return $http({
                url: baseServiceUrl +
                'issues/me?orderBy=DueDate desc, IssueKey&pageSize=' +
                params.pageSize + '&pageNumber=' +
                params.startPage,
                method : "GET",
                headers: authenticationService.getHeaders()
            })
        };

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

        issueService.addIssue = function(issueData){
            return $http({
                url : baseServiceUrl + "issues",
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
                url : baseServiceUrl +"Issues/"+id,
                method : "PUT",
                headers: authenticationService.getHeaders(),
                data : issueData
            });
        };

        return issueService;
    }]);