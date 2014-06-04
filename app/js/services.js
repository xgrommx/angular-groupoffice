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

						Store.prototype.nextPage = function(params) {
							if (!this.shouldLoad())
								return;

							this.busy = true;


							params = params || {};


							var defaultParams = {
								query: this.query,
								limit: 10,
								start: this.items.length
							};

							angular.extend(defaultParams, this.loadParams, params);


							$http.get(utils.url(this.url), {
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


						Store.prototype.reload = function() {
							
							var itemCount = this.items.length;
							
							this.items = [];
							this.total = 0;
							this.init = false;
							this.nextPage({
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

						Store.prototype.search = function($event) {
							
						
							if ($event.keyCode === 13) {
								this.reload();
							}
						};
						return Store;

					}])

				.factory('Model', ['$http', 'utils', 'alert', function($http, utils, alert) {


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
							if (confirm("Are you sure you want to delete '" + name + "'?")) {

								var url = utils.url(this.routePrefix + '/delete', {id: this.attributes.id});
								return $http.post(url)
												.success(function(result) {

													if (!result.success) {
														alert.set('warning', result.feedback);
													} else {
														this.afterDelete.call(this, [this, result]);
													}
												}.bind(this));

							}
						};


						Model.prototype.save = function() {

							var url = this.attributes.id > 0 ? utils.url(this.routePrefix + '/update', {id: this.attributes.id}) : utils.url(this.routePrefix + '/create');

							var params = {};

							params[this.modelName] = this.attributes;

							$http.post(url, params)
											.success(function(result) {

												alert.clear();

												if (!result.success) {

													for (var i = 0; i < result.errors.length; i++) {
														alert.set('warning', result.errors[i]);
													}
												} else {

													this.attributes.id = result.id;

													this.afterSave.call(this, [this, result]);
												}
											}.bind(this));
						};

						Model.prototype.load = function(id) {

							var url = id > 0 ? utils.url(this.routePrefix + '/update', {id: id}) : utils.url(this.routePrefix + '/create');

							$http.get(url).success(function(result) {
								this.attributes = result.data[this.modelName].attributes;
							}.bind(this));
						};
						return Model;

					}]);
