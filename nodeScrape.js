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

jsdom.env({
  html: bUrl + aCollection[0] + '/evtindex.htm',
  src: [
    jquery
  ],
  done: function(errors, window) {
    var $ = window.$;
    $('a').each(function(){
      box.push($(this).attr('href'));
    });
    console.log(box);
  }
});
}


