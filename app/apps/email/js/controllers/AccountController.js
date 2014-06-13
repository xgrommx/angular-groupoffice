'use strict';

angular.module('GO.email.controllers')

				.controller('AccountController', ['$scope', '$state', 'store', function($scope, $state, store) {

						$scope.pageTitle = 'E-mail';

						$scope.store = new store('email/account/store',
										{
											limit: 10
										});
					}]);