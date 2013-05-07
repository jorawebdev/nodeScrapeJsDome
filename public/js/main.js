$(document).ready(function(){
  var data = myJs;
  var tbl = '<table>';
  var events = '<div class="events">';
  var sessions = '<div class="sessions">';
  var urls = '<div class="urls">';

  for(i in data){
    //console.log(data[i].session);
    tbl += '<tr><td class="spanEvents">' + data[i].events + '</td><td class="spanSessions">'+ data[i].session +'</td><td class="spanUrls"><a href="'+ data[i].url +'">See Results</a></td></tr>';
    //sessions += '<div class="spanSessions">' + data[i].session + '</div>';
    //urls += '<div class="spanUrls">' + data[i].url + '</div>';
    //console.log(i + ' : ' + (data.length - 1));
    if(i == (data.length - 1)){
      tbl += '</table>';
      //events += '</div>';
      //sessions += '</div>';
      //urls += '</div>';
      //console.log(tbl);
      $('#results').html(tbl);
    }
  }
  //console.log(data);
});
