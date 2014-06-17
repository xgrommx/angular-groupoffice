'use strict';

angular.module('GO.email.controllers')

				.controller('EmailController', ['$scope', '$state', '$stateParams', 'store','message', function($scope, $state, $stateParams, store, message) {

						$scope.pageTitle = 'E-mail';

						$scope.contentActive = function() {
							return !$state.is('messages');
						};
						
						$scope.mailbox = $stateParams.mailbox;
						$scope.account_id= $stateParams.accountId;

						$scope.store = new store('email/message/store',
										{
											account_id: $scope.account_id,
											mailbox: $scope.mailbox,
											limit: 10,
											sort:'date',
											dir:'DESC'
										});
										
						//Will be used in child scope. We define it here so we can access 
						//the properties if needed in the future.
						//Child scopes automatically inherit properties of the parents but
						//not the other way around.
						$scope.message = new message();
					}]);
				

