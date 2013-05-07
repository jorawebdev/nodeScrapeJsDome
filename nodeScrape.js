var jsdom  = require('jsdom');
var fs     = require('fs');
var http = require('http');
var express = require('express');
var path = require('path');
var route = require('./routes/route');
var app = express();

var jquery = fs.readFileSync("./jq.js").toString();
var aCollection =[];
var bUrl = 'http://fastlanetek.com/';

jsdom.env({
  html: bUrl,
  src: [
    jquery
  ],
  done: function(errors, window) {
    var $ = window.$;
    $('p.MsoNormal a').each(function(){
      aCollection.push( $(this).attr('href') );
    });
    //console.log(aCollection);
    scrape();
  }
});

var scrape = function(){
  var box =[];
  var runSites = function(iter){
    //console.log(iter);
    var j = iter;
    jsdom.env({
      html: bUrl + j + '/evtindex.htm',
      src: [
        jquery
      ],
      done: function(errors, window) {
        var $ = window.$;
        var url = bUrl + j + '/';
        var h3 = $('h3').text();
        h3 = h3.replace(/(\r\n|\n|\r)/gm,", ");
        $('a').each(function(){
          box.push('{"url" : "' + url + $(this).attr("href") + '", "session" : "' + h3 + '", "events" : "' + $(this).text() + '"}');
        });
        console.log(box);
        fs.writeFile('public/js/swimJson.js', 'myJs=[' + box + ']');
      }
    });
  }
  var colLen = aCollection.length;
  (function(){
    for (var i=0; i<colLen; i++){
      //console.log(aCollection[i]);
      //if ( i === (colLen-1)) { 
        runSites(aCollection[i]);
      //}
    }
  })();
}

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', route.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
