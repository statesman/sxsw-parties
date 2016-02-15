var fs = require("fs");

module.exports = function(grunt) {
  'use strict';

  // Project configuration
  grunt.initConfig({

    // Copy FontAwesome files to the fonts/ directory
    copy: {
      fonts: {
        src: 'bower_components/font-awesome/fonts/**',
        dest: 'public/fonts/',
        flatten: true,
        expand: true
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
        paths: ['bower_components/bootstrap/less']
      },
      prod: {
        options: {
          compress: true,
          cleancss: false
        },
        files: {
          "public/dist/style.css": "src/less/style.less"
        }
      }
    },


    // Run our JavaScript through JSHint
    jshint: {
      js: {
        src: ['src/js/**.js']
      }
    },
    // Use Uglify to bundle up a pym file for the home page
    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'public/dist/scripts.js': [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/js/button.js',
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/transition.js',
            'bower_components/bootstrap/js/tooltip.js',
            'bower_components/underscore/underscore-min.js',
            'bower_components/masonry/dist/masonry.pkgd.min.js',
            'bower_components/imagesloaded/imagesloaded.pkgd.min.js',
            'src/js/main.js'
          ]
        }
      }
    },

    // Lint our Bootstrap usage
    bootlint: {
      options: {
        relaxerror: ['W005']
      },
      files: 'public/**.php',
    },

    // Watch for changes in LESS and JavaScript files,
    // relint/retranspile when a file changes
    watch: {
      options: {
        livereload: true
      },
      markup: {
        files: ['public/*.php','public/includes/*.inc']
      },
      scripts: {
        files: ['src/js/*.js'],
        tasks: ['jshint', 'uglify']
      },
      styles: {
        files: ['src/less/**/*.less'],
        tasks: ['less']
      }
    },

    // stage path needs to be set
    ftpush: {
      stage: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/stage_aas/projects/sxsw/',
        exclusions: ['dist/tmp','Thumbs.db','.DS_Store'],
        simple: false,
        useList: false
      },

      // prod path will need to change
      prod: {
        auth: {
          host: 'host.coxmediagroup.com',
          port: 21,
          authKey: 'cmg'
        },
        src: 'public',
        dest: '/prod_aas/projects/sxsw/',
        exclusions: ['dist/tmp','Thumbs.db','.DS_Store'],
        simple: false,
        useList: false
      }
    },

    // be sure to set publishing paths
    slack: {
        options: {
          endpoint: fs.readFileSync('.slack', {encoding: 'utf8'}),
          channel: '#bakery',
          username: 'gruntbot',
          icon_url: 'http://vermilion1.github.io/presentations/grunt/images/grunt-logo.png'
        },
        stage: {
          text: 'Project published to stage: http://stage.host.coxmediagroup.com/aas/projects/sxsw/ {{message}}'
        },
        prod: {
          text: 'Project published to prod: http://projects.statesman.com/ {{message}}'
        }
    }

  });

  // Load the task plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-ftpush');
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-slack-hook');

  grunt.registerTask('default', ['copy', 'less', 'jshint','bootlint','uglify']);
  grunt.registerTask('stage', ['default','ftpush:stage','slack:stage']);
  grunt.registerTask('prod', ['default','ftpush:prod','slack:prod']);

};
