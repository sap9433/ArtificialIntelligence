'use strict';

/**
 * @ngdoc overview
 * @name astarApp
 * @description
 * # astarApp
 *
 * Main module of the application.
 */
angular
  .module('astarApp', [
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
