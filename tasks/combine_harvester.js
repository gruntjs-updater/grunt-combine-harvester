/*
 * grunt-combine-harvester
 * https://github.com/chrisjohnson1988/grunt-combine-harvester
 *
 * Copyright (c) 2013 Christopher Johnson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  /*
  Define a relaxed toposort which does not check for (or worry about) cyclic dependencies.
  */
  function toposort(dependencies) {
    var sorted=[], visited={};

    function visit(key) {
      if(!visited[key]) {
        visited[key] = true;
        if(!dependencies[key]) {
          throw new Error('A dependency is given which is not defined' + key);
        }
        dependencies[key].dependencies.forEach(visit);
        sorted.push(key);
      }
    }

    for(var key in dependencies) { visit(key); }
    return sorted;
  }

  grunt.registerMultiTask('combine_harvester', 'Scans through source code for "@requires" statements and produces a combined file which satisfies the dependencies', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      regex: /@requires?:?\s+(\S*)\s*/g,
      harvester: function(code) {
        var root = this.root;
        var matches = code.match(this.regex);

        if(!matches) { return []; }

        return matches.map(function(importLine) { 
          return root + importLine.trim().split(' ').pop();
        });
      },
      root: ''
    });
   

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var dependencyTree = {};

      function findDependencies(filename) {
        var source;
        if(!dependencyTree[filename]) {
          source = grunt.file.read(filename);
          dependencyTree[filename] = {
            source: source, 
            dependencies: options.harvester(source, filename)
          };

          //recurse tree
          dependencyTree[filename].dependencies.forEach(findDependencies);
        }
      } 

      f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).forEach(findDependencies);

      // Put the files in the correct order
      var orderedDependencies = toposort(dependencyTree);

      // Concat specified files.
      var src = orderedDependencies.map(function(file) {
        grunt.log.writeln('Adding ' + file);
        //Get the source code
        return dependencyTree[file].source;
      }).join(grunt.util.normalizelf('\n'));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });
};