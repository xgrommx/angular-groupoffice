module.exports = function (grunt) {    
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        clean: ["dist", '.tmp'],
 
        copy: {
            main: {
                expand: true,
                cwd: 'app/',
                src: ['**', '!js/**', '!lib/**', '!**/*.css'],
                dest: 'dist/'
            },
            shims: {
                expand: true,
                cwd: 'app/lib/webshim/shims',
                src: ['**'],
                dest: 'dist/js/shims'
            }
        },
 
        rev: {
            files: {
                src: ['dist/**/*.{js,css}', '!dist/js/shims/**']
            }
        },
 
        useminPrepare: {
            html: 'app/index.html'
        },
 
        usemin: {
            html: ['dist/index.html']
        },
				
				// ngmin tries to make the code safe for minification automatically by
				// using the Angular long form for dependency injection. It doesn't work on
				// things like resolve or inject so those have to be done manually.
				ngmin: {
					dist: {
						files: [{
							expand: true,
							cwd: '.tmp/concat/scripts',
							src: '*.js',
							dest: '.tmp/concat/scripts'
						}]
					}
				},
				
				htmlmin: {
					dist: {
						options: {
							collapseWhitespace: true,
							conservativeCollapse: true,
							collapseBooleanAttributes: true,
							removeCommentsFromCDATA: true,
							removeOptionalTags: true
						},
						files: [{
							expand: true,
							cwd: 'dist',
							src: ['**/*.html'],
							dest: 'dist'
						}]
					}
				},

 
        uglify: {
            options: {
                report: 'min',
                mangle: false
            }
        },
				
				
				fileblocks: {
					options:{
						removeFiles:true,
						prefix:'../'
					},
					dev: {
						src: 'app/index.html',
						blocks: {
								'styles': { src: 'app/css/**/*.css' },
								
								'appsstyles': { src: 'app/apps/**/*.css' },
								'core': { src: 'app/js/**/*.js' },
								'apps': { src: 'app/apps/**/*.js' }
						}
					}
        },
				
				sass: {
					dev: {
						files: [{
							'app/css/app.css': 'app/scss/app.scss',
							'app/apps/email/css/app.css': 'app/apps/email/scss/app.scss',
						}]
					}
				},
				watch: {
            blocks: {
                files: ['app/**/*.js'],
                tasks: ['fileblocks:dev']
            },
						sass: {
							files: ['app/**/*.scss'],
							tasks: 'sass'
						}
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
		grunt.loadNpmTasks('grunt-contrib-watch');
		
		grunt.loadNpmTasks('grunt-contrib-htmlmin');
		
		grunt.loadNpmTasks('grunt-ngmin');
		
		grunt.loadNpmTasks('grunt-file-blocks');
		grunt.loadNpmTasks('grunt-contrib-sass');
 
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'copy', 
				'useminPrepare', 
				'concat', 
				'ngmin',
				'uglify', 
				'cssmin', 
				'rev', 
				'usemin',
				'htmlmin'
    ]);
};
