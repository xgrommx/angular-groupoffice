'use strict';

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

					}]);