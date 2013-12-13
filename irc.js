// Get best irc jokes
// from http://bash.org
// author h4k1m

var exec = require('child_process').exec,
    jsdom = require('jsdom');

// get html page with curl & parse it with jsdom
exec('curl -s --user-agent "" http://bash.org/?top', function(error, stdout, stderr) {
    jsdom.env({
        html: stdout,
        scripts: ['http://code.jquery.com/jquery.js'],
        done: function(errors, window) {
            var $ = window.$;
            $('table p.qt').each(function() {
                console.log($(this).prev('p.quote').text());
                console.log($(this).text());
                console.log();
            });
        }
    });
});
