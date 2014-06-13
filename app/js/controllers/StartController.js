'use strict';

angular.module('GO.controllers')

				.controller('StartController', ['$scope','$state', 'apps', '$http', 'utils', function($scope, $state, apps, $http, utils) {
						
						$scope.apps = apps;


						$scope.logout = function() {
							var url = utils.url('auth/logout');

							$http.post(url,{ajax:1})
											.success(function(data, status, header) {
												$state.go('login');												
											});
						};


					}]);