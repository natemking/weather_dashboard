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
        //clear input value after search
        $('#locale-input').val('');



        //*** API calls ***//
        //-----------------//
        //PositionStack is called to get the locales lat and long coords. They are then used in OpenWeather's API to get weather data. 

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
                $('#locale').text(map.data[0].label);
                //Write temp to jumbotron body
                $('#temp').text(`Temp: ${res.current.temp} \u00B0F`);
                //Write humidity to jumbotron body
                $('#humidity').text(`Humidity: ${res.current.humidity}\u0025`);
                $('#wind-speed').text(`Wind Speed: ${res.current.wind_speed} MPH`);
                $('#uv-index').text(`UV Index: ${res.current.uvi}`);


                

                const dealCards = () =>{
                    const $clone = $('.card-template').clone();
                    console.log('run')
                    for(let i = 1; i < 6; i++){
                        const $copy = $clone.clone();
                        $copy.attr('id', `card-${i}`);
                        $copy.css('display', 'block');
                        $('#five-day-heading').css('display', 'block');
                        $($copy).appendTo('#card-deck')


                        
                        $(`#card-${i} h5`).text(new Date(res.daily[i].dt * 1000).toLocaleDateString("en-US"))
                        $('#card-temp').attr('id', `card-temp-${i}`)

                        $('#card-humidity').attr('id', `card-humidify-${i}`)
                        
            
                    }
                }           
                dealCards();
                
            });
        });
       
        
    });
    //Clear local storage button
    $('#clear-btn').on('click', function(){
        localStorage.clear();
        $('#searched-locale').empty();
        location.reload();
        
    })

   
    // $('#searched-Locale li').on('click', function(){
    //     test = $(this).text();
    
    //     console.log(test);
    // })
   

    

});