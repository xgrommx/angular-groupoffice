'use strict';


angular.module('GO.email',['GO']).
				//Register the app e-mail
				config(['appsProvider',function(appsProvider) {												
						appsProvider.addApp('email', 'E-mail');
					}]).
				
				config(['$stateProvider', function($stateProvider) {

						//
						// Now set up the states
						$stateProvider
										.state('email', {
											url: "/apps/email",
											templateUrl: 'apps/email/partials/accounts.html',
											controller: 'AccountController'
										})
										.state('messages', {
											url: "/apps/email/messages/{accountId:[0-9]*}/{mailbox:[^/]*}",
											templateUrl: 'apps/email/partials/messages.html',
											controller: 'EmailController'
										})
										.state('messages.message', {
											url: "/{uid:[0-9]*}",
											templateUrl: 'apps/email/partials/message-view.html',
											controller: 'MessageController'
										});
					}]);
				
angular.module('GO.email.services', ['GO.email']);
angular.module('GO.email.controllers', ['GO.email']);