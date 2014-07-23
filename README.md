# UnderTasker

I built UnderTasker to help assist in developing and testing websites. More specifically, I wrote it to help develop [underlost.net](underlost.net) and [A Life Well Played](alifewellplayed.com), but have since used it for other projects. It’s mainly designed to help you generate production ready static assets from their source files, as well as quickly publish sites to [Github Pages](pages.github.com). 

Out of the box, UnderTasker uses the following:

*   [JSLint](www.jslint.com)/[CSSLint](csslint.net)
*   [UglifyJS](marijnhaverbeke.nl//uglifyjs)
*   [LESS](lesscss.org)
*   [CSS Autoprefixer](github.com/ai/autoprefixer)
*   [grunt-contrib-imagemin](https://github.com/gruntjs/grunt-contrib-imagemin) (For image optimizations)
*   [grunt-git-deploy](https://www.npmjs.org/package/grunt-git-deploy) (For git deployment)
*   [Jekyll](http://jekyllrb.com/) (For compiling html)

If there’s a grunt plugin, you can use it with UnderTasker. Add, remove, and extend to your heart’s content. When you&#39;re finished, you can even publish your static site to Github Pages with a single grunt command.

## Getting Started

<a id="21dc"></a>UnderTasker requires Node.js to be installed. [Consult the Node.js site](http://nodejs.org/download/) for installation directions on your platform.

*  Run ‘**npm install -g grunt-cli**’ if you do not yet have the grunt CLI installed. 
*  Run ‘**npm install**’ for remaining dependencies (list located in _packages.json_. This might take a little while.
*  By default, your static assets will be called under-tasker.extension (under-tasker.css, under-tasker.js, etc). Rename the slug field in _package.json_ to whatever you want your static assets to be named.
*  If you plan on using Undertasker for deploying a static site, you will want to install Jekyll. 
*  If you plan on deploying the site with git, make sure you specify the .git url in _package.json._

### If developing locally:

*   If necessary, [install Jekyll](http://jekyllrb.com/docs/installation) (requires v2.1.x).
*   From the root /undertasker directory, run **jekyll serve** in the command line.
*   Visit [http://localhost:9005](http://localhost:9001/) in your browser.


## Commands

**UnderTasker** can do everything at once, or just certain tasks. 

*   **grunt build-less**
Only compiles, autoprefixes, and minifies the CSS. 
*   **grunt build-js**
Minimizes and uglifies everything in the js directory into a single file.
*   **grunt build-img**
Attempts to optimize any JPG/PNG images in _src/img._
*   **grunt build**
Build all static assets from src, including less and javascript, as well as tries to optimize any JPG/PNG files in _src/img. _Also sets up the gh-pages directory.
*   **grunt dist**
Similar to grunt build, but does not run any tasks related to html. Only static assets in the dist directory are generated, including css, javascript and optimized images. Useful if you’re using the assets for a non static website. 
*   **grunt deploy**
The same as _grunt build_, but also deploys your _site_ directory and compiled assets.


## What’s Included

All of your work will mostly be done in the _src_ directory. All files from _src_ (except the _site_ directory) will be compiled and copies to the _dist_ directory upon running the specified commands in the next section. Files in the _dist_ directory will be production ready. That is, they will be compiled, minified, and ready to deployed to the web. The compiled _dist_ directory will also be copied to _src/site_, the directory used for publishing to Github Pages. Grunt will clean up and repopulate files in the _dist_ directories as necessary whenever commands are issued.
  
```
├─ src/
│ ├─ img/
│ ├─ js/
│ ├─ less/
│ └─ site/
│    └─ dist/
│    └─ index.html
├─ dist/
│ ├─ img/
│ ├─ js/
│ └─ css/
├─ _gh-pages/
│ ├─ dist/
│ └─ index.html
├─ _config.yml
├─ grunt/
├─ Gruntfile.js
└─ package.json
```

Just about everything happens in Gruntfile.js. If you want to make modifications to the workflow, you’ll probably want to edit that. If you&#39;re working with a static site, as previously mentioned, package.json contains several variables you might want to change to better suit the naming conventions of your files, as well as the url to the github repo you might want to deploy your site to.

Bare minimal css elements from Bootstrap (in the form of LESS) are also included to help you get started. These files are in no way required and can be deleted or edited however you want.


## Example

To see it in action, visit the [**UnderTasker**](http://tyler.codes/UnderTasker) site. I also built [**tyler.codes**](http://tyler.codes/) and [**underlost.net**](http://underlost.net/) with it. To view the source, or to clone the git repo, check out [https://github.com/underlost/UnderTasker](https://github.com/underlost/UnderTasker).


## Support

If you&#39;re not sure what this is, it’s probably not for you. UnderTasker is provided as is, and I can not assist in helping you get it setup. Your best bet is to first go read up on [Grunt](http://gruntjs.com/), then come back here. If you believe you’ve encountered a bug, feel free to open an [issue on Github](https://github.com/underlost/UnderTasker/issues).



## License

UnderTasker is released under the [MIT License](https://github.com/underlost/UnderTasker/blob/master/LICENSE)
