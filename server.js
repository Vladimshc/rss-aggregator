'use strict';

let express = require('express'),
    app = express(),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    port = 4000,
    xml2js = require("xml2js");

let parser = new xml2js.Parser();

app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/res', (req, res) => {

    const urlrss = 'http://news.liga.net/all/rss.xml';             //ok
    // const urlrss =  'http://k.img.com.ua/rss/ru/all_news2.0.xml';  //false
    // const urlrss =  'http://www.pravda.com.ua/rus/rss/view_news/'; //false
    // const urlrss =  'http://fakty.ua/rss_feed/ukraina';            //false

    request(urlrss, function (error, response, body) {
        if (!error && response.statusCode == 200) {

            parser.parseString(body, function (err, result) {
                console.log(result);
                res.send(result);
            });
        }
    });
});


http.Server(app).listen(port, function () {
    console.log(`Server running at localhost:${port}`);
});



