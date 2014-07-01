'use strict';
$.ajax({
  url:'http://worldcup.sfg.io/matches/today',
}).success(function(matches){
  console.log(matches);
  var source   = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var context = {};
  var timer = '';

  matches.forEach(function(match){
    var time = Date.parse(match.datetime);
    var timeDifference = parseInt(((Date.now() - parseInt(time, 10))/1000)/60);

    if(timeDifference > 0) {
      if(timeDifference > 90) {
        timer = 'The match is over!';
      } else {
        timer = 'Time left: ' + timeDifference;
      }
    } else {
      timer = 'Starts in: ' + (-timeDifference) + ' minutes';
    }

    context = {time_left: timer, first_team_name: 'flags/' + match.away_team.code + '.png',
               second_team_name: 'flags/' + match.home_team.code + '.png',
               first_team_goals: match.away_team.goals,
               second_team_goals: match.home_team.goals};

    var html = template(context);
    $('body').append(html);
  });
});
