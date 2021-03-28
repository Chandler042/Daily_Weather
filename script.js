$(function () {
    // variables
    var searchHistoryArray = []
    const daysToForecast = 5;
    const apiKey = "2d37a89af45e587ef6e879382a3382d7";
    const inputField = $("#city-input");
    var cityName;
    var todaysDate = moment().format("D MMMM YYYY");
    var inputSwitch;
    var listCity;

    if (localStorage.getItem("Weather search history")) {
        var arrayFromStorage = localStorage
        .getItem("Weather search history")
        .split(",");
    } else {
        var arrayFromStorage;
    }

    $("#search-btn").on("click", function () {
        event.preventDefault();

        if (inputField.val() === "") {
            // blank do nothing
            return;
        } else {
            inputSwitch = true;
            showWeather();
        }
    });

    $("#clear-btn").on("click", function () {
        console.log("clear");
        localStorage.removeItem("Weather search history");
        location.reload();
    });
    
    $(document).on("click", ".list-group-item", function () {
        inputSwitch = false;
        listCity = $(this).text();
        showWeather();
    });

    function onLoad() {
        $("#search-history-items").empty();
    
        if (arrayFromStorage) {
          searchHistoryArray = arrayFromStorage;
        }
    
        for (let i = 0; i < searchHistoryArray.length; i++) {
          var aSearchTerm = $("<li>").text(searchHistoryArray[i]);
          aSearchTerm.addClass("list-group-item");
          $("#search-history-items").prepend(aSearchTerm);
        }
    }
    onLoad();

    function showWeather() {
        Event.preventDefault();

        if (inputSwitch) {
            cityName = inputField.val();
        } else {
            cityName = listCity;
        }

        $("#header-row").empty();
        $("#current-weather-data").empty();
        $("#forecast-row").empty();

        var currentWeatherQueryUrL = "https://api.openweathermap.org/data/2.5/weather?q" + cityName + "&units=imperial&appid=" + apiKey;

        $.ajax({
            url: currentWeatherQueryUrL,
            method: "GET",
        }).then(function (response) {
            cityName = response.name;

            if (response) {
                if (searchHistoryArray.includes(cityName) === false) {
                    populateSearchBar();
                }
            } else {
                alert("not a valid city name");
            }

            cityNameAndDate = $("<h4>").text(response.name + " (" + todaysDate + ")");
            currentIconE1 = $("<img id= 'current-weather-icon'>").attr(

            )
        })
    }
}); 