'use strict';


angular.module('GO.notes',['GO']).
				//Register the app
				config(['appsProvider',function(appsProvider) {												
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
											url: "/note/detail/{noteId:[0-9]*}",
											templateUrl: 'apps/notes/partials/note-detail.html',
											controller: 'NoteDetailController'
										})
										.state('notes.edit', {
											url: "/note/edit/{noteId:[0-9]*}",
											templateUrl: 'apps/notes/partials/note-edit.html',
											controller: 'NoteEditController'
										})
										.state('categories', {
											url: "/apps/notes/categories",
											templateUrl: 'apps/notes/partials/categories.html',
											controller: 'CategoryController'
										});
					}]);
				
angular.module('GO.notes.services', ['GO.notes']);
angular.module('GO.notes.controllers', ['GO.notes']);