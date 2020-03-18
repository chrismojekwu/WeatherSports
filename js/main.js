'use strict';
  
function getWeather(latt,long) {
  
   const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&units=imperial&appid=b5302c127b5029d44db41bd278e83d3d`
   
   

   fetch(url2)
       .then(response => {
        return response.json();
           })
       .then(data => {
        formatResults(data)
        $('#loading').hide();
         })      
} 
function getWeather2(city) {
   
  const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b5302c127b5029d44db41bd278e83d3d`
  $('#loading').show();  
  fetch(url2)
      .then(response => {
        return response.json();
         })
       .then(data => { 
         if(data.cod != 200){
          alertMsg2();
           $('#loading').hide();
           return false;
           
             }else {
              forecast(); 
              formatResults(data)
              $('#loading').hide();
            }
              })
                } 

function alertMsg2(){
  $('.details3').empty();
       $('.details3').append('City not found. Please try again searching either by city...city,state for US...or city,country for the rest of the world.')
}                

//Test against weather properties
function canIDoIt(temp,wind,rain,condition,cityName){
  let newArray = [];
 

   for(let i = 0 ; i < activityStorage.length; i++){
     if(temp >= activityStorage[i].maxTemperatureLow 
        && rain <= activityStorage[i].probabilityOfPrecipitation 
         && wind <= activityStorage[i].windSpeed){
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
    $(data).ready(function () {
       $('.loading').addClass('hidden');
        })
        let condition = data.weather[0].main;
        let temp = Math.round(data.main.temp);
        let tempMin = Math.round(data.main.temp_min);
        let tempMax = Math.round(data.main.temp_max);
        let wind = Math.round(data.wind.speed);
        let rain = rainValidate(data);
        let cityName = data.name;
        let humid = Math.round(data.main.humidity);
    
      function rainValidate(data){
       if(data.hasOwnProperty('rain') === false){
         return 0;
          } else if(data.hasOwnProperty('rain') === true){
           return data.rain['1h'] || data.rain['3h'];
           }
            }
              forecast(condition,temp,tempMin,tempMax,wind,humid);
              canIDoIt(temp,wind,rain,condition,cityName);
              }

function forecast(condition,temp,tempMin,tempMax,wind,humid){
  let forecastHtml = `<h1>Forecast</h1>
     <p>Condition: ${condition}
      <br>Temperature: ${temp} F°
       <br class="highlow">High: ${tempMin} F° Low: ${tempMax} F°
        <br>Wind Speed: ${wind} Mph
         <br>Humidity: ${humid} %
          </p>
           <input type="button" class="activites" value="Suggested Activites">`

           $('.container').html(forecastHtml);      
       }

function suggestedActivities(newArray){
 let qualifiedActivities = 
   `<h1>Activities</h1>
     <section class= "activitiesList">
      <ul class="js-suggested">
       </section>`

 $('.container').on('click', '.activites', e => {
  $('.container').html(qualifiedActivities)
   for(let i = 0; i < newArray.length; i++){
    let activityCorrected = newArray[i].activity.replace("_", " ");

    $(".js-suggested").append(
      `<div class="${newArray[i].activity} activity">
        <img src=${newArray[i].imageico} class="activity-photo">
         <p class="acttitle">${activityCorrected}</p>
          </div>`);
           }
       $('.container').append(
         '<input class="home" type="button" value="Home">')  
           
            activityPages(newArray);
             })
              }

function activityPages(newArray){
 
  for(let i = 0; i < newArray.length; i++){
   $(`.${newArray[i].activity}.activity`).on('click', e=>{
    let activityCorrected = newArray[i].activity.replace("_", " ");
     let activityEncode = newArray[i].activity.replace("_", "%20");
      let cityEncode = newArray[i].cityname.replace(" ", "%20");
       

      let pageHtml = `<h1 class ="title">${activityCorrected}</h1>
       <img src=${newArray[i].image} class="activity-photo-big" >
        </div>
         <br><h2>If you're going outside to ${newArray[i].activityTense} in ${newArray[i].cityname}, the current condition is: ${newArray[i].condition}, with an average temp of ${newArray[i].temp} F°, and a windspeed of ${newArray[i].wind} mph. </h2>
          <br>
           <a target="_blank" href="https://www.active.com/search?keywords=${activityEncode}&location=${cityEncode}&category=Activities&daterange=All+future+dates&clckmp=activecom_home_hero_activitysearch">
            ${activityCorrected} Events Nearby</a>
             <p class="details">At the moment the event listings are only applicable for US locations.</p>
              <section class="searchwiki">  
               <a target="_blank" href='https://duckduckgo.com/?t=ffab&q=${newArray[i].activity}+near+me&ia=places'> ${activityCorrected} Search</a></li>
                <a target="_blank" href='https://en.wikipedia.org/wiki/${newArray[i].activity}'>${activityCorrected} Wiki</a> </li>
                 </section>
                  <input class="back" type="button" value="Back">
                   <input class="home" type="button" value="Home">`
    
      $('.container').html(pageHtml);
       })
        }
          backButton(newArray);
           homeButton();
          }

function backButton(newArray){
 $('.container').on('click',".back", e=> {
  let qualifiedActivities = 
    `<h1>Activities</h1>
      <section class= "activitiesList">
       <ul class="js-suggested">
        </section>`
         $('.container').html(qualifiedActivities);
     
    for(let i = 0; i < newArray.length; i++){
      let activityCorrected = newArray[i].activity.replace("_", " ")
       $(".js-suggested").append(
        `<div class="${newArray[i].activity} activity">
          <img src=${newArray[i].imageico} class="activity-photo">
           <p class="acttitle">${activityCorrected}</p>
            </div>`
             )}
              activityPages(newArray); 
              })
               }
function homeButton(){
  $('.container').on('click',".home", e=> {
    location.reload();
     })
      }   

function displayError(error) {
    console.log('displayError ran');
     $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
      $('.loading').addClass('hidden');
       $('.js-results').removeClass('hidden');
        }

function success(geoLocationPos){
  let user = geoLocationPos.coords;
  console.log(user)
   relayPosition(user)
    };

function getPos(){
 $('.click').on('click', e =>{
 
  window.navigator.geolocation.getCurrentPosition(success)
  
   })
    };

function relayPosition(user){
 let latt = user.latitude;
  let long = user.longitude;
  $('#loading').show(); 
   getWeather(latt,long);
    };

function displayPosition(string){
  $('.location').empty();
   $('.location').append(string);
    }

function citySearch(){
  $('.frontpage').submit('click', e => {
    e.preventDefault();
     let city = $('.citysearch').val().trim();
      if(city === "" || Number.isInteger(parseInt(city)) === true){
       alertMsg();
        return false;
         }
         
          getWeather2(city);
          })

   $('.citybtn').on('click', e => {
    e.preventDefault();
     let city = $('.citysearch').val().trim();
      if(city === "" || Number.isInteger(parseInt(city)) === true){
       alertMsg();
         } 
         getWeather2(city);
           })

     function alertMsg(){
      $('.details3').empty();
       $('.details3').append('Please search either by city...city,state for US...or city,country for the rest of the world.')
     }      
            }

$(window).on('load',function(){
  $('#loading').hide();
  $('.container').ready(function(){
    
  })
  
  });

getPos();
citySearch();



