'use strict';
// _____________START:GLOBAL VARIABLES_______________________
var apiString = 'https://api.fantasydata.net/v3/nfl/stats/JSON/';
var startVal = '';
var endVal = '';
var thirdStats = [];
var playerObjID = {};
var queryStats = {};
// var tempArr = [];
// var weeklyArr = [];
var params = {
    //Request parameters
    statType: 'PlayerGameStatsByPlayerID',
    //season:
    //playerID:
    //playerName
    //team
    //week
};
// var paramsString = '';
var playerNameArr = [];
var playerIDArr = [];
// var playerName = '';
var masterStatsArr = [];

// _____________END:GLOBAL VARIABLES_______________________


//______________START:getWeeklyStats____________________
function getWeeklyStats(obj){
     $.ajax({
      url: apiString + obj.statType + "/" + obj.season + "/" + obj.week + "/" + obj.playerID,
      // set range values to equal weeks in api string
      type: "GET",
      success: function(data){
        console.log('yeehaw2');

        for(var j=0;j<playerNameArr.length;j++){
          var playerNameArrPlaceholder = playerNameArr[j]
          for(var i=0; i<thirdStats.length; i++){
            var thirdStatsPlaceholder = thirdStats[i];
            // console.log('playerName for ajax:', playerNameArrPlaceholder);
            if(data.Name === playerNameArrPlaceholder){
              queryStats[playerNameArrPlaceholder][thirdStatsPlaceholder].push([data['Week'],data[thirdStatsPlaceholder]]);
            }
          }
        }

      },
      error: function(){
        console.log('uh oh2');
      },
      beforeSend: setHeader,

      // Request body
      data: "{}"
    }); //close stats = ajax


    function setHeader(xhr){
      xhr.setRequestHeader("Ocp-Apim-Subscription-Key","a2f7e42648ea4c67b18eb8cb195d3593");
    }

    // $weeklyStats.done(function(data) {
    //   console.log("success2");
    //   for(var i=0; i<thirdStats.length; i++){
    //     var thirdStatsPlaceholder = thirdStats[i];
    //     queryStats[thirdStatsPlaceholder].push([data['Week'],data[thirdStatsPlaceholder]]);
    //   }
    // })
    //   $weeklyStats.fail(function() {
    //     console.log("error2");
    //   });
  // return queryStats; //close for loop
} //close getWeeklyStats
//____________________________END:getWeeklyStats_______________________

// ____________________START:SET PLAYER >> PLAYERID OBJ_______________________
      function getplayerIDObj() {
      var $playersAll = $.ajax({
        url:"https://api.fantasydata.net/v3/nfl/stats/JSON/PlayerSeasonStats/2016",
        //+"/"+params.week+"/"+params.team,
        type: "GET",
        success: function(){console.log('yeehaw');},
        error: function(){console.log('uh oh');},
        beforeSend: setHeader,
        // Request body
        data: "{}"
      });
      //close stats = ajax

      function setHeader(xhr){
        xhr.setRequestHeader("Ocp-Apim-Subscription-Key","a2f7e42648ea4c67b18eb8cb195d3593");
      }

      $playersAll.done(function(data) {
        console.log("success");
        // console.log(data);
        for(var i=0; i<data.length; i++){
          playerObjID[data[i].Name] = data[i].PlayerID;
        }
      });
      $playersAll.fail(function() {
        console.log("error");
      });
      }//close getplayerIDObj
// ______________________END:SET PLAYER >> PLAYERID OBJ_______________________






















//_____________________________________________________________________________________________________________START:GRAVEYARD________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________

// call flot
// $.plot($("#placeholder"), [d1]);
// d1 = array of values



// for (var i=2010;i<2017;i++){
//   // var seasonParam = seasonCount.toString();
//   // seasonCount++;
//   var season = parseInt(i)
//   console.log(season);
//
//   // _____________START:SET PLAYER >> PLAYERID OBJ_______________________
//   function getplayerIDObj() {
//   var $playersAll = $.ajax({
//     url:"https://api.fantasydata.net/v3/nfl/stats/JSON/PlayerSeasonStats/2016",
//     //+"/"+params.week+"/"+params.team,
//     type: "GET",
//     success: function(){console.log('yeehaw');},
//     error: function(){console.log('uh oh');},
//     beforeSend: setHeader,
//     // Request body
//     data: "{}"
//   });
//   //close stats = ajax
//
//   function setHeader(xhr){
//     xhr.setRequestHeader("Ocp-Apim-Subscription-Key","5221f2609abc4b349a569352e0438bf9");
//   }
//
//   $playersAll.done(function(data) {
//     console.log("success");
//     // console.log(data);
//     for(var i=0; i<data.length; i++){
//       playerObjID[data[i].Name] = data[i].PlayerID;
//     }
//   })
//   $playersAll.fail(function() {
//     console.log("error");
//   });
// };
//
// } //close for loop
// console.log(playerObjID);
//
//   // _____________END:SET PLAYER >> PLAYERID OBJ_______________________

// __________________________________________________________________________
// var $playerStats = $.ajax({
//     url: "https://api.fantasydata.net/v3/nfl/stats/JSON/PlayerSeasonStatsByPlayerID/2016/"+playerID,
//     //+"/"+params.week+"/"+params.team,
//     type: "GET",
//     success: function(){console.log('yeehaw');},
//     error: function(){console.log('uh oh');},
//     beforeSend: setHeader,
//
//     // Request body
//     data: "{}"
//   });
//   //close stats = ajax
//
//   function setHeader(xhr){
//     xhr.setRequestHeader("Ocp-Apim-Subscription-Key","5221f2609abc4b349a569352e0438bf9");
//   }
//
//   $playerStats.done(function(data) {
//     console.log("success");
//     console.log(data);
//     var queryStats = {};
//     var tweetContain = $('.tweets-container');
//     // for(var i=0; i<data.length; i++){
//       // playerObjID[data[i].Name] = data[i].PlayerID;
//       // console.log(data[i].PlayerID);
//       queryStats['Receptions'] = (data[0].Receptions);
//       queryStats['Receiving Yards'] = (data[0].ReceivingYards);
//       tweetContain.text('Receptions: '+queryStats['Receptions']+'\n'+ 'Receiving Yards: '+queryStats['Receiving Yards']);
//
//       // }
//     })
//     $playerStats.fail(function() {
//       console.log("error");
//     });
// __________________________________________________________________________

// __________________________________________________________________________
// function displayStats(obj) {
//   for(var key in obj){
//       $('#stat').append('<p>'+key+'</p>');
//       $('#statVal').append('<p>'+obj[key].join()+'</p>');
//   }
// } //close displayStats
// __________________________________________________________________________

// __________________________________________________________________________
// $('.first').on('click', function(){
//   var firstRadio = $('.first:checked');
//   console.log('picked first radio!');
//   console.log(firstRadio.val());
//   if (firstRadio.val() === 'player'){
//     modify.html('<input class="second" type="text">Player Name</input>');
//   } //close 'if' player selector
//
//   if (firstRadio.val() === 'team'){
//     modify.html('<select class="second" name="values"><option value="ARI">Arizona Cardinals</option><option value="ATL" selected>Atlanta Falcons</option><option value="BAL">Baltimore Ravens</option><option value="BUF">Buffalo Bills</option><option value="CAR">Carolina Panthers</option><option value="CHI">Chicago Bears</option><option value="CIN">Cincinnati Bengals</option><option value="CLE">Cleveland Browns</option><option value="DAL">Dallas Cowboys</option><option value="DEN">Denver Broncos</option><option value="DET">Detroit Lions</option><option value="GB">Green Bay Packers</option><option value="HOU">Houston Texans</option><option value="IND">Indianapolis Colts</option><option value="JAX">Jacksonville Jaguars</option><option value="KC">Kansas City Chiefs</option><option value="LA">Los Angeles Rams</option><option value="MIA">Miami Dolphins</option><option value="MIN">Minnesota Vikings</option><option value="NE">New England Patriots</option><option value="NO">New Orleans Saints</option><option value="NYG">New York Giants</option><option value="NYJ">New York Jets</option><option value="OAK">Oakland Raiders</option><option value="PHI">Philadelphia Eagles</option><option value="PIT">Pittsburgh Steelers</option><option value="SD">San Diego Chargers</option><option value="SF">San Francisco 49ers</option><option value="SEA">Seattle Seahawks</option><option value="TB">Tampa Bay Buccaneers</option><option value="TEN">Tennessee Titans</option><option value="WAS">Washington Redskins</option></select>');
//
//   } //close 'if' team selector
// }); //close first.click
// __________________________________________________________________________

// __________________________________________________________________________
// $('.range').on('click', function(){
//   console.log('picked range radio!');
//   var rangeRadio = $('.range:checked');
//   console.log(rangeRadio.val());
//
//   if (rangeRadio.val() === 'weekly'){
//     rangeSelect.html('<input class="rangeInputOne" type="text">Week Start</input><br><input class="rangeInputTwo" type="text">Week End</input>');
//   } //close 'if' weekly
//   if (rangeRadio.val() === 'seasonly'){
//     rangeSelect.html('<input class="rangeInputOne" type="text">Season Start</input><br><input class="rangeInputTwo" type="text">Season End</input>');
//
//   } //close 'if' seasonly
//
// }); //close rangeRadio.click
// __________________________________________________________________________

// _________________submit ifs________________________________________________
  // if (firstRadio.val() === 'player'){
  //   //set path for indv. player stats
  //   playerName = secondDiv.val();
  //   params.playerID = playerObjID[playerName];
  //
  //   if(rangeRadio.val() === 'weekly'){
  //     params.statType = 'PlayerGameStatsByPlayerID';
  //     for(var i=loopStart;i<loopEnd;i++){
  //       params.week = i;
  //       getWeeklyStats(params);
  //       console.log(queryStats);
  //   }

        // for(var i=0; i<thirdStats.length; i++){
        //   var thirdStatsPlaceholder = thirdStats[i];
        //   queryStats[thirdStatsPlaceholder].push([fuckthisshit['Week'],fuckthisshit[thirdStatsPlaceholder]]);
        // }


      // console.log(queryStats);
      // displayStats(queryStats)
    //}

    // if(rangeRadio.val() === 'seasonly'){
    //   getSeasonlyStats();
    // }
  //}   //close 'if' player selection

  // if (firstRadio.val() === 'team'){
  //   console.log('team/submit');
  //   params.teamName = secondDiv.val();
  //   console.log(params.teamName);
  // } //close 'if' team selection

// __________________________________________________________________________
