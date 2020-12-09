$(document).ready(function (){
    //Search for locale
        //Add its current weather data to the jumbotron
        //Add its five day forecast to the cards
            //one day per card
        //Save the cit to local storage
            //write that locale to the visited cites list
    
    //Get searched locale data from local stor
    let getLocale = JSON.parse(localStorage.getItem('searched-locale'));
        if (getLocale === null){
            getLocale = [];
        };
    //For loop to iterate through stored cites and write them to DOM in the <ul> element
   for (let i = 0; i < getLocale.length; i++) {
    $('<li>').addClass('list-group-item').text(getLocale[i]).appendTo('#searched-locale');  
   }


    //*** API calls ***//
    //-----------------//
    //PositionStack is called to get the locales lat and long coords. They are then used in OpenWeather's API to get weather data. 
    // let callAPI = ($locale) => {
    
    // }
    //Re-search for a saved locale
    // let reSearch = () => { 
    //     $('#searched-locale li').click(function(){
    //         $locale = $(this).text();
    //         console.log($locale);
    //         callAPI($locale);
    //     })
    // }
    // reSearch();

   //Button click to save searched for locale and access api data 
    $('#search-btn').on('click', function () {
        //variable for inputs value
        let $locale = $('#locale-input').val();
        
        if ($locale === ''){
            alert("Please add a location")
            return;
        }else{
            //push the new locale to the array of previous Locale from local stor
            getLocale.push($locale);
        }
        //Set locale array to local stor
        localStorage.setItem('searched-locale', JSON.stringify(getLocale));
        //Append input value to searched-locales <ul>
        $('<li>').addClass('list-group-item').text($locale).appendTo('#searched-locale');

        console.log('i hate' + $locale)
        //PositionStack API
        mapURL =`http://api.positionstack.com/v1/forward?access_key=96c3c43382905355dcc4f168fc3b027f&query=${$locale}`

        $.ajax({
            url: mapURL,
            method: 'GET'
        }).then(function(map){
            
            //Gets lat and long data from Position Stack API pull
            let lat = (map.data[0].latitude);
            let lon = (map.data[0].longitude);
        
            //OpenWeatherMap API 
            weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=b10aa733a604bec365209fb6e0c6574c`;
            $.ajax({
            url: weatherURL,
            method: 'GET'
            }).then(function(res){
                console.log(res); 
                
                //Write Location to jumbotron heading
                $('#locale').html(`<img src=http://openweathermap.org/img/wn/${res.current.weather[0].icon}@2x.png>${map.data[0].label}`);
                //Write temp to jumbotron body
                $('#temp').text(`Temp: ${res.current.temp} \u00B0F`);
                //Write humidity to jumbotron body
                $('#humidity').text(`Humidity: ${res.current.humidity}\u0025`);
                $('#wind-speed').text(`Wind Speed: ${res.current.wind_speed} MPH`);
                $('#uv-index').html(`UV Index: <span id="uv-num">${res.current.uvi}</span>`);

                if ($('#uv-num').val() < 7){
                    $('#uv-num').css('background-color', 'green')
                }else{
                    $('#uv-num').css('background-color', 'red')
                }

                
                //*** Create 5 day forecast cards ***//
                // const dealCards = () =>{
                    
                    //Create the card clone
                    const $clone = $('.card-template').clone();
                    //For loop to create all 5 cards for forecast
                    for(let i = 1; i < 6; i++){
                        //create the clone for the lop
                        const $copy = $clone.clone();
                        //set the id for all the cards
                        $copy.attr('id', `card-${i}`);
                        //Append the clones to the container
                        $($copy).appendTo('#card-deck');
                        //Create a <h5> for Date. Pull from OpenWeather API and convert from Unix time then append to the card.
                        $('<h5>').attr('id', `card-date-${i}`).text(new Date(res.daily[i].dt * 1000).toLocaleDateString("en-US")).appendTo(`#card-${i}`);
                        //Create <h6> for weather icon. Pull from OpenWeather API and append to the card.
                        $('<h6>').attr('id', `card-icon-${i}`).html(`<img src=http://openweathermap.org/img/wn/${res.current.weather[0].icon}.png>`).appendTo(`#card-${i}`);
                        //Create <p> for temp. Pull from OpenWeather API and append to the card.
                        $('<p>').attr('id', `card-temp-${i}`).text(`Temp: ${res.daily[i].temp.day} \u00B0F`).appendTo(`#card-${i}`);
                        //Create <p> for humidity. Pull from OpenWeather API and append to the card.
                        $('<p>').attr('id', `card-humidity-${i}`).text(`Humidity: ${res.daily[i].humidity}\u0025`).appendTo(`#card-${i}`);
                        //Make the clones appear
                        $copy.css('display', 'block');
                        //Make the heading for the container appear
                        $('#five-day-heading').css('display', 'block');
                    }
                // }   
                // //Call function to create 5 day forecast cards        
                // dealCards();
            });
        });
        
        // callAPI($locale);
         //clear input value after search
         $('#locale-input').val('');
        // reSearch();
    });
    
   


    //Clear local storage button
    $('#clear-btn').on('click', function(){
        localStorage.clear();
        $('#searched-locale').empty();
        location.reload();
        
    })

   
    

    

});