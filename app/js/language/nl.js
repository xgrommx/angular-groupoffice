angular.module('GO').config(['$translateProvider', function($translateProvider) {
		
		$translateProvider.translations('nl', {
			'Edit': 'Bewerken',
			'Delete': 'Verwijderen',
			'Cancel': 'Annuleren',
			'Save': 'Opslaan',
			'Back': 'Terug',
			'OK' : 'OK',
			'Search': 'Zoeken',
			'Login' : 'Inloggen',
			'Username' : 'Gebruikersnaam',
			'Password' : 'Wachtwoord',
			'Remember username' : 'Gebruikersnaam onthouden',
			'Login to GroupOffice' : 'Inloggen bij GroupOffice',
			'Access denied': 'Geen toegang'
		});

		
	}]);