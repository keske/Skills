'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jquery: {
      exclude: ['ajax'],
      version: '1.8.3',
      dest: 'app/src/js/vendor/jquery.js',
      minify: true
    },

    svgsprite: {
      spriteSass: {
        src: ['app/src/svg'],
        dest: 'app/src/css',
        options: {
          render: {
            css: false,
            scss: {
              dest: 'ui/sprite.scss'
            }
          },
          maxwidth: 50,
          maxheight: 50,
          keep: false,
          dims: true
        }
      }
    },

    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }, {
          removeUselessStrokeAndFill: false
        }]
      },
      dist: {
        files: {
          'app/dest/assets/css/svg/sprite.svg': 'app/src/css/svg/sprite.svg',
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'app/dest/assets/css/app.min.css': 'app/src/css/main.scss',
        }
      }
    },

    // Shell script for counting how many samples in folders
    // and generate JSON files with data
    shell: {
      options: {
        stderr: false
      },
      target: {
        command: 'app/src/count.sh'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      dist: {
        files: {
          'app/dest/assets/js/app.min.js': [
            // vendor
            'app/src/js/vendor/jquery.js',
            'app/src/js/vendor/fastclick.js',
            'app/src/js/vendor/jgestures.js',
            'app/src/js/vendor/jquery.mobile-1.4.5.js',

            // helpers
            'app/src/js/helpers/activate-elem.js',
            'app/src/js/helpers/fastclick.js',
            'app/src/js/helpers/keyboard.js',
            'app/src/js/helpers/show-after-load.js',

            // app
            'app/src/js/sampler/sample.js',
            'app/src/js/sampler/pads.js',
            'app/src/js/ui.js',

            'app/src/js/sampler/game.js',
            'app/src/js/menu.js',
            'app/src/js/presets.js',

            // effects
            'app/src/js/effects/ui.js',
          ],

          // JSON data
          'app/dest/assets/sounds/total.min.json': 'app/src/jstotal.json',
          'iOS App/platforms/ios/www/assets/sounds/total.min.json': 'app/src/jstotal.json',
        }
      }
    },

    jslint: {
      client: {
        src: [
          'src/js/*.js'
        ],
        directives: {
          browser: true,
          predef: [
            'global', 'jQuery', '$', 'data', 'sample', 'samples', 'game', 'FastClick', 'ui',
            'webkitAudioContext', 'pads'
          ]
        },
        options: {
          junit: 'out/client-junit.xml'
        }
      }
    },

    assemble: {
      options: {
        assets: 'assets',
        data: ['app/src/data/en.yml'],
        partials: ['app/src/templates/partials/*.html'],
      },
      site: {
        src: ['app/src/templates/index.hbs'],
        dest: 'app/src/templates/index.html'
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'app/dest/index.html': 'app/src/templates/index.html'
        }
      },
    },

    copy: {
      // styles
      css: {
        src: 'app/dest/assets/css/app.min.css',
        dest: 'iOS App/platforms/ios/www/assets/css/app.min.css',
      },
      cssmap: {
        src: 'app/dest/assets/css/app.min.css',
        dest: 'iOS App/platforms/ios/www/assets/css/app.min.css.map',
      },
      // svg
      svg: {
        src: 'app/dest/assets/css/svg/sprite.svg',
        dest: 'iOS App/platforms/ios/www/assets/css/svg/sprite.svg',
      },
      svgs: {
        src: 'app/src/svg/',
        dest: 'iOS App/platforms/ios/www/assets/css/svg/',
      },
      // png
      png: {
        src: 'app/dest/assets/images',
        dest: 'iOS App/platforms/ios/www/assets/images/',
      },
      // scripts
      js: {
        src: 'app/dest/assets/js/app.min.js',
        dest: 'iOS App/platforms/ios/www/assets/js/app.min.js',
      },
      totalJSON: {
        src: 'app/dest/assets/sounds/total.min.json',
        dest: 'iOS App/platforms/ios/www/assets/sounds/total.min.json',
      },
      // samples
      kick: {
        expand: true,
        cwd: 'app/dest/assets/sounds/kick',
        src: '**',
        dest: 'iOS App/platforms/ios/www/assets/sounds/kick/',
        flatten: true,
        filter: 'isFile',
      },
      hat: {
        expand: true,
        cwd: 'app/dest/assets/sounds/hat',
        src: '**',
        dest: 'iOS App/platforms/ios/www/assets/sounds/hat/',
        flatten: true,
        filter: 'isFile',
      },
      snare: {
        expand: true,
        cwd: 'app/dest/assets/sounds/snare',
        src: '**',
        dest: 'iOS App/platforms/ios/www/assets/sounds/snare/',
        flatten: true,
        filter: 'isFile',
      },
      all: {
        expand: true,
        cwd: 'app/dest/assets/sounds/all',
        src: '**',
        dest: 'iOS App/platforms/ios/www/assets/sounds/all/',
        flatten: true,
        filter: 'isFile',
      },
      // template
      index: {
        src: 'app/dest/index.html',
        dest: 'iOS App/platforms/ios/www/index.html',
      },
    },

    concurrent: {
      styles: ['sass'],
      scripts: ['uglify'],
      templates: ['assemble']
    },

    watch: {
      css: {
        files: [
          'app/src/css/*.scss',
          'app/src/css/app/*.scss',
          'app/src/css/ui/*.scss',
        ],
        tasks: ['sass', 'copy:css', 'copy:cssmap'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: [
          'app/src/js/**/*.js',
        ],
        tasks: ['uglify', 'copy:js'],
        options: {
          spawn: false
        }
      },
      files: [
        'app/src/templates/*.hbs',
        'app/src/templates/partials/*.html',
        'Gruntfile.js'
      ],
      tasks: ['assemble', 'htmlmin', 'copy:index'],
      options: {
        reload: true
      }
    },

    connect: {
      server: {
        options: {
          port: 1337,
          base: {
            path: 'iOS App/platforms/ios/www/',
            // path: 'app/dest',
            options: {
              index: 'index.html',
              maxAge: 300000
            }
          }
        }
      },
    },

    open: {
      dev: {
        path: 'http://0.0.0.0:1337',
        app: 'Safari'
      }
    },
  });

  grunt.loadNpmTasks('grunt-jquerybuilder');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jslint');

  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg-sprite');

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', [
    'jquery',
    'shell',
    'newer:uglify',

    // SVG
    'svgsprite',
    'svgmin',

    // PNG
    'copy:png',
    'copy:svgs',

    // styles
    'sass',

    // template
    'assemble',
    'htmlmin',

    'concurrent:styles',
    'concurrent:scripts',
    'concurrent:templates',

    // samples
    'newer:copy:kick',
    'newer:copy:hat',
    'newer:copy:snare',
    'newer:copy:all',

    // start...
    'connect',
    // ...and open in browser
    'open:dev',

    'watch'
  ]);

};
