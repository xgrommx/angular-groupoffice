'use strict';

angular.module('GO.services')
	.factory('store', ['$http', 'utils', function($http, utils) {

						var store = function(url, loadParams) {
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
						store.prototype.load = function(params) {

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
						 * @returns store
						 */

						store.prototype.nextPage = function() {

							if (!this.shouldLoad())
								return false;

							return this.load({
								start: this.items.length
							});
						};

						/**
						 * Reload the store with current parameters
						 * 
						 * @returns store
						 */
						store.prototype.reload = function() {

							var itemCount = this.items.length;

							this.items = [];
							this.total = 0;
							this.init = false;
							return this.load({
								limit: itemCount
							});
						};


						store.prototype.shouldLoad = function() {
							var ret = !this.busy && (!this.init || this.items.length < this.total);

							return ret;
						};

						store.prototype.resetSearch = function() {
							this.query = '';
							this.reload();
						};



						store.prototype.searchListener = function($event) {
							if ($event.keyCode === 13) {
								this.reload();
							}
						};
						
						
						
						store.prototype.findSingleByAttribute = function(attr, id){
							
							for(var i=0;i<this.items.length;i++){
								
//								console.log(this.items[i]);
								if(this.items[i][attr] == id){
									return this.items[i];
								}
							};
							
							return false;
							
						};
						
						
						return store;

					}]);
