'use strict';
// _____________START:GLOBAL VARIABLES_______________________
var apiString = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';
var firstSelect = 0;
var startVal = '';
var endVal = '';
var thirdStats = [];
var playerObjID = {};
var queryStats = {};
var params = {
    //Request parameters
    statType: 'PlayerGameStatsByPlayerID',
    //season:
    //playerID:
    //playerName
    //team
    //week
};
var playerNameArr = [];
var playerIDArr = [];
var masterStatsArr = [];

// _____________END:GLOBAL VARIABLES_______________________

$(document).ready(function() {
  $('select').material_select();
  getplayerIDObj();

//change to submit button (make multi submits)
$('.clicker').on('click', function(){
  firstSelect = $('.numOfPlayers:selected');
  // console.log('picked first drop down!', firstSelect.val());
  var numPlayers = parseInt(firstSelect.val());
  var playerForm = $('#playerForm');
  var appendString = '';

  for (var i=0;i<numPlayers;i++){
     appendString += '<div class="row"><form class="col s12"><div class="row"><div class="input-field col s6"><input placeholder="Player Name" id="first_name" type="text" class="validate"></div></div>';
  }
  playerForm.html(appendString);


  // $('#main').append('<div class="input-field col s3"><select><option class="rangeStart" value="" disabled selected>Range Start</option><option class="rangeStart" value="1">1</option><option class="rangeStart" value="2">2</option><option class="rangeStart" value="3">3</option><option class="rangeStart" value="4">4</option><option class="rangeStart" value="5">5</option><option class="rangeStart" value="6">6</option><option class="rangeStart" value="7">7</option><option class="rangeStart" value="8">8</option><option class="rangeStart" value="9">9</option><option class="rangeStart" value="10">10</option><option class="rangeStart" value="11">11</option><option class="rangeStart" value="12">12</option><option class="rangeStart" value="13">13</option><option class="rangeStart" value="14">14</option><option class="rangeStart" value="15">15</option><option class="rangeStart" value="16">16</option></select><label>Week Range</label><select><option class="rangeEnd" value="" disabled selected>Range End</option><option class="rangeEnd" value="1">1</option><option class="rangeEnd" value="2">2</option><option class="rangeEnd" value="3">3</option><option class="rangeEnd" value="4">4</option><option class="rangeEnd" value="5">5</option><option class="rangeEnd" value="6">6</option><option class="rangeEnd" value="7">7</option><option class="rangeEnd" value="8">8</option><option class="rangeEnd" value="9">9</option><option class="rangeEnd" value="10">10</option><option class="rangeEnd" value="11">11</option><option class="rangeEnd" value="12">12</option><option class="rangeEnd" value="13">13</option><option class="rangeEnd" value="14">14</option><option class="rangeEnd" value="15">15</option><option class="rangeEnd" value="16">16</option></select></div><div class="input-field col s3"><select><option class="seasonSelect" value="2016">2016</option><option class="seasonSelect" value="2015">2015</option><option class="seasonSelect" value="2014">2014</option><option class="seasonSelect" value="2013">2013</option></select><label>Which Season?</label></div><div class="input-field col s3"><select multiple><option class="specific" value="" disabled selected>Select Desired</option><option class="specific"  value="Receptions">Receptions</option><option class="specific" value="ReceivingYards">Receiving Yards</option><option class="specific" value="ReceivingTouchdowns">Receiving Touchdowns</option><option class="specific" value="RushingAttempts">Rushing Attempts</option><option class="specific" value="RushingYards">Rushing Yards</option><option class="specific" value="RushingTouchdowns">Rushing Touchdowns</option><option class="specific" value="PassingAttempts">Passing Attempts</option><option class="specific" value="PassingCompletions">Passing Completions</option><option class="specific" value="PassingYards">Passing Yards</option><option class="specific" value="PassingTouchdowns">Passing Touchdowns</option></select><label>Stats to Plot</label></div>')



  // var numPlayerDiv = $('#numSelector');
  // var appendString = '';
  // var numPlayers = (firstSelect.val());
  // for (var i=0;i<numPlayers;i++){
  //     appendString += '<div class="row"><div class="input-field col s6"><input placeholder="Placeholder" id="first_name" type="text" class="validate"><label for="first_name">First Name</label></div></div>'
  //   //  appendString += '<input class="playerNameInput" type="text">Player Name</input><br>';
  // }
  // numPlayerDiv.html(appendString);


}); //close first.click

// ___________START:SUBMIT BUTTON___________________
$('#submit').on('click', function(){
  var rangeStartSelect = $('.rangeStart:selected');
  console.log('picked week1 drop down!', rangeStartSelect.val());
  startVal = rangeStartSelect.val();
  var rangeEndSelect = $('.rangeEnd:selected');
  console.log('picked week2 drop down!', rangeEndSelect.val());
  endVal = rangeEndSelect.val()+1;
  var seasonSelect = $('.seasonSelect:selected').val();
  params.season = seasonSelect;
  console.log(params.season);

  thirdStats = $('.specific:checked').map(function(_, el) {
    return $(el).val();
  }).get();
  console.log('stats selected:', thirdStats);

  playerNameArr = $('.validate').map(function(_, el) {
    return $(el).val();
    }).get();
  console.log('names input:', playerNameArr);
  for(var i=0;i<playerNameArr.length;i++){
    playerIDArr[i] = playerObjID[playerNameArr[i]];
  }
  console.log('ids of names:', playerIDArr);

  if(startVal >= endVal){
    alert('Please resubmit with an ending week greater than the starting week');
    return;
  }


  for(var j=0;j<playerNameArr.length;j++){
    queryStats[playerNameArr[j]] = {};
    for(var i=0; i<thirdStats.length; i++){
      var thirdStatsPlaceholder = thirdStats[i];
      queryStats[playerNameArr[j]][thirdStatsPlaceholder] = [];
    } // thirdStats=array of checkbox values, sets up queryStats skeleton
  }
  // console.log(queryStats);

  for(var j=0;j<playerIDArr.length;j++){
    params.playerID = playerIDArr[j];
    for(var i=startVal;i<endVal;i++){
      params.week = i;
      getWeeklyStats(params);
      // console.log(params);
    }
    // masterStatsArr.push(queryStats);
    console.log(queryStats);
    // console.log('arr of all player stats:', masterStatsArr);
  }
});  //close submit.click
// ___________END:SUBMIT BUTTON___________________

// ___________START:GRAPH BUTTON___________________
$('#graph').on('click', function(){

  // for(i=0;i<thirdStats.length;i++){
  //   //$.graphs.append div id=placeholder+key
  // }
  // queryStats[playerNameArr[i]][thirdStats[i]] = d1
  // queryStats[playerNameArr[i+1]][thirdStats[i]] = d2
  var data1 = [];
  var data1obj = {
    points: { symbol: "", fillColor: "" },
  };
  var colorArr = ['blue','orange','green','red','yellow','purple','blue','orange','green','red','yellow','purple'];
  var symbolArr = ['triangle','square','circle','diamond','triangle','square','circle','diamond','triangle','square','circle','diamond'];

  for(var j=0;j<thirdStats.length;j++){

    $('#graphs').append('<div id="legendHolder"></div><div id="placeholder'+thirdStats[j]+'" style="width:500px; height:300px;"></div>');

    for(var i=0;i<playerNameArr.length;i++){
      var dataSort = queryStats[playerNameArr[i]][thirdStats[j]];

      dataSort.sort(sortFunction);

      function sortFunction(a, b) {
          if (a[0] === b[0]) {
              return 0;
          }
          else {
              return (a[0] < b[0]) ? -1 : 1;
          }
      }

      data1[i] = {
        points: { symbol: "", fillColor: "" }
      };
      data1[i]['label'] = playerNameArr[i];
      data1[i]['color'] = colorArr[i];
      data1[i]['points']['fillcolor'] = colorArr[i];
      data1[i]['points']['symbol'] = symbolArr[i];
      data1[i]['data'] = dataSort;
      // function sortByDate(a, b) {
      //     return a[0].getTime() - b[0].getTime();
      // }
      //
      // data.sort(sortByDate);


      // data1[i] = data1obj;
      console.log('data1[i]: ', data1[i]);
    } //close forplayerNameArr) loop



  //     var data1 = [ { label: "label 1", data: d1, points: { symbol: "triangle", fillColor: "#058DC7" }, color: "#058DC7" },
  //     { label: "label 2", data: d2, points: { symbol: "square", fillColor: "#50B432" }, color: "#50B432" }
  // ];
  console.log('data1: ', data1);

    $.plot($('#placeholder'+thirdStats[j]), data1, {
            xaxis: {
                tickSize: 1,
                tickLength: 0,
                tickDecimals: 0,
                axisLabel: "Week",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
                axisLabelPadding: 5
            },
            lines:{show:true},
            yaxis: {
    //             axisLabel: "Temperature (C)",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: "Verdana, Arial, Helvetica, Tahoma, sans-serif",
                axisLabelPadding: 5
            },
            series: {
                points: {
                    radius: 3,
                    show: true,
                    fill: true
                },
            },
            legend: {
                labelBoxBorderColor: "none",
                position: "left",
                container: '#legendHolder'
            }
  }); //close $.plot
    data1 = [];
  } //close for(var key in obj)

}); //close graph.click
// ___________END:GRAPH BUTTON___________________

// ___________START:RESET BUTTON___________________
$('#reset').on('click', function(){
  $('#graphs').html('');
  var thirdStats = [];
  var playerObjID = {};
  var queryStats = {};
  var params = {
      //Request parameters
      statType: 'PlayerGameStatsByPlayerID',
      //season:
      //playerID:
      //playerName
      //team
      //week
  };
  var playerNameArr = [];
  var playerIDArr = [];
  var masterStatsArr = [];


}); //close reset.click
// ___________END:RESET BUTTON___________________
console.log('ready');
});
