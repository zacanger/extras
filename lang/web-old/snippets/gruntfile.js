'use strict'

// Define wrapper function.
module.exports = function (grunt) {
  // Configuration
  // -------------
  grunt.initConfig({
    // Load application package data.
    pkg: grunt.file.readJSON('package.json'),

    // Define banner.
    banner: '/*! (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> */\n',

    // Configure JSHint task.
    jshint: {
      // Override default JSHint options.
      options: {
        // `grunt-contrib-jshint` >=v0.5.0 supports JSHint 2.x.
        jshintrc: './.jshintrc'
      },

      // List files to be linted.
      files: [ '*.js', 'src/**/*.js' ]
    },

    // Configure JSHint task with multiple targets.
    // jshint: {
    //   // Override default JSHint options.
    //   options: grunt.file.readJSON('./.jshintrc'),

    //   // Node: List files to be linted with specific options.
    //   node: {
    //     options: {
    //       node: true
    //     },
    //     files: {
    //       src: [ 'src/**/*.js' ]
    //     }
    //   },

    //   // jQuery: List files to be linted with specific options.
    //   jquery: {
    //     options: {
    //       globals: {
    //         jQuery: true
    //       }
    //     },
    //     files: {
    //       src: [ 'js/**/*.js' ]
    //     }
    //   }
    // },

    // Configure CoffeeScript linting task.
    coffeelint: {
      // Override default CoffeeLint options.
      options: grunt.file.readJSON('./.coffeelintrc'),

      // List files to be linted.
      files: [ '*.coffee', 'src/**/*.coffee' ]
    },

    // Compile CoffeeScript to JavaScript.
    coffee: {
      compile: {
        files: { 'build/app.js': 'src/app.coffee' }
      }
    },

    // Configure copy task.
    copy: {
      target: {
        files: [
          { expand: true, cwd: 'src', src: ['*.js'], dest: 'dest/' }
        ]
      }
    },

    // Configure concatenation task.
    concat: {
      options: { banner: '<%= banner %>', stripBanners: true },
      target: {
        files: [
          { src: ['src/**/*.js'], dest: 'dest/target.js' }
        ]
      }
    },

    // Configure minification task.
    uglify: {
      options: { banner: '<%= banner %>', stripBanners: true },
      target: {
        files: [
          { src: ['src/**/*.js'], dest: 'dest/target.js' }
        ]
      }
    },

    // Define watch task.
    watch: {
      jshint: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      }
    }
  })

  // Load tasks
  // ----------
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-coffeelint')

  // Custom task
  // -----------

  // Register tasks
  // --------------

  // Register an alias for JSHint task.
  grunt.registerTask('lint', ['jshint', 'coffeelint'])

  // Register default tasks.
  grunt.registerTask('default', ['lint'])
}
