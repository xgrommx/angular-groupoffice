'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GO.services').
				service('msg', ['$modal', function($modal) {

						var msg = {
							modalInstanceCtrl: function($scope, $modalInstance, config) {
								
								

								$scope.config = config;
								
								$scope.form={input:""};

								$scope.ok = function() {
									$modalInstance.close($scope.form.input);
								};
								
								$scope.cancel = function () {
									$modalInstance.dismiss('cancel');
								};
							},
							alert: function(text, title, glyphicon) {

								
								
								var config = {
									text:text,
									title:title,
									glyphicon:glyphicon || "warning-sign"
								};

								return $modal.open({
									windowClass: 'go-modal-alert',
									templateUrl: 'partials/modal/alert.html',
									controller: this.modalInstanceCtrl,
									size: 'sm',
									resolve: {
										config: function() {
											return config;
										}
									}
								});
							},
							
							confirm :  function(text, title) {
								var config = {
									text:text,
									title:title									
								};
								
								var confirm = $modal.open({
									windowClass: 'go-modal-alert',
									templateUrl: 'partials/modal/confirm.html',
									controller: this.modalInstanceCtrl,
									size: 'sm',
									resolve: {										
										config: function() {
											return config;
										}
									}
								});
								
								return confirm;
							},
							
							/**
							 * var prompt = msg.prompt("Text here", "Title");
							 * prompt.result.then(function (input) {
							 *    console.log(input);
							 * }, function () {
							 *    $log.info('Modal dismissed at: ' + new Date());
							 *  });
							 * 
							 * @param {type} text
							 * @param {type} title
							 * @param {type} inputType
							 * @returns {unresolved}
							 */
							prompt: function(text, title, inputType) {
								
								inputType = inputType || 'text';

								var config = {
									text:text,
									title:title,
									inputType:inputType || "text"
								};
								
								var prompt = $modal.open({
									windowClass: 'go-modal-alert',
									templateUrl: 'partials/modal/prompt.html',
									controller: this.modalInstanceCtrl,
									size: 'sm',
									resolve: {										
										config: function() {
											return config;
										}
									}
								});
								
							
								
								
								return prompt;
							}
						};

						return msg;

					}]).
				service('utils', [function() {

						var utils = function() {
							this.baseUrl = localStorage.baseUrl;

							//Use sessionStorage from browser so it survives browser reloads						
							this.securityToken = sessionStorage.securityToken;
						};

						utils.prototype.setBaseUrl = function(url) {

							//Use localStorage to remember it for the user
							this.baseUrl = localStorage.baseUrl = url.replace(/^\s+|[\s\/]+$/g, '') + '/';
						};


						utils.prototype.setSecurityToken = function(token) {
							this.securityToken = sessionStorage.securityToken = token;
						};

						utils.prototype.url = function(relativeUrl, params) {
							if (!relativeUrl && !params)
								return this.baseUrl;
							var url = this.baseUrl + "index.php?r=" + relativeUrl + "&security_token=" + this.securityToken;
							if (params) {
								for (var name in params) {
									url += "&" + name + "=" + encodeURIComponent(params[name]);
								}
							}
							return url;
						};

						return new utils;
					}])
//				factory('apps', ['$rootScope', function($rootScope) {
//						$rootScope.apps = [];
//
//						return {
//							add: function(name, title) {
//								return $rootScope.apps.push({
//									name: name,
//									title: title
//								});
//							}
//						};
//					}])
				.factory('httpRequestTracker', ['$http', function($http) {

						var httpRequestTracker = {};
						httpRequestTracker.hasPendingRequests = function() {
							return $http.pendingRequests.length > 0;
						};

						return httpRequestTracker;
					}])

				.factory('Store', ['$http', 'utils', function($http, utils) {

						var Store = function(url, loadParams) {
							this.items = [];
							this.busy = false;
							this.total = 0;

							this.init = false;

							this.query = '';
							this.url = url;

							this.loadParams = loadParams;
						};


						/**
						 * Query the server
						 * 
						 * @param object params
						 * @returns array
						 */
						Store.prototype.load = function(params) {

							this.busy = true;


							params = params || {};


							var defaultParams = {
								query: this.query,
								limit: 10,
								start: 0
							};

							angular.extend(defaultParams, this.loadParams, params);


							return $http.get(utils.url(this.url), {
								params: defaultParams
							})
											.success(function(data) {

												this.total = data.total;

												for (var i = 0; i < data.results.length; i++) {
													this.items.push(data.results[i]);
												}
												;

												this.busy = false;
												this.init = true;

											}.bind(this));
						};

						/**
						 * Query the server for the next page of results
						 * 
						 * @returns Store
						 */

						Store.prototype.nextPage = function() {

							if (!this.shouldLoad())
								return false;

							return this.load({
								start: this.items.length
							});
						};

						/**
						 * Reload the store with current parameters
						 * 
						 * @returns Store
						 */
						Store.prototype.reload = function() {

							var itemCount = this.items.length;

							this.items = [];
							this.total = 0;
							this.init = false;
							return this.load({
								limit: itemCount
							});
						};


						Store.prototype.shouldLoad = function() {
							var ret = !this.busy && (!this.init || this.items.length < this.total);

							return ret;
						};

						Store.prototype.resetSearch = function() {
							this.query = '';
							this.reload();
						};



						Store.prototype.searchListener = function($event) {
							if ($event.keyCode === 13) {
								this.reload();
							}
						};
						return Store;

					}]);

				
