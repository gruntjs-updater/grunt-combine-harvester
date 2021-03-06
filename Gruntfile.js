/*
 * grunt-combine-harvester
 * https://github.com/chrisjohnson1988/grunt-combine-harvester
 *
 * Copyright (c) 2013 Christopher Johnson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    combine_harvester: {
      default_options: {
        options: {
          root: 'test/fixtures/'
        },
        files: {
          'tmp/default_options': ['test/fixtures/req1.js', 'test/fixtures/req2.js'],
        },
      },
      custom_regex: {
        options: {
          root: 'test/fixtures/',
          regex: /@dependency?:?\s+(\S*)\s*/g,
        },
        files: {
          'tmp/custom_regex': ['test/fixtures/dep1.js', 'test/fixtures/dep2.js'],
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'combine_harvester', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
