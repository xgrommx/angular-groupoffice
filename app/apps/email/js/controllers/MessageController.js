'use strict';

angular.module('GO.email.controllers')
				.controller('MessageController', ['$sce', 'message', '$scope', '$state', '$stateParams','loadNote', function($sce, message, $scope, $state, $stateParams,  loadNote) {
						$scope.message = new message();
						$scope.message.baseParams = {account_id:$stateParams.accountId, mailbox: $stateParams.mailbox};
						
						
						$scope.message.afterDelete = function(note, result) {
							$scope.store.reload();
							$state.go('messages');
						};						

						$scope.toggleSeen = function(){
							
							//set the seen flag (mark as read). When done then update the store of the list
							$scope.message.toggleSeen().then(function(data){								
								var storeMessage = $scope.store.findSingleByAttribute("uid", $scope.message.attributes.uid);
								storeMessage.seen = $scope.message.attributes.seen;
							});
						};
						
						$scope.message.load($stateParams.uid);

					}]);
				

