# Weather Dashboard
Homework #06 Server-Side APIs: Weather Dashboard

http://www.natemking.dev/weather_dashboard/

---

## Table of Contents
 * [Description](#description)
    + [Scope of Work](#scope-of-work)
    + [HTML and CSS](#html-and-css)
    + [Javascript functionality](#javascript-functionality)
  * [Screenshots](#screenshots)
  * [Credits](#credits)

## Description
---
### Scope of Work
The task was to design a fully functional weather dashboard that utilizes APIs to pull the data in and display it on a simple and clean GUI. When a user enters a city they are able to hit the search button that not only displays data for the current day but also a five-day forecast. Additionally, the locations are saved in a list under the search bar that the user can easily click on a respective location to search again. Lastly, the user is to be given the last searched for location on page load. 

### HTML and CSS
The bones of the site is a simple BootStrap setup. Very minimal styling went into this design. The basic layout is achieved by utilizing the BootStrap grid system. The weather output is a simple BootStrap jumbotron and the five-day forecast is achieved by using cards. One per day. These cards all come into play dynamically via jQuery. 

### JavaScript Functionality
When the page initializes the first piece is the local storage is retrieved and if there is no local storage nothing is displayed. If there are previously visited locations in local storage, not only are they displayed in a list under the search bar, the last searched for location in that list has its weather data displayed. 

When a user inputs a city to search and initiates the search the location is added to the local storage array and the location is sent to the Nominatim geocoding API to retrieve that location's latitude and longitudinal coordinates. I was able to setup the API call top access global locations so as to not l;imit the scope of the app. Once the coordinates are retrieved from the geocoded object they are then sent to the OpenWeatherMap API. Once the data comes back the information that is needed is appended to its respective HTML elements. It is at this time that the five-day forecast cards are created dynamically via the jQuery `clone()` method and they are loaded with their respective data. I choose to let jQuery do the work here vs. using HTML to not only keep the HTML cleaner but to allow the number of days forecasted to be easily scaled up by just editing the for loop. Not only is basic weather data pulled into the dashboard, but their icons are as well. This gives the user a better visual reading of what the weather is. Also, the UV index is color-coded depending on the danger scale. 

Once there are saved locations in the previously searched for list, they are all active buttons. Not actual button elements but clicking on a location name with re-initiate the `callAPIs()` function and re-display all of that info. 

Lastly, a button was added to allow the user to clear their search history. This button deletes what is in their local storage and refreshes the page allowing them to start over and clean up their search list. As with all of my apps until this point, this weather dashboard is mobile responsive. 

---

## Screenshots

<summary><strong>Weather Dashboard</strong></summary>
<br>


![weather dashboard functionality](./assets/images/screenshots/weather_dashboard.gif?raw=true)
<br>
_weather dashboard functionality_
<br>

![weather dashboard mobile](./assets/images/screenshots/weather_dashboard_mobile.jpg?raw=true)
<br>
_weather dashboard mobile aspect ratio_
<br>


---

## Credits

* [jQuery](https://jquery.com/)

* [GeoCod API from Nominatim](https://nominatim.org/)

* [Weather API from OpenWeatherMap](https://openweathermap.org/)

* [Get value of list item](https://stackoverflow.com/questions/5548827/get-value-of-list-item-with-jqueryp)

* [Get input field to accept only numbers](https://stackoverflow.com/questions/19508183/how-to-force-input-to-only-allow-alpha-letters)

* [Converting from unix time](https://www.codegrepper.com/code-examples/delphi/jquery+convert+unix+timestamp+to+date)

* [Check if obj has key in an if/else statement](https://stackoverflow.com/questions/455338/how-do-i-check-if-an-object-has-a-key-in-javascript)
