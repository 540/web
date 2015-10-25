var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    twig = require('metalsmith-twig-540'),
    browsersync = require('metalsmith-browser-sync'),
    collections = require('metalsmith-collections-540'),
    paginate = require('metalsmith-paginate'),
    permalinks = require('metalsmith-permalinks'),
    branch = require('metalsmith-branch'),
    beautify = require('metalsmith-beautify'),
    copyassets = require('metalsmith-copy-assets-540'),
    sass = require('metalsmith-sass'),
    autoprefixer = require('metalsmith-autoprefixer');

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
    .use(sass({
        outputDir: 'css/',
        outputStyle: 'expanded',
    }))
    .use(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'IE >= 9']}))
    .use(copyassets({
        src: [
            'src/assets/vendor/jquery/dist/jquery.min.js',
            'src/assets/js/jquery.appear.js',
            'src/assets/vendor/jquery-validation/dist/jquery.validate.min.js',
            'src/assets/vendor/jquery-validation/src/localization/messages_es.js',
            'src/assets/vendor/foundation/js/foundation.min.js',
            'src/assets/vendor/modernizr/modernizr.js',
            'src/assets/vendor/masonry/dist/masonry.pkgd.min.js',
            'src/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js',
            'src/assets/js/app.js',
            'src/assets/js/slick.min.js'
        ],
        dest: 'js'
    }))
    .use(copyassets({
        src: [
            'src/assets/images/stock',
            'src/assets/images/main',
        ],
        dest: 'images'
    }))
    .use(copyassets({
        src: [
            'src/assets/vendor/font-awesome/css/font-awesome.min.css',
            'src/assets/css'
        ],
        dest: 'css'
    }))
    .use(copyassets({
        src: [
            'src/assets/vendor/font-awesome/fonts',
            'src/assets/fonts/fontello',
            'src/assets/fonts/nevis',
            'src/assets/fonts/slick'
        ],
        dest: 'fonts'
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
    .use(beautify({
        css: false,
        indent_size: 4,
        indent_char: ' ',
        js: {
            "indent_size": 2
        }
    }))
    .use(browsersync({
        files: ['src/assets/**/*', 'src/*.md', 'src/**/*.md', 'src/**/**/*.md', 'views/*.twig', 'views/**/*.twig']
    }))
    .build(function (err) {
        if (err) throw err;
    });