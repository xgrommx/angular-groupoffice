'use strict';

/* Controllers */

angular.module('GO.notes.services')
				.service('loadNote',['$state','translate', 'msg', function($state, translate, msg){
					var loadNote = function($scope, id, params){
							
							params = params || {};
							
							var promise = $scope.note.load(id, params);
							
							promise.then(function(result){
								if(result.data.data && result.data.data.note.attributes.encrypted){
									var prompt =msg.prompt(translate.t("Enter password to decrypt"), translate.t("Password required"), "password");
									
									prompt.result.then(function(password) {
										var nextPromise = loadNote($scope, id, {password: password});

										nextPromise.then(function(result){
											if(!result.data.success){
												var alert = msg.alert(result.data.feedback, "Error");

												alert.result.then(function(){
													loadNote(id);
												});
											}
										});										
									}, function(reason){
										msg.alert(translate.t('You must enter a password to read this note'), translate.t('Access denied'));
										$state.go('notes');
									});											

								}
							});
							
							return promise;
						};
						
						return loadNote;
				}]);
