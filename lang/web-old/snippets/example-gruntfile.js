module.exports = function(grunt){
	grunt.initConfig({
		jshint: {
			files: ['example-gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		}
	})
	grunt.loadNpmTasks('grunt-contrib-jshint')
	grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.registerTask('default', ['jshint'])
}
// oh my god, i hate everything about it...
// .

