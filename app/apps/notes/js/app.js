'use strict';


angular.module('GO').
				//Register the app e-mail
				config(['appsProvider', function(appsProvider) {
						appsProvider.addApp('notes', 'Notes');
					}]).
				
				config(['$stateProvider', function($stateProvider) {

						//
						// Now set up the states
						$stateProvider
										.state('notes', {
											url: "/apps/notes",
											templateUrl: 'apps/notes/partials/main.html',
											controller: 'NotesController'
										})
										.state('notes.detail', {
											url: "/detail/{noteId:[0-9]*}",
											templateUrl: 'apps/notes/partials/note-detail.html',
											controller: 'NoteDetailController'
										});
					}]);