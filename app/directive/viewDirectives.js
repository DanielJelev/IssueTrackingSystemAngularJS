app.directive("ngProjectView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partial/project.html'
    };
}]);
app.directive("ngIssueView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partial/issue.html'
    };
}]);