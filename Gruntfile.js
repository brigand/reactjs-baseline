/** This Grunt file has the MIT License (MIT) http://opensource.org/licenses/MIT

    Contribuiters:
        2013-2014 Mark Lussier <mlussier@gmail.com> 
        2014 Régis Gaidot <rgaidot@gmail.com>
        2014 FWeinb of https://github.com/FWeinb
        2014 Frankie Bagnardi
*/
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
          dev: {
            options: {
              port: 9000,
              livereload: true,
              base: 'development',
              open: 'http://localhost:9000'
            }
          }
        },

        browserify: {
            options: {
                transform: ['reactify'],
            },
            dev: {
                options: {
                    debug: true
                },
                files: {
                    'development/js/<%= pkg.name %>.js': ['src/index.jsx']
                }
            },
            dist: {
                files: {
                    'dist/js/<%= pkg.name %>.js': ['src/index.jsx']
                }
            }
        },

        stylus: {
            dev: {
                options: {
                    compressed: false
                },
                files: {
                    'development/css/<%= pkg.name %>.css': ['src/index.styl']
                }
                },
            dist: {
                options: {
                    compressed: true
                },
                files: {
                    'dist/css/<%= pkg.name %>.css': ['src/index.styl']
                }
            }
        },

        // @TODO: Find a cleaner way to do this given the target path
        copy: {
            dev: {
                files: [
                    {src: ['bower_components/foundation/index.css'], dest: './development/css/vendor/foundation.css'},
                    {src: ['bower_components/cortex/index.js'], dest: './development/js/vendor/cortex.js'},
                    {src: ['bower_components/react/react.min.js'], dest: './development/js/vendor/react.min.js'},
                ]
            },
            dist: {
                files: [
                    {src: ['bower_components/react/react.min.js'], dest: './dist/js/vendor/react.min.js'}
                ]
            }
        },

        // for dist we use a .min.* for lets repalce some placeholders in the
        // index.html template
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'pkg_name',
                            replacement: '<%= pkg.name %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['src/index.html'], dest: './development'}
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'pkg_name',
                            replacement: '<%= pkg.name %>.min'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['src/index.html'], dest: './dist'}
                ]
            }
        },

        clean: {
            dev: ['development'],
            dist: ['dist']
        },

        cssmin: {
            dev: {
                add_banner: {
                    options: {
                        banner: '/*!\n <%= asciify_appname %> \n*/\n'
                    },
                    files: {
                        'development/css/<%= pkg.name %>.min.css': ['development/css/<%= pkg.name %>.css']
                    }
                }
            },
            dist: {
                options: {
                    banner: '/*!\n <%= asciify_appname %> \n*/\n'
                },
                files: {
                    'dist/css/<%= pkg.name %>.min.css': ['dist/css/<%= pkg.name %>.css']
                }
            }
        },

        asciify: {
            // fonts; http://www.figlet.org/examples.html
            appname: {
                text: 'ReactJS Baseline'
            },
            options:{
                font:'puffy',
                log: false
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*!\n My code! \n*/\n'
            },
            dist: {
                files: {
                  'dist/js/<%= pkg.name %>.min.js': ['dist/js/<%= pkg.name %>.js'],
                }
            }
        },

        watch: {
            options: {
              livereload: true,
            },
            files: [ 'src/**/*.jsx', 'src/**/*.js', 'src/**/*.scss', 'src/*.html'],
            tasks: [ 'devBuild' ]
        },

  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('devBuild', [
    'clean:dev',
    'copy:dev',
    'replace:dev',
    'browserify:dev',
    'stylus:dev',
    'cssmin:dev',
  ]);

  grunt.registerTask('dev', [
    'devBuild',
    'connect:dev',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'clean:dist',
    'copy:dist',
    'replace:dist',
    'browserify:dist',
    'asciify',
    'stylus:dist',
    'cssmin:dist',
    'uglify:dist'
  ]);

  grunt.registerTask('default', [
    'dev'
    ]);
};


// Takes grunt-browserify aliasMappings config and converts it into an alias array
function arrayMappingsToAliasArray(aliasMappings) {
    var aliasArray = [];
    aliases = util.isArray(aliasMappings) ? aliasMappings : [aliasMappings];
    aliases.forEach(function (alias) {
      grunt.file.expandMapping(alias.src, alias.dest, {cwd: alias.cwd}).forEach(function(file) {
        var expose = file.dest.substr(0, file.dest.lastIndexOf('.'));
        aliasArray.push('./' + file.src[0] + ':' + expose);
      });
    });
    return aliasArray;
}
