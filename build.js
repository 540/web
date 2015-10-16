var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    twig = require('metalsmith-twig-540'),
    browsersync = require('metalsmith-browser-sync'),
    collections = require('metalsmith-collections-540'),
    paginate = require('metalsmith-paginate'),
    permalinks = require('metalsmith-permalinks'),
    branch = require('metalsmith-branch'),
    beautify = require('metalsmith-beautify'),
    copyAssets = require('metalsmith-copy-assets-540');

metalsmith(__dirname)
    .use(collections({
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(paginate({
        perPage: 2,
        path: "blog/page"
    }))
    .use(markdown())
    .use(branch('content/pages/*.html')
        .use(permalinks({
            pattern: ':title'
        })))
    .use(branch('content/posts/*.html')
        .use(permalinks({
            pattern: 'blog/:title'
        })))
    .use(twig())
    .use(copyAssets({
        src: [
            'assets/vendor/jquery/dist/jquery.min.js',
            'assets/js/jquery.appear.js',
            'assets/vendor/jquery-validation/dist/jquery.validate.min.js',
            'assets/vendor/foundation/js/foundation.min.js',
            'assets/vendor/modernizr/modernizr.js',
            'assets/vendor/masonry/dist/masonry.pkgd.min.js',
            'assets/vendor/imagesloaded/imagesloaded.pkgd.min.js',
            'assets/js/app.js',
            'assets/js/slick.min.js'
        ],
        dest: 'js'
    }))
    .use(copyAssets({
        src: [
            'assets/images/stock',
            'assets/images/main'
        ],
        dest: 'images'
    }))
    .use(copyAssets({
        src: [
            'assets/vendor/font-awesome/css/font-awesome.min.css',
            'assets/css/fontello.css',
            'assets/css/nevis.css',
            'assets/css/slick.css',
            'assets/css/slick-theme.css',
            'assets/css/style.css',
            'assets/css/app.css',
            'assets/css/responsive.css',
            'assets/css/ajax-loader.gif'
        ],
        dest: 'css'
    }))
    .use(copyAssets({
        src: [
            'assets/vendor/font-awesome/fonts',
            'assets/fonts/fontello',
            'assets/fonts/nevis',
            'assets/fonts/slick'
        ],
        dest: 'fonts'
    }))
    .use(beautify({
        css: false,
        indent_size: 4,
        indent_char: ' ',
        js: {
            "indent_size": 2
        }
    }))
    .use(browsersync({
        files: ['assets/**/*', 'src/*.md', 'src/**/*.md', 'src/**/**/*.md', 'views/*.twig', 'views/**/*.twig']
    }))
    .build(function (err) {
        if (err) throw err;
    });