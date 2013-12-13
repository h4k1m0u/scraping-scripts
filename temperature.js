// Get temperatures of given city (first argument)
// from http://openweathermap.org/API
// appid given as a second parameter
// author h4k1m

var http = require('http');

// get json data
var options = {
    host: 'api.openweathermap.org',
    path: '/data/2.5/weather?units=metric&mode=json&q=' + process.argv.slice(2)[0],
    headers: {'x-api-key':process.argv.slice(2)[1]}
};

http.get(options, function(res) {
    var data = '';

    res.on('data', function(chunk) {
        data += chunk;        
    });
    
    res.on('end', function() {
        if (data) {
            var cityObj = JSON.parse(data);
            console.log(
                'City coordinates: ' +
                cityObj.name + '(' + cityObj.sys.country + ')' +
                ' at (' + cityObj.coord.lon + ', ' + cityObj.coord.lat + ')'
            );
            console.log('Temperature/humidity: ' + cityObj.main.temp + '/' + cityObj.main.humidity);
            console.log('Description: ' + cityObj.weather[0].description);
        } else {
            console.log('Error: Unknown city.');
        }
    });
});
