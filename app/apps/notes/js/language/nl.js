angular.module('GO.notes')
				.config(['translateProvider', function(translateProvider) {
						translateProvider.addTranslations('nl', {
							'Notes': 'Notities',
							'Enter password to decrypt' : 'Voer wachtwoord in om te ontgrendelen', 
							'Password required' : 'Wachtwoord vereist', 
							'You must enter a password to read this note': 'U moet een wachtwoord invoeren om deze notitie te lezen'
						});
					}
				]);