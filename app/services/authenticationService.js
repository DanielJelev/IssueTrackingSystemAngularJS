'use strict';

app.factory('authenticationService',
    ['$http',
    'baseServiceUrl',
    '$localStorage',

    function ($http, baseServiceUrl, $localStorage) {

    var authenticationService = {};

    authenticationService.setCredentials = function (serverData) {
        $localStorage.currentUser = serverData;
    };

    authenticationService.clearCredentials = function () {
        $localStorage.$reset();
    };

    authenticationService.isLoggedIn = function () {
        return $localStorage.currentUser != undefined;
    };

    authenticationService.getHeaders = function () {
        return {
            Authorization: "Bearer " + $localStorage.currentUser.access_token,
            'Content-Type': 'application/json'
        };
    };


    authenticationService.login = function (userData) {
        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Token',
            data: "userName=" + userData.Username + "&password=" + userData.Password +
            "&grant_type=password"
        })
    };

    authenticationService.register = function (userData) {

        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Account/Register',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: userData
        })
    };

    authenticationService.logout = function () {
        return $http({
            method: 'POST',
            url: baseServiceUrl + 'api/Account/logout',
            headers: this.getHeaders()
        });
    };

    authenticationService.editProfile = function (userData) {
        return $http({
            method: 'PUT',
            url: baseServiceUrl + '/UserInfo',
            data: userData,
            headers: this.getHeaders()
        });
    };

    authenticationService.changePassword = function (userData) {
        return $http({
            method: 'PUT',
            url: baseServiceUrl + 'api/Account/changepassword',
            data: userData,
            headers: this.getHeaders()
        });
    };
    authenticationService.userInfo = function (userData,access_token) {
        return $http({
            method: 'GET',
            url: baseServiceUrl + 'users/me',
            data: userData,
            headers:{
                Authorization: "Bearer "+access_token
            }
        });
    };
        authenticationService.isAdmin = function(){
            if(this.isLoggedIn()){
                return $localStorage.currentUser.isAdmin
            }
        }
    return authenticationService;
}]);