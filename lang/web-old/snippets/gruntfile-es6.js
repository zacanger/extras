// npm i -D babelify grunt grunt-browserify grunt-contrib-watch

module.exports = function(grunt){
  grunt.initConfig({
    browserify : {
      dist : {
        options : {
          transform : [
            ['babelify', {
              loose : 'all'
            }]
          ]
        }
      , files : {
          './dist/dist.js', ['./src/stuff.js']
        }
      }
    }
  , watch : {
      scripts : {
        files : ['./src/*.js']
      , tasks : ['browserify']
      }
    }
  })

  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch'])
  grunt.registerTask('build', ['browserify'])
}

