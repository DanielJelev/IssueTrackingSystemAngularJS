'use strict';

app.factory('userService',[
    '$http',
    'baseServiceUrl',
    'authenticationService',
    function ($http,baseServiceUrl,authenticationService) {
        var userService = {};
    userService.getAllUsers = function(){
        return $http({
            method: 'GET',
            url: baseServiceUrl + 'users',
            headers: authenticationService.getHeaders()
        })
    };

    userService.makeAdmin= function (data) {
        return $http({
            method: 'PUT',
            url: baseServiceUrl + 'users/makeadmin',
            data: data,
            headers: authenticationService.getHeaders()
        });
    };
        userService.getAllUsersPaging= function (params) {
            return $http({
                method: 'GET',
                url: baseServiceUrl + 'users?filter=&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                headers: authenticationService.getHeaders()
            })
        };
        return userService;
}]);