// Get posts of given user|page (first argument)
// from https://graph.facebook.com
// appid & appsecret given as a second & third parameters
// author h4k1m

var https=require('https'); 

var params = process.argv.slice(2),
    options = {
        host: 'graph.facebook.com',      
        path: '/oauth/access_token?client_id=' + params[1] + '&client_secret=' + params[2] + '&grant_type=client_credentials&redirect_uri=http://localhost:8080/'
};

// get app token (by oauth authentication)
https.get(options,function(res){
    var token = '';

    res.on('data', function (chunk) {
        token += chunk;
    });

    // get given user|page posts, using app token
    res.on('end', function() {
        var options = {
            host: 'graph.facebook.com',
            path: '/' + params[0] + '/posts?limit=5000&' + token
        };

        https.get(options,function(res){
            var feed = '';

            res.on('data', function (chunk) {
                feed += chunk;
            });

            res.on('end', function() {
                // print posts feed
                var jsonFeeds = JSON.parse(feed).data,
                    jsonFeed = {};
                
                for (var i = 0, l = jsonFeeds.length; i < l; i++) {
                    jsonFeed = jsonFeeds[i];
                    console.log(jsonFeed.created_time + ': ' + (jsonFeed.story || jsonFeed.description));
                }
            });
        });
    });
});
