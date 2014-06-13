'use strict';

angular.module('GO.controllers')

				.controller('EmailController', ['$scope', '$state', '$stateParams', 'Store', function($scope, $state, $stateParams, Store) {

						$scope.pageTitle = 'E-mail';

						$scope.contentActive = function() {
							return !$state.is('messages');
						};
						
						$scope.mailbox = $stateParams.mailbox;
						$scope.account_id= $stateParams.accountId;

						$scope.store = new Store('email/message/store',
										{
											account_id: $scope.account_id,
											mailbox: $scope.mailbox,
											limit: 10,
											sort:'date',
											dir:'DESC'
										});
					}]);
				

