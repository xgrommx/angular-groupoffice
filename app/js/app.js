'use strict';

// Declare app level module which depends on filters, and services
var GO = angular.module('GO', [
	'ui.bootstrap',
	'ui.router',
	'ui.utils',
	'ngTouch',
	//Group-Office modules
	'GO.apps',
	'GO.translate',
	'GO.filters',
	'GO.services',
	'GO.directives',
	'GO.controllers',
	
	'GO.notes',
	'GO.notes.controllers',
	'GO.notes.services'
]).
				config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
						// For any unmatched url, redirect to /state1
						$urlRouterProvider.otherwise("/login");

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

				.config(function($httpProvider) {

					//to allow cookies in CORS XmlHttpRequests
					$httpProvider.defaults.withCredentials = true;
					$httpProvider.defaults.useXDomain = true;
				});
				


GO.value('version', '1.0');


GO.config(['translateProvider', function(translateProvider) {
		translateProvider.setLanguage('nl');
	}]);



angular.module('GO.services', []);
angular.module('GO.directives', []);
angular.module('GO.filters', []);
angular.module('GO.controllers', []);