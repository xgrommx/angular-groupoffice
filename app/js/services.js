'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GO.services', []).
				value('version', '0.1').
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

					}])

				.factory('Model', ['$http', 'msg', 'utils', 'translate', function($http, msg, utils, translate) {


						var Model = function(modelName, routePrefix) {
							this.modelName = modelName;
							this.routePrefix = routePrefix;

							this.attributes = null;
						};


						Model.prototype.afterSave = function(model, result) {
						};

						Model.prototype.afterDelete = function(model, result) {
						};


						Model.prototype.delete = function(name) {
							var confirm = msg.confirm(translate.t("Are you sure you want to delete '{name}'?").replace('{name}',name));

							confirm.result.then(function(){

									var url = utils.url(this.routePrefix + '/delete', {id: this.attributes.id});
									return $http.post(url)
													.success(function(result) {

														if (!result.success) {
															msg.alert(result.feedback);
														} else {
															this.afterDelete.call(this, [this, result]);
														}
													}.bind(this));
								}.bind(this));
							};
						


						Model.prototype.save = function() {

							var url = this.attributes.id > 0 ? utils.url(this.routePrefix + '/update', {id: this.attributes.id}) : utils.url(this.routePrefix + '/create');

							var params = {};

							params[this.modelName] = this.attributes;

							return $http.post(url, params)
											.success(function(result) {

												if (!result.success) {

													for (var i = 0; i < result.errors.length; i++) {
														msg.alert(result.errors[i]);
													}
												} else {

													this.attributes.id = result.id;

													this.afterSave.call(this, [this, result]);
												}
											}.bind(this));
						};

						Model.prototype.load = function(id, params) {

							params = params || {};

							if (id)
								params.id = id;

							var url = id > 0 ? utils.url(this.routePrefix + '/update', params) : utils.url(this.routePrefix + '/create', params);

							return $http.get(url).success(function(result) {
								if (result.data)
									this.attributes = result.data[this.modelName].attributes;
							}.bind(this));

						};
						return Model;

					}]);
