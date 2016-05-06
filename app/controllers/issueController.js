app.controller('IssueController', [
    '$scope',
    '$routeParams',
    '$location',
    'issueService',
    'userService',
    'projectService',
    'lableService',
    'notifyService',
    'pageSize',
    function ($scope,$routeParams, $location, issueService,userService, projectService,lableService,notifyService,pageSize) {

        userService.getAllUsers()
            .then(function (success) {
                $scope.users = success.data.sort(function (a, b) {
                    return a.Username.localeCompare(b.Username);
                })
            });
        projectService.getAllProjects()
            .then(function(success){
                $scope.projects = success.data.sort(function (a, b) {
                    return a.Name.localeCompare(b.Name);
                })
            })
        $scope.getPriorities = function(){
            var project = $scope.projects.filter(function(a){
                return a.Id == $scope.issueData.ProjectId
            });

            $scope.priorities = project[0].Priorities


        };
        $scope.getLabels = function () {
            var filter = $scope.issueData.StringLabels;
            if (filter) {
                var allFilters = filter.split(',');
                var lastFilter = allFilters[allFilters.length - 1].trim();

                if (lastFilter.length >= 2) {
                    lableService.getLabels(lastFilter).then(function(data){
                        $scope.labels = data.data;
                    });
                } else {
                    $scope.labels = [];
                }
            }
        }
        $scope.addLabel =function (label) {
            var lastComma = $scope.issueData.StringLabels.lastIndexOf(',');
            if (lastComma !== -1) {
                $scope.issueData.StringLabels = $scope.issueData.StringLabels.slice(0, lastComma) + ', ';
            } else {
                $scope.issueData.StringLabels = '';
            }

            $scope.issueData.StringLabels += label.Name + ', ';
            $scope.labels = [];
        };

        $scope.addIssue = function(issueData){
            var Labels = [];


            issueData.StringLabels.split(",").forEach(function(p) {

                Labels.push({ Name: p.trim() });

            });
            var issue = {
                Title: issueData.Title,
                Description: issueData.Description,
                ProjectId: issueData.ProjectId,
                AssigneeId: issueData.AssigneeId,
                DueDate: issueData.DueDate,
                PriorityId: issueData.PriorityId,
                Labels: Labels
            };
            console.log(issue)
            issueService.addIssue(issue).then(function(data){
                $location.path('/issues/' + data.Id)
            })
        }

    }]);