/**
 * Dr.Santi Nuratch
 * 10 January, 2019
 */

// require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

module.exports = function(grunt) {
    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'src/libs/ui/dist/UIMouse.js'       : 'src/libs/ui/UIMouse.js',
                    'src/libs/ui/dist/UIUtils.js'       : 'src/libs/ui/UIUtils.js',
                    'src/libs/ui/dist/UIContainer.js'   : 'src/libs/ui/UIContainer.js',
                    'src/libs/ui/dist/UIText.js'        : 'src/libs/ui/UIText.js',
                    'src/libs/ui/dist/UINum.js'         : 'src/libs/ui/UINum.js',
                    'src/libs/ui/dist/UIPrint.js'       : 'src/libs/ui/UIPrint.js',
                    'src/libs/ui/dist/UICore.js'        : 'src/libs/ui/UICore.js'

                    // files: [{
                    //     expand: true,
                    //     cwd: 'src/libs/ui/',
                    //     src: ['**/*.js'],
                    //     dest: 'apps/src/libs',
                    //     ext: '.min.js'
                    // }]
                }
            }
        },


        cssmin: {
            target:{
                files: [
                    {
                        expand: true,
                        cwd: 'src/libs/ui/',
                        src: ['**/*.css', '!*.min.css'],
                        dest: 'apps/public/css',
                        ext: '.min.css'
                    }
                ]

                // combine: {
                //     files:[
                //         {
                //             'css/style.css' : ['css/ui.connector.css', 'css/ui.text.css']
                //         }
                //     ]
                // }
            }
        },

        uglify: {
            options: {
                manage: false
            },
            target: {
                //    files: {
                //        'js/main.min.js': ['js/ui.text.js', 'js/ui.window.js']
                //    }
                files: [{
                    expand: true,
                    cwd: 'src/libs/ui/',
                    src: ['**/*.js'],
                    dest: 'apps/src/libs',
                    ext: '.min.js'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-babel');

    // Default task(s).
    //grunt.registerTask('default', ['uglify']);
    grunt.registerTask('default', ['babel']);
};
