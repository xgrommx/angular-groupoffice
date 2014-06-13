angular.module('GO.email.services')
				.factory('message',["$sce","$http", "utils", "model", function($sce, $http, utils, model) {

					model.prototype.toggleSeen = function() {
				
						var params = this.getBaseParams();
						
						params.flag="Seen";
						params.clear = this.attributes.seen;
						params.messages = angular.toJson([this.attributes.uid]);					
						
						var url = utils.url(this.routePrefix+"/setFlag", params);
						
						return $http.get(url).success(function(result) {								
								this.attributes.seen=!this.attributes.seen;
								
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