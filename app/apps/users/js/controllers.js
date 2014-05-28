'use strict';

/* Controllers */

angular.module('GO.controllers')
				.controller('UsersController', ['$scope', '$stateParams','$state', '$http', 'utils', 'ngTableParams', function($scope, $stateParams, $state, $http, utils, ngTableParams) {

						$scope.hideTable = function(){
							var isActive = $state.is('users');	
							return isActive;
						};
						
//						$scope.users ={
//							get : function (index, count, success){
//								
//								index--;
//								
//								if(index<0){
//									success([]);
//									return;
//								}
//								
//								$http.get(utils.url("users/user/store"), {
//									params: {
//										limit: count,
//										start: index
//									}
//								})
//								.success(function(data) {
//									// set new data
//									success(data.results);
//								});
//							}					
//
//						};

						$scope.tableParams = new ngTableParams({
							page: 1, // show first page
							count: 10 // count per page
						}, {
							total: 0, //data.length, // length of data
							getData: function($defer, params) {


								$http.get(utils.url("users/user/store"), {
									params: {
										limit: params.count(),
										start: (params.page() - 1) * params.count()
									}
								})
								.success(function(data) {
									// update table params
									params.total(data.total);
									// set new data
									$defer.resolve(data.results);
								});


							}
						});



					}]).
				controller('UserDetailController', ['crudFunctions','$scope', '$stateParams', '$http', '$state', 'utils', 'alert', function(crudFunctions,$scope, $stateParams, $http, $state, utils, alert) {
						
						
						crudFunctions($scope, 'users/user');		
						
						$scope.userId = $stateParams.userId;
						$scope.load($scope.userId);						

					}]);



