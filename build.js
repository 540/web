var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    twig = require('metalsmith-twig-540'),
    browsersync = require('metalsmith-browser-sync'),
    collections = require('metalsmith-collections-540'),
    paginate = require('metalsmith-paginate'),
    permalinks = require('metalsmith-permalinks'),
    branch = require('metalsmith-branch'),
    beautify = require('metalsmith-beautify');

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
            pattern: 'blog/posts/:title'
        })))
    .use(twig())
    .use(beautify({
        'css': false,
        'indent_size': 4,
        'indent_char': ' ',
        'js': {
            "indent_size": 2
        }
    }))
    .use(browsersync({
        files: ['src/*.md', 'src/**/*.md', 'src/**/**/*.md', 'views/*.twig', 'views/**/*.twig']
    }))
    .build(function (err) {
        if (err) throw err;
    });