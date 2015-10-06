var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    twig = require('metalsmith-twig'),
    browsersync = require('metalsmith-browser-sync'),
    collections = require('metalsmith-collections'),
    paginate = require('metalsmith-paginate'),
    permalinks = require('metalsmith-permalinks'),
    branch = require('metalsmith-branch'),
    beautify = require('metalsmith-beautify');

var setTemplateForCollection = function (config) {
    var pattern = new RegExp(config.pattern);

    return function (files, metalsmith, done) {
        for (var file in files) {
            if (pattern.test(file)) {
                var _f = files[file];
                if (!_f.template) {
                    _f.template = config.templateName;
                }
            }
        }
        done();
    };
};

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
    .use(setTemplateForCollection({
        pattern: 'posts',
        templateName: 'post.twig'
    }))
    .use(markdown())
    .use(twig())
    .use(branch('content/pages/*.html')
        .use(permalinks({
            pattern: ':title'
        })))
    .use(branch('content/posts/*.html')
        .use(permalinks({
            pattern: 'blog/posts/:title'
        })))
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