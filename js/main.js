'use strict ';

function getWeather(latt, long) {

    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&units=imperial&appid=b5302c127b5029d44db41bd278e83d3d`;

    fetch(url2)
        .then(response => {
            return response.json();
        })
        .then(data => {
            formatResults(data)
            $('#loading').hide();
            $('.details3').empty();
            $('#citysearch').val("");
            })
        .catch(error => {
            errorMsg();  
        });
}

function getWeather2(city) {

    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b5302c127b5029d44db41bd278e83d3d`;
    $('#loading').show();
    fetch(url2)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (data.cod != 200) {
                alertMsg2();
                $('#loading').hide();
                return false;

            } else {
                forecast();
                formatResults(data)
                $('#loading').hide();
                $('.details3').empty();
            }
        })
        .catch(error => {
            errorMsg();  
        });
}

//Test against weather properties
function canIDoIt(temp, wind, rain, condition, cityName) {
    let newArray = [];

    for (let i = 0; i < activityStorage.length; i++) {
        if (temp >= activityStorage[i].maxTemperatureLow &&
            rain <= activityStorage[i].probabilityOfPrecipitation &&
            wind <= activityStorage[i].windSpeed) {
            activityStorage[i].temp = temp;
            activityStorage[i].wind = wind;
            activityStorage[i].condition = condition;
            activityStorage[i].cityname = cityName;
            newArray.push(activityStorage[i]);
        }
    }
    suggestedActivities(newArray);
}

function formatResults(data) {
    $(data).ready(function() {
        $('.loading').addClass('hidden');
    })
    const condition = data.weather[0].main;
    const temp = Math.round(data.main.temp);
    const tempMin = Math.round(data.main.temp_min);
    const tempMax = Math.round(data.main.temp_max);
    const wind = Math.round(data.wind.speed);
    const rain = rainValidate(data);
    const cityName = data.name;
    const humid = Math.round(data.main.humidity);

    function rainValidate(data) {
        if (data.hasOwnProperty('rain') === false) {
            return 0;
        } else if (data.hasOwnProperty('rain') === true) {
            return data.rain['1h'] || data.rain['3h'];
        }
    }
    forecast(condition, temp, tempMin, tempMax, wind, humid);
    canIDoIt(temp, wind, rain, condition, cityName);
}

function forecast(condition, temp, tempMin, tempMax, wind, humid) {
    $('.activityList').empty();
    const forecastHtml = `<h1>Forecast</h1>
     <p>Condition: ${condition}
     <br>Temperature: ${temp} F°
     <br class="highlow">High: ${tempMax} F° Low: ${tempMin} F°
     <br>Wind Speed: ${wind} Mph
     <br>Humidity: ${humid} %
     </p>
     <input type="button" class="activities" value="Suggested Activities">`;

    $('.forecast').empty();
    $('.forecast').html(forecastHtml);
}

function suggestedActivities(newArray) {
    const Activities =
        `<h1 class="list-title">Activities</h1>
         <section class= "activitiesList">
         </section>`;

    $('.container').on('click', '.activities', e => {
        $('.activityList').empty();
        $('.activityList').html(Activities);
        for (let i = 0; i < newArray.length; i++) {
            const activityCorrected = newArray[i].activity.replace("_", " ");
            const activityEncode = newArray[i].activity.replace("_", "%20");
            const cityEncode = newArray[i].cityname.replace(" ", "%20");

            $(".activitiesList").append(
                `<a href="#${newArray[i].activity}-modal" rel="modal:open">
                  <div class="${newArray[i].activity} activity" tabindex="0">
                   <img src=${newArray[i].imageico[0]} alt="${newArray[i].imageico[1]}" class="activity-photo">
                   <p class="acttitle">${activityCorrected}</p>
                  </div>
                 </a>`);

            $(".modals").append(
      `<div id="${newArray[i].activity}-modal" class="modal" tabindex="0">
        <h2 class ="title">${activityCorrected}</h2>
        <p class="details4">in ${newArray[i].cityname}</p>
        <br>
        <img src=${newArray[i].image[0]} alt="${newArray[i].image[1]}"class="activity-photo-big" >
        <br>
        <a target="_blank" class="modal-link" href="https://www.active.com/search?keywords=${activityEncode}&location=${cityEncode}&category=Activities&daterange=All+future+dates&clckmp=activecom_home_hero_activitysearch">
          ${activityCorrected} Events Nearby
        </a>
        <p class="details">At the moment the event listings are only applicable for US locations.</p>
        <section class="searchwiki">  
          <a target="_blank" class="modal-link"  href='https://duckduckgo.com/?t=ffab&q=${newArray[i].activity}+near+me&ia=places'> ${activityCorrected} Search</a></li>
          <a target="_blank" class="modal-link" href='https://en.wikipedia.org/wiki/${newArray[i].activity}'>${activityCorrected} Wiki</a> </li>
        </section>
      </div>`
            );


        }

      
    })
}

function success(geoLocationPos) {
    const user = geoLocationPos.coords;
    relayPosition(user);
};

function getPos() {
    $('.click').on('click', e => {
        window.navigator.geolocation.getCurrentPosition(success);
    })
};

function relayPosition(user) {
    const latt = user.latitude;
    const long = user.longitude;
    $('#loading').show();
    getWeather(latt, long);
};

function displayPosition(string) {
    $('.location').empty();
    $('.location').append(string);
}

function citySearch() {
    $('.frontpage').submit('click', e => {
        e.preventDefault();
        const city = $('#citysearch').val().trim();
        if (city === "" || Number.isInteger(parseInt(city)) === true) {
            alertMsg();
            return false;
        }

        getWeather2(city);
    })

    $('.citybtn').on('click', e => {
        e.preventDefault();
        const city = $('#citysearch').val().trim();
        if (city === "" || Number.isInteger(parseInt(city)) === true) {
            alertMsg();
        }
        getWeather2(city);
    })

    
}

function alertMsg() {
  $('.details3').empty();
  $('.details3').append('Please search either by city...city,state (abbreviations won\'t work) for US...or city,country for the rest of the world.');
}

function alertMsg2() {
  $('.details3').empty();
  $('.details3').append('City not found. Please try again searching either by city...city,state (abbreviations won\'t work) for US...or city,country for the rest of the world.');
}

function errorMsg() {
  $('.details3').empty();
  $('.details3').append('There was an error retrieving the location Data, please check your connection & try again.');
}

$(document).ready(function() {
    $('#loading').hide();
    getPos();
    citySearch();   
});

