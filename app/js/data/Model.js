'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('GO.services')
	.factory('Model', ['$http', 'msg', 'utils', 'translate', function($http, msg, utils, translate) {


						var Model = function(modelName, routePrefix) {
							this.modelName = modelName;
							this.routePrefix = routePrefix;

							this.attributes = null;
							
							this.customfields = null;
							
							
							this.updateAction = 'update';
							this.createAction = 'create';
							
							this.idAttribute = 'id';							
							
							this.baseParams = {};
						};


						Model.prototype.afterSave = function(model, result) {
						};

						Model.prototype.afterDelete = function(model, result) {
						};
						
						Model.prototype.afterLoad = function(model, result) {
						};
						
						Model.prototype.getBaseParams = function(){
							var params = angular.copy(this.baseParams);
							
							if(this.attributes && this.attributes[this.idAttribute]){
								params[this.idAttribute]=this.attributes[this.idAttribute];
							}
							
							return params;
						};


						Model.prototype.delete = function(name) {
							var confirm = msg.confirm(translate.t("Are you sure you want to delete '{name}'?").replace('{name}',name));

							confirm.result.then(function(){
								
									

									var url = utils.url(this.routePrefix + '/delete', this.getBaseParams());
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

							var url = this.attributes[this.idAttribute] > 0 ? utils.url(this.routePrefix + '/'+this.updateAction, this.getBaseParams()) : utils.url(this.routePrefix + '/'+this.loadAction);

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

							params = this.getBaseParams();	

							if (id)
								params[this.idAttribute] = id;

							var url = id > 0 ? utils.url(this.routePrefix + '/'+this.updateAction, params) : utils.url(this.routePrefix + '/'+this.createAction, params);

							return $http.get(url).success(function(result) {
								if (result.data)
									this.attributes = result.data[this.modelName].attributes;
								
									this.customfields = result.data[this.modelName].customfields;
									
									this.afterLoad.call(this, [this, result]);
							}.bind(this));

						};
						return Model;

					}]);