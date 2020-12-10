$(document).ready(function () {

    //Get searched locale data from local stor
    let getLocale = JSON.parse(localStorage.getItem('searched-locale'));
    if (getLocale === null) {
        getLocale = [];
    };
    //For loop to iterate through stored cites and write them to DOM in the <ul> element
    for (let i = 0; i < getLocale.length; i++) {
        $('<li>').addClass('list-group-item').text(getLocale[i]).appendTo('#searched-locale');
    }

    //*** API calls ***//
    //-----------------//
    //Function to call the APIs & append elements/data to the DOM. PositionStack is called to get the locales lat and long coords. They are then used in OpenWeather's API to get weather data.//
    const callAPI = ($locale) => {
        //Nominatim API
        let mapURL = `https://nominatim.openstreetmap.org/search?q=${$locale}&format=json&addressdetails=1&limit=1`
        $.ajax({
            url: mapURL,
            method: 'GET'
        }).then(function (map) {
            //Gets lat and long data from Position Stack API pull
            let lat = (map[0].lat);
            let lon = (map[0].lon);
            //OpenWeatherMap API 
            weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=b10aa733a604bec365209fb6e0c6574c`;
            $.ajax({
                url: weatherURL,
                method: 'GET'
            }).then(function (res) {
                //Write Location to jumbotron heading. If/else to allow for just state searches as well as cities
                if ('city' in map[0].address) {
                    $('#locale').html(`<img src=http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png>${map[0].address.city}, ${map[0].address.state}`);
                } else {
                    $('#locale').html(`<img src=https://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png >${map[0].address.state}, ${map[0].address.country}`);
                }
                //Write temp to jumbotron body
                $('#temp').text(`Temp: ${res.current.temp} \u00B0F`);
                //Write humidity to jumbotron body
                $('#humidity').text(`Humidity: ${res.current.humidity}\u0025`);
                //Write feels like temp to jumbotron body
                $('#feels-like').text(`Feels Like: ${res.current.feels_like} \u00B0F`);
                //Write wind speed to the jumbotron body
                $('#wind-speed').text(`Wind Speed: ${res.current.wind_speed} MPH`);
                //Write wind speed to the jumbotron body
                $('#uv-index').html(`UV Index: <span id="uv-num">${res.current.uvi}</span>`);
                //Colors the UV index dep[ending on its safety
                if ($('#uv-num').text() < 7) {
                    $('#uv-num').css('background-color', 'green');
                } else {
                    $('#uv-num').css('background-color', 'red');
                }

                //*** Create 5 day forecast cards ***//
                const dealCards = () => {
                    //Create the card clone
                    const $clone = $('.card-template').clone();
                    //For loop to create all 5 cards for forecast
                    for (let i = 1; i < 6; i++) {
                        //create the clone for the lop
                        const $copy = $clone.clone();
                        //set the id for all the cards
                        $copy.attr('id', `card-${i}`);
                        //Append the clones to the container
                        $($copy).appendTo('#card-deck');
                        //Adds h5 element for date
                        $('<h5>').attr('id', `card-date-${i}`).appendTo(`#card-${i}`);
                        //Adds h6 element for icon
                        $('<h6>').attr('id', `card-icon-${i}`).appendTo(`#card-${i}`);
                        //Add p elements for temp & humidity
                        $('<p>').attr('id', `card-temp-${i}`).appendTo(`#card-${i}`);
                        $('<p>').attr('id', `card-humidity-${i}`).appendTo(`#card-${i}`);
                        //Makes cards and heading visible
                        $copy.css('display', 'block');
                        $('#five-day-heading').css('display', 'block');
                    }
                }

                //*** Writes the weather info to the cards ***/
                const writeCards = () => {
                    for (let i = 1; i < 6; i++) {
                        //Writes date
                        $(`#card-date-${i}`).text(new Date(res.daily[i].dt * 1000).toLocaleDateString("en-US"));
                        //Writes weather icon
                        $(`#card-icon-${i}`).html(`<img src=http://openweathermap.org/img/wn/${res.current.weather[0].icon}.png>`);
                        //Writes temp
                        $(`#card-temp-${i}`).text(`Temp: ${res.daily[i].temp.day} \u00B0F`);
                        //Writes humidity
                        $(`#card-humidity-${i}`).text(`Humidity: ${res.daily[i].humidity}\u0025`);
                    }
                }
                //If statement to control the card-cloning  
                if ($('#card-deck').children().length === 1) {
                    dealCards();
                    writeCards();
                } else {
                    writeCards();
                }
            });
        });
    }

    //On page load displays the last searched for locale
    if (getLocale.length !== 0) {
        callAPI(getLocale[getLocale.length - 1]);
    }

    //Re-search for a saved locales
    const reSearch = () => {
        $('#searched-locale li').click(function () {
            $locale = $(this).text();
            callAPI($locale);
        });
    }
    reSearch();

    //Event listener to trigger API call, local stor set, and data manipulation to the DOM
    $('#search-btn').on('click', function () {
        //Variable for inputs value
        let $locale = $('#locale-input').val();

        if ($locale === '') {
            alert("Please add a location")
            return;
        } else {
            //push the new locale to the array of previous Locale from local stor
            getLocale.push($locale);
        }
        //Set locale array to local stor
        localStorage.setItem('searched-locale', JSON.stringify(getLocale));
        //Append input value to searched-locales <ul>
        $('<li>').addClass('list-group-item').text($locale).appendTo('#searched-locale');

        callAPI($locale);
        //clear input value after search
        $('#locale-input').val('');
        reSearch();
    });

    //Clear local storage button
    $('#clear-btn').on('click', function () {
        localStorage.clear();
        $('#searched-locale').empty();
        location.reload();
    });
});