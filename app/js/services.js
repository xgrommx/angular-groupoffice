'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GO.services', []).
				value('version', '0.1').
				factory('alert', ['$rootScope', function($rootScope) {
						var alertService;
						$rootScope.alerts = [];
						return alertService = {
							set: function(type, msg) {
								this.clear();
								this.add(type, msg);
							},
							add: function(type, msg) {

								return $rootScope.alerts.push({
									type: type,
									msg: msg,
									close: function() {
										return alertService.closeAlert(this);
									}
								});
							},
							closeAlert: function(alert) {
								return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
							},
							closeAlertIdx: function(index) {
								return $rootScope.alerts.splice(index, 1);
							},
							clear: function() {
								$rootScope.alerts = [];
							}
						};
					}
				]).
				factory('utils', [function() {
						
						//Use sessionStorage from browser so it survives browser reloads						
						return {
							baseUrl: sessionStorage.baseUrl,
							securityToken: sessionStorage.securityToken,
							
							setBaseUrl : function(url){
								this.baseUrl = sessionStorage.baseUrl = url.replace(/^\s+|\s+$/g, '')+'/';
							},
							setSecurityToken : function(token){
								this.securityToken = sessionStorage.securityToken = token;
							},
							url: function(relativeUrl, params) {
								if (!relativeUrl && !params)
									return this.baseUrl;
								var url = this.baseUrl + "index.php?r=" + relativeUrl + "&security_token=" + this.securityToken;
								if (params) {
									for (var name in params) {
										url += "&" + name + "=" + encodeURIComponent(params[name]);
									}
								}
								return url;
							}
						};
					}]).
				factory('apps', ['$rootScope', function($rootScope) {
						$rootScope.apps = [];

						return {
							add: function(name, title) {
								return $rootScope.apps.push({
									name: name,
									title: title
								});
							}
						};
					}])
				.factory('httpRequestTracker', ['$http', function($http) {

						var httpRequestTracker = {};
						httpRequestTracker.hasPendingRequests = function() {
							return $http.pendingRequests.length > 0;
						};

						return httpRequestTracker;
					}])
				
				.factory('listFunctions', ['$http','utils',function($http, utils){
					return function ($scope, url, loadParams){
						
						loadParams = loadParams || {};
						
						
						$scope.listItems=[];
						
						
						$scope.reload = function(){
							$scope.listItems=[];
							$scope.loadMore();
						};					
						
						$scope.loadMore = function(){
							
							
							var params = {
										query: $scope.searchModel.query,
										limit: 20,
										start: $scope.listItems.length
									};
									
							angular.extend(params, loadParams);
							
							
							$http.get(utils.url(url), {
									params: params
								})
								.success(function(data) {
									for(var i = 0; i<data.results.length;i++){
										$scope.listItems.push(data.results[i]);
									};
								});
						};						
			
						
						$scope.searchModel = {
							query:''
						};
						
						$scope.search = function($event){							
							if($event.keyCode===13){
								$scope.reload();
							}
						};
					};				
				}])
				
				.factory('crudFunctions', ['$stateParams', '$http', '$state', 'utils', 'alert', function($stateParams, $http, $state, utils, alert) {


						return function($scope, modelName, routePrefix) {
							
							

							$scope.delete = function(model, name) {
								if (confirm("Are you sure you want to delete '" + name + "'?")) {
									
									var url = utils.url(routePrefix + '/delete', {id: $scope.modelId}) ;
									$http.post(url)
												.success(function(result) {											

													if (!result.success) {
														alert.set('warning', result.feedback);
													} else {
														$scope.reload();
														$state.go('^');
													}
												});

								}
							};							
							

							$scope.save = function(data) {

								var url = $scope.modelId>0 ? utils.url(routePrefix + '/update', {id: $scope.modelId}) : utils.url(routePrefix + '/create');

								var params = {};

								params[modelName] = data;

								$http.post(url, params)
												.success(function(result) {

													alert.clear();

													if (!result.success) {
														
														for(var i=0;i<result.errors.length;i++){
															alert.set('warning', result.errors[i]);
														}
													} else {
														$scope.reload();
														$state.go('^');
													}
												});
							};

							$scope.load = function(modelId) {

								var url = modelId > 0 ? utils.url(routePrefix + '/update', {id: modelId}) : utils.url(routePrefix + '/create');

								$http.get(url).success(function(result) {
									$scope.model = result.data[modelName].attributes;
									
									$scope.modelId = modelId;
								});
							};
						};

					}]);
