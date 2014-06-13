'use strict';

angular.module('GO.controllers')

				.controller('AccountController', ['$scope', '$state', 'Store', function($scope, $state, Store) {

						$scope.pageTitle = 'E-mail';

						$scope.store = new Store('email/account/store',
										{
											limit: 10
										});
					}]);