$( document ).ready(function() {

  var $timerContainer = $('#timerContainer');
  var $timer = $('#timer');
  var $bannerContainer = $('#bannerContainer');
  var $startBtn = $('.startBtn');
  var $lvlOneBtn = $('#lvl1Btn');
  var $lvlTwoBtn = $('#lvl2Btn');
  var $lvlThreeBtn = $('#lvl3Btn');
  var $lvlFourBtn = $('#lvl4Btn');
  var $banner = $('#banner');
  var $scoreContainer = $('#scoreContainer');
  var $playerScore = $('#playerScore');
  var $playerGuessForm = $('#playerGuessForm');
  var $playerGuess = $('#playerGuessText');
  var $openingVid = $('#openingVid');
  var $regions_div = $('#regions_div');
  var oneMinute = 60;
  var guessFormatted;
  var answerFormatted;
  var answerVsGuess;
  var imagesShownCount = 0;     // # of images successfully displayed
  var guessCount = 0;           // # of total guesses
  var correctCount = 0;         // # of correct guesses
  var incorrectCount = 0;       // # of incorrect guesses
  var $resultsInfo = $('#resultsInfo');
  var $displayCorrect = $('#displayCorrect');
  var $displayTotal = $('#displayTotal');
  var displayPctNum;
  var $displayPct = $('#displayPct');
  var $resultsImg = $('#resultsImg');
  var imgURL;
  var $resetBtn = $('#resetButton');

  // Variables that will be used to display each map image
  var currentCountryCode;
  var regionCode;
  // Variable that will hold the country name to check 
  // against user guess
  var countryName;

  //Counter for transforming masterCountryObj
  var total = 0;
  var returned = 0; 
  var arrayOfCountryInfo;

  //***************************************************************************
  //ON PAGE LOAD
  //***************************************************************************
  $banner.addClass('hidden');

  //Array, where each sub-array has two elements:
  //[0]: The country code, [1]: The region code 
  // arrayOfCountryInfo = _.transform(masterCountryObj, function(result, val, key, obj) {
  //   result[i] = [];                               //Create empty sub-array
  //   result[i].push(key);                          //Push country code to sub-array[0]
  //   result[i].push(val.region);                   //Push region code to sub-array[1]
  //   i++;
  // }, []);

  // // Shuffles Country Code Array on page load
  // arrayOfCountryInfo = _.shuffle(arrayOfCountryInfo);

  // Next two lines are Google's Code - DO NOT CHANGE
  // https://developers.google.com/chart/interactive/docs/gallery/geochart
  google.charts.load('current', {'packages':['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);

  //***************************************************************************
  //START GAME
  //***************************************************************************
  // $startBtn.on('click', startGame);
  $lvlOneBtn.on("click", function() {
    //run level one sort
    var lvlOneArray = _.transform(masterCountryObj, function(result, val, key, obj) {
        if (val.difficulty === "1") {
          result[returned] = [];                               //Create empty sub-array
          result[returned].push(key);                          //Push country code to sub-array[0]
          result[returned].push(val.region);                  //Push region code to sub-array[1]
          returned++;                                         
        }
        total++;
      }, []); 
    console.log(lvlOneArray);
    //shuffle level one
    arrayOfCountryInfo = _.shuffle(lvlOneArray);
    //start game
    startGame();
  });

  $lvlTwoBtn.on("click", function() {
    var lvlTwoArray = _.transform(masterCountryObj, function(result, val, key, obj) {
        if (val.difficulty === "1" ||
            val.difficulty === "2") {
          result[returned] = [];                               //Create empty sub-array
          result[returned].push(key);                          //Push country code to sub-array[0]
          result[returned].push(val.region);                  //Push region code to sub-array[1]
          returned++;                                         
        }
        total++;
      }, []); 
    console.log(lvlTwoArray);
    //shuffle level two
    arrayOfCountryInfo = _.shuffle(lvlTwoArray);
    //start game
    startGame();
  });

  $lvlThreeBtn.on("click", function() {
    var lvlThreeArray = _.transform(masterCountryObj, function(result, val, key, obj) {
        if (val.difficulty === "1" ||
            val.difficulty === "2" ||
            val.difficulty === "3") {
          result[returned] = [];                               //Create empty sub-array
          result[returned].push(key);                          //Push country code to sub-array[0]
          result[returned].push(val.region);                  //Push region code to sub-array[1]
          returned++;                                         
        }
        total++;
      }, []); 
    console.log(lvlThreeArray);
    //shuffle level three
    arrayOfCountryInfo = _.shuffle(lvlThreeArray);
    //start game
    startGame();
  });

  $lvlFourBtn.on("click", function() {
    arrayOfCountryInfo = _.transform(masterCountryObj, function(result, val, key, obj) {
      result[total] = [];                               //Create empty sub-array
      result[total].push(key);                          //Push country code to sub-array[0]
      result[total].push(val.region);                   //Push region code to sub-array[1]
      total++;
    }, []);
    console.log(arrayOfCountryInfo);
    //run level four sort
    arrayOfCountryInfo = _.shuffle(arrayOfCountryInfo);
    //start game
    startGame();
  });

  //***************************************************************************
  //USES GUESSES
  //***************************************************************************
  $playerGuessForm.submit(processUserGuess);  
  
  //***************************************************************************
  //RESET GAME
  //***************************************************************************
  $resetBtn.on('click', resetGame);


  //***************************************************************************
  //FUNCTION DEFINITIONS
  //***************************************************************************

  // Google's drawRegionsMap function - DO NOT CHANGE (except variables)
  // https://developers.google.com/chart/interactive/docs/gallery/geochart
  function drawRegionsMap() {

    var data = google.visualization.arrayToDataTable([
      ['Country'],
      [currentCountryCode],   //currentCountryCode
    ]);

    var options = {
      defaultColor: "red",
      datalessRegionColor: "#D3D3D3",
      forceIFrame: true,
      region: regionCode,            //COME BACK TO THIS  regionCode
      // height: 300,
      width: 600,
      magnifyingGlass: {
        enable: true, 
        zoomFactor: 7.5
      }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    google.visualization.events.addListener(chart, 'ready', function () {
        regions_div.innerHTML = '<img src="' + chart.getImageURI() + '">';
      });
    
    chart.draw(data, options);
  }
  
  // Initiates start of the game
  function startGame() {
      $startBtn.addClass('hidden');
      $openingVid.addClass('hidden');
      $regions_div.removeClass('hidden');
      $banner.removeClass('hidden').text("Go!");
      getNewCountry();
      $playerGuess.focus();    
      display = document.querySelector('#time');
      startTimer(oneMinute, display);
    }

  // Timer function
  // http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
  function startTimer(duration, display) {
      var start = Date.now(),
          diff,
          minutes,
          seconds,
          gameTimer;
      function timer() {
          // get the number of seconds that have elapsed since 
          // startTimer() was called
          diff = duration - (((Date.now() - start) / 1000) | 0);

          // does the same job as parseInt truncates the float
          minutes = (diff / 60) | 0;
          seconds = (diff % 60) | 0;

          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;

          display.textContent = minutes + ":" + seconds; 

          if (diff <= 0) {
              // add one second so that the count down starts at the full duration
              // example 05:00 not 04:59
              start = Date.now() + 1000;
          }
          if (minutes === "00" && seconds === "00") {
            // stop the timer
            clearInterval(gameTimer);
            gameOver();
          }
      }
      // we don't want to wait a full second before the timer starts
      timer();
      gameTimer = setInterval(timer, 1000);
  }
  
  // Displays a new country
  function getNewCountry() {
    $.ajax({
      url: 'http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/country/' + arrayOfCountryInfo[imagesShownCount][0] + '?format=json',
      method: "GET",
      success: function(data) {
        assignCountryInfo(data);
        drawRegionsMap();
        imagesShownCount++;
      }
    });
  }

  // Collects country information and plugs it into Google's drawRegionsMap function
  function assignCountryInfo(data) {
    // console.log(data); 
    currentCountryCode = arrayOfCountryInfo[imagesShownCount][0];
    regionCode = arrayOfCountryInfo[imagesShownCount][1];
    countryName = data.countryname;
    // console.log(countryName);
  }

  // Takes user's guess, formats it, checks it, and generates the next map
  function processUserGuess(e) {
      e.preventDefault();
      $playerGuessVal = $('#playerGuessText').val();
      $('#playerGuessText').val("");
      
      // Format guess and answer
      guessFormatted = formatAnswerForCheck($playerGuessVal);
      answerFormatted = formatAnswerForCheck(countryName);
      
      // Compare guess and answer - returns array with any overlapping elements
      answerVsGuess = _.intersectionWith(guessFormatted, answerFormatted, _.isEqual);

      guessCount++;
      // Checking guess against correct answer
      checkAnswer();
      $playerScore.text(`Player Score: ${correctCount}`);
      
      // Generate a new country
      getNewCountry();
    }

  // Creates array where each element is:
  // a word, lower-case, w/ non-letters removed and non-English
  // characters replaced
  // http://stackoverflow.com/questions/286921/efficiently-replace-all-accented-characters-in-a-string
  var formatAnswerForCheck = (function() {
    var translate_re = /[ôé',()-]/g;
    var translate = {
      "ô": "o", "é": "e", "(": "", 
      ")": "", "-": "", "'": "", ",": ""   // probably more to come
    };
    return function(s) {
      return ( s.replace(translate_re, function(match) { 
        return translate[match]; 
      }).toLowerCase().split(" ") );
    };
  })();


  //Checks user's answer vs correct answer
  function checkAnswer() {
    if (answerVsGuess.length !== 0) {
      $banner.removeClass('hidden').html(`You are correct, that is <strong>${countryName}</strong>`);
      $bannerContainer.removeClass('bg-info bg-danger').addClass('bg-success');
      correctCount++;
    } else {
      $banner.removeClass('hidden').html(`Sorry, that's <strong>${countryName}</strong>`);
      $bannerContainer.removeClass('bg-info bg-success').addClass('bg-danger');
      incorrectCount++;
    }
  }

  // Triggered when the game ends (when the timer runs out)
  function gameOver() {
    //Timer and Score text displays "Game Over"
    $timerContainer.removeClass('bg-warning').addClass('bg-danger');
    $timer.addClass('gameOver').text("GAME OVER");
    $scoreContainer.removeClass('bg-warning').addClass('bg-danger');
    $playerScore.addClass('gameOver').text("GAME OVER");
    //Display answer for country when time expired - doesn't add to incorrect total
    $banner.removeClass('hidden').html(`Sorry, that's <strong>${countryName}</strong>`);
    $bannerContainer.removeClass('bg-info bg-success').addClass('bg-danger');
    // Hides the guess input form
    $playerGuessForm.addClass('hidden');
    //Map changes to display the player's performance
    $regions_div.addClass('hidden');
    $resultsInfo.removeClass('hidden');
    $displayCorrect.text(correctCount);
    $displayTotal.text(guessCount);
    displayPctNum = ((Math.round((correctCount/guessCount)*100)) || "0");
    $displayPct.text((displayPctNum + "%"));
    // Set results image
    setResultsImg(displayPctNum);
    //Ensures Reset Button appears
    $resetBtn.removeClass('hidden');
  }

  // Sets the results image depending on user's score % 
  function setResultsImg(num) {
    if (num > 75) {
      imgURL = "./images/borat_great_success.jpg";
    } else if (num <= 75 && num > 50) {
      imgURL = "./images/larry_pretty_good.jpg";
    } else if (num <= 50 && num > 25) {
      imgURL = "./images/african_kid_try_again.jpg";
    } else {
      imgURL = "./images/picard_wtf.jpg";
    }
    $resultsImg.attr("src", imgURL);
  }

  // Triggered when user clicks "Play Again" button
  function resetGame() {
    // Remove reset button and results div
    $resetBtn.addClass('hidden');
    $resultsInfo.addClass('hidden');
    //Timer and Score text resets
    $timerContainer.removeClass('bg-danger').addClass('bg-warning');
    $timer.removeClass('gameOver').html("Time Remaining:<br><span id='time'></span>");
    $scoreContainer.removeClass('bg-danger').addClass('bg-warning');
    $playerScore.removeClass('gameOver').text("Player Score");
    //Resets banner color to light blue and changes text
    $bannerContainer.removeClass('bg-danger').addClass('bg-info ');
    $banner.removeClass('hidden').text("Let's play again!");
    // Resets guess input form and map
    $playerGuessForm.removeClass('hidden');
    $regions_div.removeClass('hidden');
    
    getNewCountry();
    $playerGuess.focus();    
    display = document.querySelector('#time');
    startTimer(oneMinute, display);  
  }
  
});

