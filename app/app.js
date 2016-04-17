'use strict';

var app = angular.module('issueTracker', ['ngRoute', 'ngResource', 'ngStorage']);

app.constant({
  'baseServiceUrl': 'https://softuni-issue-tracker.azurewebsites.net/api'
});


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/welcome.html',
        controller: 'MainController'
      })
      .when('/login', {
        templateUrl: 'views/user/login.html',
        controller: 'AuthenticationController'
      })
      .when('/register', {
        templateUrl: 'views/user/register.html',
        controller: 'AuthenticationController'
      })
      .when('/logout', {
        templateUrl: 'views/welcome.html',
        controller: 'AuthenticationController'
      })
      .when('/dashboard', {
          templateUrl: 'views/dashboard/dashboard.html',
          controller: 'MainController'
      })
      .when('/projects', {
          templateUrl: 'views/project/project.html',
          controller: 'ProjectController'
      })
      .when('/projects/add', {
          templateUrl: 'views/project/Add-new-project.html',
          controller: 'ProjectController'
      })
      //.when('/profile/edit-profile', {
      //  templateUrl: 'views/user/edit-profile.html',
      //  controller: 'MainController',
      //})
      //.when('/profile/change-password', {
      //  templateUrl: 'views/user/change-password.html',
      //  controller: 'MainController'
      //})
      //.when('/users/:username/', {
      //  templateUrl: 'views/user/user-wall.html',
      //  controller: 'MainController'
      //})
      //.when('/friends/requests/', {
      //  templateUrl: 'views/friend-requests.html',
      //  controller: 'MainController'
      //})
      //.when('/users/:username/friends/', {
      //  templateUrl: 'views/user/user-all-friends.html',
      //  controller: 'MainController'
      //})
      //.when('/me/friends/', {
      //  templateUrl: 'views/user/all-own-friends.html',
      //  controller: 'MainController'
      //})
      .otherwise({
        redirectTo: '/'
      });
}]);

app.run(function ($rootScope, $location, authenticationService) {
  $rootScope.$on('$locationChangeStart', function (event) {
    var isRegisterPage = $location.path().indexOf('/register') == -1,
        isLoginPage = $location.path().indexOf('/login') == -1,
        isHomePage = $location.path().indexOf('/') > -1 && $location.path().length == 1,
        isLoggedIn = authenticationService.isLoggedIn();

    if (!isLoggedIn && (!isHomePage && isRegisterPage && isLoginPage)) {
      $location.path("/");
    } else if (isLoggedIn && (!isRegisterPage || !isLoginPage)) {
      $location.path("/");
    }
  });
});