'use strict';

// Declare app level module which depends on filters, and services
var GO = angular.module('GO', [
	//Angular modules
//	'ngRoute',
	
	
	//3rd party modules
	//'ngTable',
	'ui.bootstrap',
	'ui.router',
	'ui.utils',
	'infinite-scroll',
	'ngTouch',
	
	
	
	//Group-Office modules
	'GO.filters',
	'GO.services',
	'GO.directives',
	'GO.controllers'
]).
//				config(['$routeProvider', function($routeProvider) {
//						$routeProvider
//										// route for the home page
//										.when('/login', {
//											templateUrl: 'partials/c.html',
//											controller: 'LoginController'
//										})
//
//										// route for the about page
//										.when('/start', {
//											templateUrl: 'partials/start.html',
//											controller: 'StartController'
//										})
//										.otherwise({redirectTo: '/login'});
//					}])

				config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
// For any unmatched url, redirect to /state1
						$urlRouterProvider.otherwise("/login");
						//
						// Now set up the states
						$stateProvider
										.state('login', {
											url: "/login",
											templateUrl: "partials/login.html",
											controller: 'LoginController'
										})
										.state('start', {
											url: "/start",
											templateUrl: "partials/start.html",
											controller: 'StartController'
										});
					}])
				.config(function ($httpProvider) {
					
					//to allow cookies in CORS XmlHttpRequests
					$httpProvider.defaults.withCredentials = true;
					$httpProvider.defaults.useXDomain = true;
				})
				.provider('apps',['$logProvider', function() {

					var apps = [];

					this.addApp = function(id, title) {
						var app = {id: id, title: title};		
						
						apps.push(app);
					};

					this.$get = function() {
						return apps;
					};

				}]);




//.config(['$rootScope', function($rootScope) {
//		$rootScope.modules = [{name: 'users', title: 'User management'}, {name: 'email', title: 'E-mail'}];
//	}]);





GO.value('version', '1.0');






//
//GO.config(function($routeProvider) {
//	$routeProvider
//
//		// route for the home page
//		.when('/apps/email', {
//			templateUrl : 'views/Responsive/view/email.html',
//			controller  : 'EmailController'
//		});
//
//
//});







