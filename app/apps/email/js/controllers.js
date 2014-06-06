'use strict';

/* Controllers */

angular.module('GO.controllers')

				.controller('EmailController', ['$scope', '$state', 'Store', function($scope, $state, Store) {

						$scope.pageTitle = 'E-mail';

						$scope.contentActive = function() {
							return !$state.is('email');
						};

						$scope.store = new Store('email/account/store',
										{
											limit: 10
										});
					}])
				

