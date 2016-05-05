app.directive("ngProjectView", [function () {
    return {
        restrict: 'A',
        templateUrl: 'views/partial/project.html',
        link: function($scope) {
            $scope.getProject = function(id){
                console.log(id);
            }
        }
    };
}]);