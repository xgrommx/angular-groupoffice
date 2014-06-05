'use strict';


/* Controllers */

angular.module('GO.controllers', ['GO'])


				.controller('LoginController', ['$scope', '$http', '$state', 'utils', function($scope, $http, $state, utils) {
						$scope.master = $scope.user = {username: localStorage.username, password: '', rememberUsername: localStorage.rememberUsername};

						$scope.config = {url: utils.baseUrl};

						$scope.login = function(user) {

							//We set the base Group-Office URL given from the form.
							utils.setBaseUrl($scope.config.url);

							var url = utils.url('auth/login');

							$http.post(url, user)
											.success(function(data, status, header) {


												if (!data.success) {
													bootbox.alert(data.feedback);
												} else {
													
													if($scope.user.rememberUsername){
														localStorage.username=$scope.user.username;
														localStorage.rememberUsername=true;
													}else
													{
														localStorage.rememberUsername=false;
													}

													//Set the security token returned by Group-Office that must be used in all requests to prevent
													//Cross site scripting attacks
													utils.setSecurityToken(data.security_token);

													$state.go('start');
												}
											});


						};





						$scope.reset = function() {
							$scope.user = angular.copy($scope.master);
						};

//						$scope.reset();
					}])
				.controller('StartController', ['$scope','$state', 'apps', '$http', 'utils', function($scope, $state, $apps, $http, utils) {

						$scope.apps = $apps;


						$scope.logout = function() {
							var url = utils.url('auth/logout');

							$http.post(url,{ajax:1})
											.success(function(data, status, header) {
												$state.go('login');												
											});
						};


					}])
				.controller('BodyController', ['$scope', 'httpRequestTracker', function($scope, httpRequestTracker) {

						$scope.hasPendingRequests = function() {
							return httpRequestTracker.hasPendingRequests();
						};


					}])
				.controller('NavBarCtrl', ['$scope', function($scope){
						
							$scope.isCollapsed = true;
							
							$scope.toggle = function(){
								console.log($scope.isCollapsed); 
								$scope.isCollapsed = !$scope.isCollapsed;
							}
						}]);


