// module.exports = function(grunt) {

//   grunt.initConfig({
//     pkg: grunt.file.readJSON('package.json'),
//     concat: {
//       options: { separator: ';'},
//       dist: {
//         src: ['public/client/**/*.js'],
//         dest: 'public/dist/<%= pkg.name %>.js'
//       }
//     },

//     mochaTest: {
//       test: {
//         options: {
//           reporter: 'spec'
//         },
//         src: ['test/**/*.js']
//       }
//     },

//     nodemon: {
//       dev: {
//         script: 'server.js'
//       }
//     },

//     uglify: {
//       target: {
//         files: {
//           'public/dist/<%= pkg.name %>.min.js': ['public/dist/**/*.js']
//         }
//       }
//     },

//     eslint: {
//       target: [
//         // Add list of files to lint here
//       ]
//     },

//     cssmin: {
//       target: {
//         files: {
//           'public/dist/output.min.css': ['public/*.css']
//         }
//       }
//     },

//     watch: {
//       scripts: {
//         files: [
//           'public/client/**/*.js',
//           'public/lib/**/*.js',
//         ],
//         tasks: [
//           'concat',
//           'uglify'
//         ]
//       },
//       css: {
//         files: 'public/*.css',
//         tasks: ['cssmin']
//       }
//     },

//     shell: {
//       prodServer: {
//       }
//     },
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');
//   grunt.loadNpmTasks('grunt-contrib-cssmin');
//   grunt.loadNpmTasks('grunt-eslint');
//   grunt.loadNpmTasks('grunt-mocha-test');
//   grunt.loadNpmTasks('grunt-shell');
//   grunt.loadNpmTasks('grunt-nodemon');

//   grunt.registerTask('server-dev', function (target) {
//     grunt.task.run([ 'nodemon', 'watch' ]);
//   });

//   ////////////////////////////////////////////////////
//   // Main grunt tasks
//   ////////////////////////////////////////////////////

//   grunt.registerTask('test', [
//     'mochaTest'
//   ]);

//   grunt.registerTask('build', [
//     'concat', 'uglify', 'cssmin'
//   ]);
//   grunt.registerTask('default', [
//     'build'
//   ]);

//   grunt.registerTask('upload', function(n) {
//     if (grunt.option('prod')) {
//       // add your production server task here
//     } else {
//       grunt.task.run([ 'server-dev' ]);
//     }
//   });

//   grunt.registerTask('deploy', [
//     // add your deploy tasks here
//   ]);


// };



// /********/



module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    eslint: {
      target: [
        'app/**/*.js',
        'public/client/**/*.js',
        'Gruntfile.js',
        'server-config.js',
        'server.js'
      ]
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/<%= pkg.name %>.js',
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        // Here we use <%= concat.dist.dest %> so uglify will
        // minify the file that the concat task produces
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'public/dist/<%= pkg.name %>.min.css': ['public/style.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    shell: {
      // gitAdd: {
      //   command: 'git add .'
      // },
      // gitCommit: {
      //   command: 'git commit -m "hello"'
      // },
      prodServer: {
        command: 'git push live master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [

    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [

    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run([ 'shell:prodServer' ]);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'test',
    'build',
    'upload'
      //call build

      // add your production server task here
      // grunt.task.run([ 'test', 'build' ]);


    // add your deploy tasks here
  ]);


};
