var locInput = document.getElementById("location")
var searchBtn = document.getElementById("searchBtn")
var baseGeoUrl = "http://api.openweathermap.org/geo/1.0/direct?q="
var baseWeatherUrl = "http://api.openweathermap.org/data/2.5/forecast?"
var apiKey = "6426d43d857f40b3422eb5a180b2eac8"
var cityName = "Kansas City"

// lat={lat}&lon={lon}&appid={API key}"

// http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}
function buildGeoUrl(cityName) {
    return baseGeoUrl + cityName + "&limit=1&appid=" + apiKey
}
function buildWeatherUrl(lat, lon) {
    return baseWeatherUrl + "lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
}

function getCoords(cityName) {
    var url = buildGeoUrl(cityName)
    fetch(url)
        .then(function (res) {
            return res.json()
        }).then(function (data) {
            console.log(data)
            var lat = data[0].lat
            var lon = data[0].lon
            var url = buildWeatherUrl(lat, lon)
            return url
        }).then(getWeather)
}
function getWeather(url){
   fetch(url)
        .then(function (res){
            return res.json()
        }).then(function(data){
            console.log(data)
            var reports = data.list
            for (var i=0;i < reports.length; i+=8){
                var report = reports[i]
                console.log(report)
            }
        })
    
}
function kelvinToF(kel){
    return (kel-273.15)*(9/5)+32
    
}
// (32°F − 32) × 5/9 + 273.15 = 273.15K
getCoords(cityName)