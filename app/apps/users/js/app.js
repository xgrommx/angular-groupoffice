'use strict';


angular.module('GO').
				//Register the app e-mail
				config(['appsProvider', function(appsProvider) {
						appsProvider.addApp('users', 'User management');
					}]).
				//Add app routes
//		config(['$routeProvider', function($routeProvider) {							
//						
//						$routeProvider
//										// route for the home page
//										.when('/apps/users', {
//											templateUrl: 'apps/users/partials/main.html',
//											controller: 'UsersController'
//										}).
//										 when('/apps/users/user/:userId', {
//											templateUrl: 'apps/users/partials/main.html',
//											controller: 'UsersController'
//										});
//					}]);

				config(['$stateProvider', function($stateProvider) {

						//
						// Now set up the states
						$stateProvider
										.state('users', {
											url: "/apps/users",
											templateUrl: 'apps/users/partials/main.html',
											controller: 'UsersController'
										})
										.state('users.detail', {
											url: "/{userId:[0-9]+}",
											templateUrl: 'apps/users/partials/user-detail.html',
											controller: 'UserDetailController'
										});
					}]);


