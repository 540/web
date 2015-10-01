var metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    twig = require('metalsmith-twig'),
    browsersync = require('metalsmith-browser-sync'),
    beautify = require('metalsmith-beautify');


metalsmith(__dirname)
    .use(markdown())
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
        files  : ['src/*.md', 'views/*.twig', 'views/**/*.twig']
    }))
    .build(function(err) {
        if (err) throw err;
    });