'use strict';

angular.module('GO.email.controllers')
				.controller('MessageController', ['$sce', 'message', '$scope', '$state', '$stateParams','loadNote', function($sce, message, $scope, $state, $stateParams,  loadNote) {
						$scope.message = new message();
						$scope.message.baseParams = {account_id:$stateParams.accountId, mailbox: $stateParams.mailbox};
						
						
						$scope.message.afterDelete = function(message, result) {
							$scope.store.remove($scope.store.findIndexByAttribute("uid", $scope.message.attributes.uid));
							$state.go('messages');
						};						

						$scope.toggleFlag = function(flag){
							
							//set the seen flag (mark as read). When done then update the store of the list
							$scope.message.toggleFlag(flag).then(function(data){								
								var storeMessage = $scope.store.findSingleByAttribute("uid", $scope.message.attributes.uid);
								
								
								storeMessage[flag] = $scope.message.attributes[flag];
								console.log(storeMessage);
							});
						};
						
						$scope.message.load($stateParams.uid);

					}]);
				

