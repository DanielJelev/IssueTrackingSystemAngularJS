'use strict';

var app = angular.module('issueTracker', ['ngRoute', 'ngResource', 'ngStorage','ui.bootstrap']);

app.constant({
    'baseServiceUrl': 'https://softuni-issue-tracker.azurewebsites.net/',
    pageSize: 20
});


app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
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
      .when('/projects', {
          templateUrl: 'views/admin/all-projects.html',
          controller: 'ProjectController'
      })
      .when('/projects/add', {
          templateUrl: 'views/project/Add-new-project.html',
          controller: 'ProjectController'
      })
      .when('/project/:id', {
        templateUrl: 'views/project/edit-project.html',
        controller: 'ProjectController',
      })
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