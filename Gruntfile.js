module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'watch']);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        options: {
          debug: true,
          transform: ['reactify'],
          watch: true
        },
        src: 'static/app.js',
        dest: 'static/bundle.js'
      }
    },
    watch: {
      files: 'static/app.js',
      tasks: ['default']
    }
  });
}
