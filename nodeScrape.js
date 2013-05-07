var jsdom  = require('jsdom');
var fs     = require('fs');
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
    var j = iter;
    jsdom.env({
      html: bUrl + j + '/evtindex.htm',
      src: [
        jquery
      ],
      done: function(errors, window) {
        var $ = window.$;
        var url = bUrl + j + '/';
        $('a').each(function(){
          box.push('{["' + $('h3').text() + '", "' + $(this).text() + '"] : "' + url + $(this).attr("href")+ '"}');
        });
        //console.log(box);
        fs.writeFile('swimJson.js', box);
      }
    });
  }
  var colLen = aCollection.length;
  (function(){
    for (var i=0; i<colLen; i++){
      if ( i === (colLen-1)) { 
        runSites(aCollection[i]);
      }
    }
  })();
}
