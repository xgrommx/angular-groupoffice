angular.module('GO.notes')
				.config(['$translateProvider', function($translateProvider) {
						$translateProvider.translations('en', {
							'notes.title': 'Notes'							
						});
					}
				]);