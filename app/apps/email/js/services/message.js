angular.module('GO.email.services')
				.factory('message',["$sce","$http", "utils", "model", function($sce, $http, utils, model) {
						
						
					function message() {
						 model.call(this);
					}
					
					message.prototype = Object.create(model.prototype); // inherit
					
					message.prototype.toggleFlag = function(flag) {
				
						var params = this.getBaseParams();
						
						params.flag=flag;
						params.clear = this.attributes[flag];
						params.messages = angular.toJson([this.attributes.uid]);					
						
						var url = utils.url(this.routePrefix+"/setFlag", params);
						
						return $http.get(url).success(function(result) {								
								this.attributes[flag]=!this.attributes[flag];
								
							}.bind(this));
					};
					
				
					
					message.prototype.init = function(){
						
						this.modelName = 'message';
						this.routePrefix = 'email/message';

						this.updateAction = 'get';
						this.idAttribute='uid';
						
						this.afterLoad=function(model, result){
							this.attributes.htmlbody = $sce.trustAsHtml(this.attributes.htmlbody);
						};
					};					

					return message;
				}]);