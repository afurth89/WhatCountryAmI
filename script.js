$( document ).ready(function() {

  var $startBtn = $('#startButton');
  var $playerGuessForm = $('#playerGuess');
  var $playerGuess = $('#playerGuessText');
  var guessFormatted;
  var answerFormatted;
  var answerVsGuess;
  var $playerScore = $('#playerScore');
  var $banner = $('#banner');
  var $bannerContainer = $('#bannerContainer');
  var imagesShownCount = 0;     // # of images successfully displayed
  var guessCount = 0;           // # of total guesses
  var correctCount = 0;         // # of correct guesses
  var incorrectCount = 0;       // # of incorrect guesses

  // Variables that will be used to display each map image
  var currentCountryCode;
  var regionCode;
  // Variable that will hold the country name to check 
  // against user guess
  var countryName;


  //A JSON file that maps ISO2 country codes to ISO2 continent codes
  //http://country.io/data/
  var countryCodesList = {"BD": "AS", "BE": "EU", "BF": "AF", "BG": "EU", "BA": "EU", "BB": "NA", "WF": "OC", "BL": "NA", "BM": "NA", "BN": "AS", "BO": "SA", "BH": "AS", "BI": "AF", "BJ": "AF", "BT": "AS", "JM": "NA", "BW": "AF", "WS": "OC", "BQ": "NA", "BR": "SA", "BS": "NA", "JE": "EU", "BY": "EU", "BZ": "NA", "RU": "EU", "RW": "AF", "RS": "EU", "TL": "OC", "RE": "AF", "TM": "AS", "TJ": "AS", "RO": "EU", "TK": "OC", "GW": "AF", "GU": "OC", "GT": "NA", "GR": "EU", "GQ": "AF", "GP": "NA", "JP": "AS", "GY": "SA", "GG": "EU", "GF": "SA", "GE": "AS", "GD": "NA", "GB": "EU", "GA": "AF", "SV": "NA", "GN": "AF", "GM": "AF", "GL": "NA", "GI": "EU", "GH": "AF", "OM": "AS", "TN": "AF", "JO": "AS", "HR": "EU", "HT": "NA", "HU": "EU", "HK": "AS", "HN": "NA", "VE": "SA", "PR": "NA", "PS": "AS", "PW": "OC", "PT": "EU", "SJ": "EU", "PY": "SA", "IQ": "AS", "PA": "NA", "PF": "OC", "PG": "OC", "PE": "SA", "PK": "AS", "PH": "AS", "PN": "OC", "PL": "EU", "PM": "NA", "ZM": "AF", "EH": "AF", "EE": "EU", "EG": "AF", "ZA": "AF", "EC": "SA", "IT": "EU", "VN": "AS", "SB": "OC", "ET": "AF", "SO": "AF", "ZW": "AF", "SA": "AS", "ES": "EU", "ER": "AF", "ME": "EU", "MD": "EU", "MG": "AF", "MF": "NA", "MA": "AF", "MC": "EU", "UZ": "AS", "MM": "AS", "ML": "AF", "MO": "AS", "MN": "AS", "MH": "OC", "MK": "EU", "MU": "AF", "MT": "EU", "MW": "AF", "MV": "AS", "MQ": "NA", "MP": "OC", "MS": "NA", "MR": "AF", "IM": "EU", "UG": "AF", "TZ": "AF", "MY": "AS", "MX": "NA", "IL": "AS", "FR": "EU", "IO": "AS", "SH": "AF", "FI": "EU", "FJ": "OC", "FK": "SA", "FM": "OC", "FO": "EU", "NI": "NA", "NL": "EU", "NO": "EU", "NA": "AF", "VU": "OC", "NC": "OC", "NE": "AF", "NF": "OC", "NG": "AF", "NZ": "OC", "NP": "AS", "NR": "OC", "NU": "OC", "CK": "OC", "XK": "EU", "CI": "AF", "CH": "EU", "CO": "SA", "CN": "AS", "CM": "AF", "CL": "SA", "CC": "AS", "CA": "NA", "CG": "AF", "CF": "AF", "CD": "AF", "CZ": "EU", "CY": "EU", "CX": "AS", "CR": "NA", "CW": "NA", "CV": "AF", "CU": "NA", "SZ": "AF", "SY": "AS", "SX": "NA", "KG": "AS", "KE": "AF", "SS": "AF", "SR": "SA", "KI": "OC", "KH": "AS", "KN": "NA", "KM": "AF", "ST": "AF", "SK": "EU", "KR": "AS", "SI": "EU", "KP": "AS", "KW": "AS", "SN": "AF", "SM": "EU", "SL": "AF", "SC": "AF", "KZ": "AS", "KY": "NA", "SG": "AS", "SE": "EU", "SD": "AF", "DO": "NA", "DM": "NA", "DJ": "AF", "DK": "EU", "VG": "NA", "DE": "EU", "YE": "AS", "DZ": "AF", "US": "NA", "UY": "SA", "YT": "AF", "UM": "OC", "LB": "AS", "LC": "NA", "LA": "AS", "TV": "OC", "TW": "AS", "TT": "NA", "TR": "AS", "LK": "AS", "LI": "EU", "LV": "EU", "TO": "OC", "LT": "EU", "LU": "EU", "LR": "AF", "LS": "AF", "TH": "AS", "TG": "AF", "TD": "AF", "TC": "NA", "LY": "AF", "VA": "EU", "VC": "NA", "AE": "AS", "AD": "EU", "AG": "NA", "AF": "AS", "AI": "NA", "VI": "NA", "IS": "EU", "IR": "AS", "AM": "AS", "AL": "EU", "AO": "AF", "AS": "OC", "AR": "SA", "AU": "OC", "AT": "EU", "AW": "NA", "IN": "AS", "AX": "EU", "AZ": "AS", "IE": "EU", "ID": "AS", "UA": "EU", "QA": "AS", "MZ": "AF"};

  //Counter for transforming countryCodeList
  var i = 0;
  var arrayOfCountryCodes;

  //***************************************************************************
  //ON PAGE LOAD
  //***************************************************************************
  $banner.addClass('hidden');

  //Array, where each sub-array has two elements:
  //[0]: The country code, [1]: The continent code 
  arrayOfCountryCodes = _.transform(countryCodesList, function(result, val, key) {
    result[i] = [];                               //Create empty sub-array
    result[i].push(key);                          //Push country code to sub-array[0]
    if (countryCodesList[key] === "AS") {         //Determine 3-digit ISO2 continent code
      result[i].push('142');                      //from two-letter ISO2 continent code
    } else if (countryCodesList[key] === "EU") {  //and push to sub-array[1]
      result[i].push('150');
    } else if (countryCodesList[key] === "AF") {
      result[i].push('002');
    } else if (countryCodesList[key] === "NA") {
      result[i].push('019');
    } else if (countryCodesList[key] === "OC") {
      result[i].push('009');
    } else if (countryCodesList[key] === "SA") {
      result[i].push('019');
    }
    i++;
  }, []);

  // Shuffles Country Code Array on page load
  arrayOfCountryCodes = _.shuffle(arrayOfCountryCodes);

  // Next two lines are Google's Code - DO NOT CHANGE
  // https://developers.google.com/chart/interactive/docs/gallery/geochart
  google.charts.load('current', {'packages':['geochart']});
  google.charts.setOnLoadCallback(drawRegionsMap);

  //***************************************************************************
  //START GAME
  //***************************************************************************
  $startBtn.on('click', function() {
    $startBtn.addClass('hidden');
    $banner.removeClass('hidden').text("Go!");
    getNewCountry();
    $playerGuess.focus();
    var oneMinute = 60,
            display = document.querySelector('#time');
        startTimer(oneMinute, display);
  });

  //***************************************************************************
  //USES GUESSES
  //***************************************************************************
  $playerGuessForm.submit(function(e) {
    e.preventDefault();
    $playerGuess = $('#playerGuessText').val();
    $('#playerGuessText').val("");
    
    // Format guess and answer
    guessFormatted = makeSortArray($playerGuess);
    answerFormatted = makeSortArray(countryName);
    
    // Compare guess and answer - returns array with any overlapping elements
    answerVsGuess = _.intersectionWith(guessFormatted, answerFormatted, _.isEqual);

    guessCount++;
    // Checking guess against correct answer
    if (answerVsGuess.length !== 0) {
      $banner.removeClass('hidden').html(`You are correct, that is <strong>${countryName}</strong>`);
      $bannerContainer.removeClass('bg-info bg-danger').addClass('bg-success');
      correctCount++;
    } else {
      $banner.removeClass('hidden').html(`Sorry, that's <strong>${countryName}</strong>`);
      $bannerContainer.removeClass('bg-info bg-success').addClass('bg-danger');
      incorrectCount++;
    }
    $playerScore.text(`Player Score: ${correctCount}`);
    
    // Generate a new country
    getNewCountry();
  });  
  
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

  function getNewCountry() {
    $.ajax({
      url: 'http://ws.postcoder.com/pcw/PCW45-12345-12345-1234X/country/' + arrayOfCountryCodes[imagesShownCount][0] + '?format=json',
      method: "GET",
      success: function(data) {
        console.log(data);  //DELETE BEFORE FINSIHED
        currentCountryCode = arrayOfCountryCodes[imagesShownCount][0];
        regionCode = arrayOfCountryCodes[imagesShownCount][1];
        countryName = data.countryname;
        console.log(countryName); //DELETE BEFORE FINSIHED
        drawRegionsMap();
        imagesShownCount++;
      }
    });
  }

  // Creates array where each element is:
  // a word, lower-case, w/ non-letters removed and non-English
  // characters replaced
  // http://stackoverflow.com/questions/286921/efficiently-replace-all-accented-characters-in-a-string
  var makeSortArray = (function() {
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

  // Timer function
  // http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
  function startTimer(duration, display) {
      var start = Date.now(),
          diff,
          minutes,
          seconds;
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
      }
      // we don't want to wait a full second before the timer starts
      timer();
      setInterval(timer, 1000);
  }
   
});

