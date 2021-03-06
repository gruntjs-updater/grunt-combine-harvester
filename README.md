# grunt-combine-harvester

[![Build Status](https://travis-ci.org/chrisjohnson1988/grunt-combine-harvester.png?branch=master)](https://travis-ci.org/chrisjohnson1988/grunt-combine-harvester)

> Scans through source code for "@requires" statements and produces a combined file which satisfies the dependencies

You may find this library useful for building custom versions of projects like [OpenLayers](https://github.com/openlayers/openlayers) for use in your own grunt project.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-combine-harvester --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-combine-harvester');
```

## The "combine_harvester" task

### Overview
In your project's Gruntfile, add a section named `combine_harvester` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  combine_harvester: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.regex
Type: `Regex`
Default value: `/@requires?:?\s+(\S*)\s*/g`

The regex to be used by the default harvester function to find dependencies in scanned files

#### options.root
Type: `String`
Default value: ``

A string value that is used to prefix the values of @requires statements, so that the resultant string can be used to locate the dependency relative to the cwd.

This must end in '/' if you want to use a directory as a root

#### options.harvester
Type: `function`
Default value: `default_harvester`

The function which performs the harvesting of source code, to return a list of fully qualified dependencies to harvest. 

### Usage Examples

#### Default Options
In this example, a root is specified. So if the `dependency1` file has the content `@requires dependency3`, the generated result would be the concatenation: 
`dependency3 + dependency1 + dependency2`

```js
grunt.initConfig({
  combine_harvester: {
    options: {
      root: 'src/'
    },
    files: {
      'dest/default_options': ['src/dependency1', 'src/dependency2'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
