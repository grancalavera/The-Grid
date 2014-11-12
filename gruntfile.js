/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        browserSync: {
            dev: {
                bsFiles: {
                    src: 'index.html'
                },
                options: {
                    proxy: 'localhost:3000'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-browser-sync')

    // Default task.
    grunt.registerTask('default', ['browserSync']);

};
