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
app.directive("ngUser", [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partial/user.html'
    };
}]);

app.directive('loading', function () {
    return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="http://www.nasa.gov/multimedia/videogallery/ajax-loader.gif" width="20" height="20" />LOADING...</div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
})