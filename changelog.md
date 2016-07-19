### V0.2.4
* Force `Gulp Github` to always push to gh-pages regardless.

### V0.2.3
* Added BrowserSync.
* Improved jekyll build process and support for Jekyll on Windows (untested).
* `Gulp Watch` will also now watch .html files in `source/site` similar to css building. No need to run a second command for building Jekyll anymore.
* Updated README to reflect changes.
* There's now a default gulp command! Running just `gulp` will attempt to build existing assets, launch BrowserSync, and monitor any changes to your CSS/JS/HTML files. Your browser window will then be updated as changes are made to the files.

### V0.2.2
* Fixed a few typos in the change log.
* Better Jekyll support.

### V0.2.0
* Switched from Grunt to Gulp.
* Added support for Bower.

### V0.1.9
* Fixed a few errors in README.md that caused confusion.
* Replaced grunt-html validation package with grunt-html.
* The build-site command actually works now.
* Updated Gemfile to use Ruby 2.2.2.

### V0.1.8
* Added Support for coffeescript.
* Renamed `src` to `source`.
* General cleanup of file structure.
* Added this changelog file to keep track of updates.
