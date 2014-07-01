'use strict';
$.ajax({
  url:'http://worldcup.sfg.io/matches/today',
}).success(function(matches){
  //console.log(matches);
  var source   = $('#entry-template').html();
  var template = Handlebars.compile(source);
  var context = {};

  matches.forEach(function(match){
    context = {time_left: match.datetime, first_team_name: match.away_team.country,
               second_team_name: match.home_team.country,
               first_team_goals: match.away_team.goals,
               second_team_goals: match.home_team.goals};

    var pesho = match.home_team.country;
    console.log(countrynames.getCode(pesho));

    var html = template(context);

    $('body').append(html);
  });
});
