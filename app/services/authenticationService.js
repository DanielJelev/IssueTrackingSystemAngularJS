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
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    };

    authenticationService.getCurrentUserData = function () {
        return $http({
            method: 'GET',
            url: baseServiceUrl + '/me',
            headers: this.getHeaders()
        })
    };

    authenticationService.login = function (userData) {
        return $http({
            method: 'POST',
            url: baseServiceUrl + '/Token',
            data: "userName=" + userData.Username + "&password=" + userData.Password +
            "&grant_type=password"
        })
    };

    authenticationService.register = function (userData) {

        return $http({
            method: 'POST',
            url: baseServiceUrl + '/Account/Register',
            data: userData
        })
    };

    authenticationService.logout = function () {
        return $http({
            method: 'POST',
            url: baseServiceUrl + '/Account/logout',
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
            url: baseServiceUrl + '/Account/changepassword',
            data: userData,
            headers: this.getHeaders()
        });
    };
    authenticationService.userInfo = function (userData) {
        return $http({
            method: 'GET',
            url: baseServiceUrl.substr(0,baseServiceUrl.length-3) + '/users/me',
            data: userData,
            headers: this.getHeaders()
        });
    };

    return authenticationService;
}]);