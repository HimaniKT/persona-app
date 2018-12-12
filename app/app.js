'use strict';

//app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.persona'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
}])
.constant('baseUrl', 'https://private-anon-dbae32521e-smaplypersonastest.apiary-mock.com/');