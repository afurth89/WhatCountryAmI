$( document ).ready(function() {

  var $timerContainer = $('#timerContainer');
  var $timer = $('#timer');
  var $bannerContainer = $('#bannerContainer');
  var $startBtn = $('#startButton');
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


  //A JSON file that maps ISO2 country codes to ISO2 continent codes
  //http://country.io/data/
  var countryCodesObj =
  { BD: { region: '034' },
    BE: { region: '155' },
    BF: { region: '011' },
    BG: { region: '151' },
    BA: { region: '039' },
    BB: { region: '029' },
    WF: { region: '061' },
    BL: { region: '029' },
    BM: { region: '021' },
    BN: { region: '035' },
    BO: { region: '005' },
    BH: { region: '145' },
    BI: { region: '014' },
    BJ: { region: '011' },
    BT: { region: '034' },
    JM: { region: '029' },
    BW: { region: '018' },
    WS: { region: '061' },
    BR: { region: '005' },
    BS: { region: '029' },
    JE: { region: '154' },
    BY: { region: '151' },
    BZ: { region: '013' },
    RU: { region: '151' },
    RW: { region: '014' },
    RS: { region: '039' },
    TL: { region: '035' },
    RE: { region: '014' },
    TM: { region: '143' },
    TJ: { region: '143' },
    RO: { region: '151' },
    TK: { region: '061' },
    GW: { region: '011' },
    GU: { region: '057' },
    GT: { region: '013' },
    GR: { region: '039' },
    GQ: { region: '017' },
    GP: { region: '029' },
    JP: { region: '030' },
    GY: { region: '005' },
    GG: { region: '154' },
    GF: { region: '005' },
    GE: { region: '145' },
    GD: { region: '029' },
    GB: { region: '154' },
    GA: { region: '017' },
    SV: { region: '013' },
    GN: { region: '011' },
    GM: { region: '011' },
    GL: { region: '021' },
    GI: { region: '039' },
    GH: { region: '011' },
    OM: { region: '145' },
    TN: { region: '015' },
    JO: { region: '145' },
    HR: { region: '039' },
    HT: { region: '029' },
    HU: { region: '151' },
    HK: { region: '030' },
    HN: { region: '013' },
    VE: { region: '005' },
    PR: { region: '029' },
    PS: { region: '145' },
    PW: { region: '057' },
    PT: { region: '039' },
    SJ: { region: '154' },
    PY: { region: '005' },
    IQ: { region: '145' },
    PA: { region: '013' },
    PF: { region: '061' },
    PG: { region: '054' },
    PE: { region: '005' },
    PK: { region: '034' },
    PH: { region: '035' },
    PN: { region: '061' },
    PL: { region: '151' },
    PM: { region: '021' },
    ZM: { region: '014' },
    EH: { region: '015' },
    EE: { region: '154' },
    EG: { region: '015' },
    ZA: { region: '018' },
    EC: { region: '005' },
    IT: { region: '039' },
    VN: { region: '035' },
    SB: { region: '054' },
    ET: { region: '014' },
    SO: { region: '014' },
    ZW: { region: '014' },
    SA: { region: '145' },
    ES: { region: '039' },
    ER: { region: '014' },
    ME: { region: '039' },
    MD: { region: '151' },
    MG: { region: '014' },
    MF: { region: '029' },
    MA: { region: '015' },
    MC: { region: '155' },
    UZ: { region: '143' },
    MM: { region: '035' },
    ML: { region: '011' },
    MO: { region: '030' },
    MN: { region: '030' },
    MH: { region: '057' },
    MK: { region: '039' },
    MU: { region: '014' },
    MT: { region: '039' },
    MV: { region: '034' },
    MQ: { region: '029' },
    MP: { region: '057' },
    MS: { region: '029' },
    MR: { region: '011' },
    IM: { region: '154' },
    UG: { region: '014' },
    TZ: { region: '014' },
    MY: { region: '035' },
    MX: { region: '013' },
    IL: { region: '145' },
    FR: { region: '155' },
    SH: { region: '011' },
    FI: { region: '154' },
    FJ: { region: '054' },
    FK: { region: '005' },
    FM: { region: '057' },
    FO: { region: '154' },
    NI: { region: '013' },
    NL: { region: '155' },
    NO: { region: '154' },
    NA: { region: '018' },
    VU: { region: '054' },
    NC: { region: '054' },
    NE: { region: '011' },
    NF: { region: '053' },
    NG: { region: '011' },
    NZ: { region: '053' },
    NP: { region: '034' },
    NR: { region: '057' },
    NU: { region: '061' },
    CK: { region: '061' },
    CI: { region: '011' },
    CH: { region: '155' },
    CO: { region: '005' },
    CN: { region: '030' },
    CM: { region: '017' },
    CL: { region: '005' },
    CA: { region: '021' },
    CG: { region: '017' },
    CF: { region: '017' },
    CD: { region: '017' },
    CZ: { region: '151' },
    CY: { region: '145' },
    CR: { region: '013' },
    CV: { region: '011' },
    CU: { region: '029' },
    SZ: { region: '018' },
    SY: { region: '145' },
    KG: { region: '143' },
    KE: { region: '014' },
    SR: { region: '005' },
    KI: { region: '057' },
    KH: { region: '035' },
    KN: { region: '029' },
    KM: { region: '014' },
    ST: { region: '017' },
    SK: { region: '151' },
    KR: { region: '030' },
    SI: { region: '039' },
    KP: { region: '030' },
    KW: { region: '145' },
    SN: { region: '011' },
    SM: { region: '039' },
    SL: { region: '011' },
    SC: { region: '014' },
    KZ: { region: '143' },
    KY: { region: '029' },
    SG: { region: '035' },
    SE: { region: '154' },
    SD: { region: '015' },
    DO: { region: '029' },
    DM: { region: '029' },
    DJ: { region: '014' },
    DK: { region: '154' },
    VG: { region: '029' },
    DE: { region: '155' },
    YE: { region: '145' },
    DZ: { region: '015' },
    US: { region: '021' },
    UY: { region: '005' },
    YT: { region: '014' },
    LB: { region: '145' },
    LC: { region: '029' },
    LA: { region: '035' },
    TV: { region: '061' },
    TW: { region: '030' },
    TT: { region: '029' },
    TR: { region: '145' },
    LK: { region: '034' },
    LI: { region: '155' },
    LV: { region: '154' },
    TO: { region: '061' },
    LT: { region: '154' },
    LU: { region: '155' },
    LR: { region: '011' },
    LS: { region: '018' },
    TH: { region: '035' },
    TG: { region: '011' },
    TD: { region: '017' },
    TC: { region: '029' },
    LY: { region: '015' },
    VA: { region: '039' },
    VC: { region: '029' },
    AE: { region: '145' },
    AD: { region: '039' },
    AG: { region: '029' },
    AF: { region: '034' },
    AI: { region: '029' },
    VI: { region: '029' },
    IS: { region: '154' },
    IR: { region: '034' },
    AM: { region: '145' },
    AL: { region: '039' },
    AO: { region: '017' },
    AS: { region: '061' },
    AR: { region: '005' },
    AU: { region: '053' },
    AT: { region: '155' },
    AW: { region: '029' },
    IN: { region: '034' },
    AX: { region: '154' },
    AZ: { region: '145' },
    IE: { region: '154' },
    ID: { region: '035' },
    UA: { region: '151' },
    QA: { region: '145' },
    MZ: { region: '014' }};

  //Counter for transforming countryCodesObj
  var i = 0;
  var arrayOfCountryInfo;

  //***************************************************************************
  //ON PAGE LOAD
  //***************************************************************************
  $banner.addClass('hidden');

  //Array, where each sub-array has two elements:
  //[0]: The country code, [1]: The region code 
  arrayOfCountryInfo = _.transform(countryCodesObj, function(result, val, key, obj) {
    result[i] = [];                               //Create empty sub-array
    result[i].push(key);                          //Push country code to sub-array[0]
    result[i].push(val.region);                   //Push region code to sub-array[1]
    i++;
  }, []);

  // Shuffles Country Code Array on page load
  arrayOfCountryInfo = _.shuffle(arrayOfCountryInfo);

  // Next two lines are Google's Code - DO NOT CHANGE
  // https://developers.google.com/chart/interactive/docs/gallery/geochart
  google.charts.load('current', {'packages':['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);

  //***************************************************************************
  //START GAME
  //***************************************************************************
  $startBtn.on('click', startGame);

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

