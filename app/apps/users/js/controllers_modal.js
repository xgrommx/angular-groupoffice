'use strict';

/* Controllers */

angular.module('GO.controllers')
				.controller('UsersController', ['$scope', '$http','utils', 'ngTableParams','$modal', function($scope, $http,utils, ngTableParams, $modal) {
						
						$scope.items = ['item1', 'item2', 'item3'];

						$scope.open = function (userId) {
							var modalInstance = $modal.open({
								templateUrl: 'apps/users/partials/user-detail.html',
								controller: "UserDetailController",
								resolve: {
									userId: function(){
										return userId;
									}
								}
							});
							
						};
						

						$scope.tableParams = new ngTableParams({
							page: 1, // show first page
							count: 10 // count per page
						}, {
							total: 0,//data.length, // length of data
							getData: function($defer, params) {
								
								
								$http.get(utils.url("users/user/store"),{
									params:{
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
								
								
//								$defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
							}
						});
					}]).
								
								
						controller('UserDetailController',['$scope', '$modalInstance','userId', '$http','$location', 'utils','alert',function($scope, $modalInstance, userId, $http, $location, utils,alert){
//								$scope.userId = $routeParams.userId;
								
//								console.log($scope.userId);
								
								$scope.test = function(){
									
									window.alert('test');
								};
								
								 $scope.ok = function () {
									$modalInstance.close($scope.selected.item);
								};

								$scope.cancel = function () {
									$modalInstance.dismiss('cancel');
								};
								
								$scope.update = function(user) {

									var url = utils.url('users/user/submit');


									$http.post(url, user)
													.success(function(data) {

														alert.clear();

														if (!data.success) {
															alert.set('warning', data.feedback);
														} else {
															$location.path('/apps/users');
														}
													});
								};
								
								$http.get(utils.url('users/user/load'),{params:{id:userId}}).success(function (data) {
										$scope.user = data.data;
								});
						}]);
				


