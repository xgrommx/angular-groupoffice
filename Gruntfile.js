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
								'core': { src: 'app/js/**/*.js' },
								'apps': { src: 'app/apps/**/*.js' }
						}
					}
        },
				watch: {
            blocks: {
                files: ['app/**/*.js'],
                tasks: ['fileblocks:dev']
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
		
		grunt.loadNpmTasks('grunt-file-blocks');
 
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin'
    ]);
};
