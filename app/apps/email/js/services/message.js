angular.module('GO.email.services')
				.factory('message',["$sce","$http", "utils", "model", function($sce, $http, utils, model) {

					model.prototype.toggleFlag = function(flag) {
				
						var params = this.getBaseParams();
						
						params.flag=flag;
						params.clear = this.attributes[flag];
						params.messages = angular.toJson([this.attributes.uid]);					
						
						var url = utils.url(this.routePrefix+"/setFlag", params);
						
						return $http.get(url).success(function(result) {								
								this.attributes[flag]=!this.attributes[flag];
								
							}.bind(this));
					};
					
				
					
					model.prototype.init = function(){
						
						this.modelName = 'message';
						this.routePrefix = 'email/message';

						this.updateAction = 'get';
						this.idAttribute='uid';
						
						this.afterLoad=function(model, result){
							this.attributes.htmlbody = $sce.trustAsHtml(this.attributes.htmlbody);
						};
					};					

					return model;
				}]);