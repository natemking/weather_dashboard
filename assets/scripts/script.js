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
        let locale = $('#locale-input').val();
        if (locale === ''){
            alert("Please add a location")
            return;
        }else{
            //push the new locale to the array of previous Locale from local stor
            getLocale.push(locale);
        }
        //Set locale array to local stor
        localStorage.setItem('searched-locale', JSON.stringify(getLocale));
        //Append input value to searched-locales <ul>
        $('<li>').addClass('list-group-item').text(locale).appendTo('#searched-locale');
        //clear input value after search
        $('#locale-input').val('');

        //Lat & Lon API Query

        mapURL =`http://api.positionstack.com/v1/forward?access_key=96c3c43382905355dcc4f168fc3b027f&query=${locale}`
        
        
        $.ajax({
            url: mapURL,
            method: 'GET'
        }).then(function(res){
            
            let lat = (res.data[0].latitude);
            let lon = (res.data[0].longitude);
            
            weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=b10aa733a604bec365209fb6e0c6574c`;
             $.ajax({
            url: weatherURL,
            method: 'GET'
        }).then(function(res){
            $
        })
        })

        // console.log(latLon);
        //Retrieve weather data

        
        
        
        // $.ajax({
        //     url: weatherURL,
        //     method: 'GET'
        // }).then(function(res){
        //     console.log(res)
        // })
        

    });

    //Clear local storage button
    $('#clear-btn').on('click', function(){
        localStorage.clear();
        $('#searched-locale').empty();
    })




    //   let writeWeather = () => {
    //     var celcius = Math.round(parseFloat(d.main.temp)-273.15);
    //     var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
    //   }

    // Saving for later 
    // $('#searched-Locale li').on('click', function(){
    //     test = $(this).text();
    
    //     console.log(test);
    // })
   

    

});