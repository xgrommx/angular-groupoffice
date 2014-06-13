'use strict';

angular.module('GO.email.controllers')

				.controller('EmailController', ['$scope', '$state', '$stateParams', 'store', function($scope, $state, $stateParams, store) {

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
					}]);
				

