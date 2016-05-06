app.controller('MainController',[
    '$scope',
    '$q',
    '$localStorage',
    'authenticationService',
    'projectService',
    'issueService',
    'pageSize',

    function ($scope, $q,$localStorage,authenticationService,projectService,issueService,pageSize) {

        $scope.authService = authenticationService;

        $scope.issueParams = {
            'startPage': 1,
            'pageSize': 3
        };

        $scope.userIssues = function(){
            $scope.main = {};
            issueService.userIssues($scope.issueParams)
                .then(function(issues){
                    $scope.totalIssues = issues.data.TotalPages * $scope.issueParams.pageSize;
                    $scope.main.issues = issues.data.Issues;

                });
        };
        $scope.userIssues();
}]);