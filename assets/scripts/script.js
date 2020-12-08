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
    console.log(getLocale);
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
        }else{
            //push the new locale to the array of previous Locale from local stor
            getLocale.push(locale);
        }
        //Set locale array to 
        localStorage.setItem('searched-locale', JSON.stringify(getLocale));
        $('<li>').addClass('list-group-item').text(locale).appendTo('#searched-locale');
        
    });


    // Saving for later 
    // $('#searched-Locale li').on('click', function(){
    //     test = $(this).text();
    
    //     console.log(test);
    // })
   

    


});