'use strict';

angular.module('GO.services')
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
