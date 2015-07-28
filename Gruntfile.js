module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> by <%= pkg.author %> | <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: {},
        mangle: true
      },
      build: {
        src: '<%= pkg.name %>.js',
        dest: '<%= pkg.name %>.min.js'
      }
    },
	jsvalidate: {
	    options:{
	      globals: {},
	      esprimaOptions: {},
	      verbose: true
	    },
	    targetName:{
	      files:{
	        src:['<%= pkg.name %>.js', '<%= pkg.name %>.min.js']
	      }
	    }
	  }    
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-jsvalidate');

  grunt.registerTask('default', ['uglify', 'jsvalidate']);
};