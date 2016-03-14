google.charts.load('current', {'packages':['geochart']});
google.charts.setOnLoadCallback(drawRegionsMap);


function drawRegionsMap() {

  var data = google.visualization.arrayToDataTable([
    ['Country'],
    ['Germany'],
  ]);

  var options = {
    defaultColor: "red",
    datalessRegionColor: "white",
    forceIFrame: true,
    region: "150",
    // height: 300,
    width: 700,
    // backgroundColor: {
    //   stroke: 'black',
    //   strokeWidth: 5
    // }
  };

  var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

  google.visualization.events.addListener(chart, 'ready', function () {
      regions_div.innerHTML = '<img src="' + chart.getImageURI() + '">';
    });
  
  chart.draw(data, options);
}