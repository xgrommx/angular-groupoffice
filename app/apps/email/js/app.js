'use strict';


angular.module('GO').
				//Register the app e-mail
				config(['appsProvider', function(appsProvider) {
						appsProvider.addApp('email', 'E-mail');
					}]).
				
				config(['$stateProvider', function($stateProvider) {

						//
						// Now set up the states
						$stateProvider
										.state('email', {
											url: "/apps/email",
											templateUrl: 'apps/email/partials/main.html',
											controller: 'EmailController'
										});
					}]);