'use strict';

//Global Variable to how response outputs
let activityStorage= [
{activity:"Sailing",
maxTemperatureLow:0,
probabilityOfPrecipitation:5,
windSpeed:15,
describe:"Sailing is ...",
image:"img/sailing.jpg",
imageico:"img/sailingico.jpg",
activityTense: 'sail.'
}
,
{
activity:"Hiking",
maxTemperatureLow:0,
probabilityOfPrecipitation:5,
windSpeed:100,
describe:"Hiking is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/hiking.jpg",
imageico: "img/hikingico.jpg",
activityTense: 'hike.'
}
,
{
activity:"Fishing",
maxTemperatureLow:0,
probabilityOfPrecipitation:5,
windSpeed:10,
describe:"Fishing is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/fishing.jpg",
imageico: "img/fishingico.jpg",
activityTense: 'fish.'
}
,
{
activity:"Drone_Flying",
maxTemperatureLow:100,
probabilityOfPrecipitation:2,
windSpeed:10,
waveHeight:100,
visibility:0,
describe:"Drone flying is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/drone.jpg",
imageico:"img/droneico.jpg",
activityTense: 'fly a drone.'
}
,

{
activity:"Kite_Flying",
maxTemperatureLow:32,
probabilityOfPrecipitation:1,
windSpeed:100,
describe:"Kite flying is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/kite.jpg",
imageico:"img/kiteico.jpg",
activityTense: 'fly a kite.'
}
,

{
activity:"Star_Gazing",
maxTemperatureLow:32,
probabilityOfPrecipitation:2,
windSpeed:100,
describe:"Star gazing is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/stars.jpg",
imageico: "img/starsico.jpg",
activityTense: 'gaze at the stars.'
}
,

{
activity:"Baseball",
maxTemperatureLow:45,
probabilityOfPrecipitation:1,
windSpeed:100,
describe:"baseball is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/baseball.jpg",
imageico:"img/baseballico.jpg",
activityTense: 'play baseball.'
}
,

{
activity:"Rock_Climbing",
maxTemperatureLow:40,
probabilityOfPrecipitation:1,
windSpeed:100,
describe:"Rock Climbing is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/rock.jpg",
imageico:"img/rockico.jpg",
activityTense: 'rock climb.'
}
,

{
activity:"Cycling",
maxTemperatureLow:50,
probabilityOfPrecipitation:3,
windSpeed:5,
describe:"Cycling is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/cycling.jpg",
imageico:"img/cyclingico.jpg",
activityTense: 'bike.'
}
,

{
activity:"Motorcycling",
maxTemperatureLow:60,
probabilityOfPrecipitation:2,
windSpeed:10,
describe:"Motorcyling is ...",
photo:"placeholder",
links:"placeholderForLinks",
image:"img/moto.jpg",
imageico:"img/motoico.jpg",
activityTense: 'go for a ride.'
}
,
{
  activity:"Skateboarding",
  maxTemperatureLow:40,
  probabilityOfPrecipitation:1,
  windSpeed:5,
  describe:"Skateboarding is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/skatepage.jpg",
  imageico:"img/skateico.png",
  activityTense: 'go skate.'
  }
  ,
{
  activity:"Running",
  maxTemperatureLow:20,
  probabilityOfPrecipitation:3,
  windSpeed:10,
  describe:"Running is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/runpage.jpg",
  imageico:"img/runico.png",
  activityTense: 'go for a run.'
  }
  ,
{
  activity:"Basketball",
  maxTemperatureLow:40,
  probabilityOfPrecipitation:1,
  windSpeed:30,
  describe:"Basketball is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/hooppage.jpg",
  imageico:"img/hoopico.png",
  activityTense: 'go play basketball.'
  }
  ,
{
  activity:"Golf",
  maxTemperatureLow:50,
  probabilityOfPrecipitation:1,
  windSpeed:30,
  describe:"Golf is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/golfpage.png",
  imageico:"img/golfico.png",
  activityTense: 'go golfing.'
  }
  ,
{
  activity:"Football",
  maxTemperatureLow:10,
  probabilityOfPrecipitation:3,
  windSpeed:40,
  describe:"Football is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/footpage.png",
  imageico:"img/footico.png",
  activityTense: 'go play football.'
  }
  ,
{
  activity:"Tennis",
  maxTemperatureLow:55,
  probabilityOfPrecipitation:1,
  windSpeed:15,
  describe:"Tennis is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/tennpage.jpg",
  imageico:"img/tennico.png",
  activityTense: 'go play tennis.'
  }
  ,
{
  activity:"Soccer",
  maxTemperatureLow:55,
  probabilityOfPrecipitation:3,
  windSpeed:15,
  describe:"Soccer is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/soccpage.png",
  imageico:"img/soccico.png",
  activityTense: 'go play soccer.'
  }
  ,
{
  activity:"Surfing",
  maxTemperatureLow:40,
  probabilityOfPrecipitation:4,
  windSpeed:20,
  describe:"Surfing is ...",
  photo:"placeholder",
  links:"placeholderForLinks",
  image:"img/surfpage.png",
  imageico:"img/surfico.png",
  activityTense: 'go surfing.'
  }
];

let doableActivities=[];

//Test against weather properties
function canIDoIt(temp,wind,rain){
  let newArray = [];
  let qualifiedArray = [];

  for(let i = 0 ; i < activityStorage.length; i++)
  {
    if(temp >= activityStorage[i].maxTemperatureLow 
      && rain <= activityStorage[i].probabilityOfPrecipitation 
      && wind <= activityStorage[i].windSpeed)
    {
      newArray.push(activityStorage[i]);
      
      
    }
  }
  
  
  suggestedActivities(newArray);
  console.log(newArray)
}
//console.log(weatherForecast);

//Updates Dom with confirmation of being able to do something
function formatResults(responseJson) {
       //$('.js-results').html('');
       $(responseJson).ready(function () {
       $('.loading').addClass('hidden');
     })
    let condition = responseJson.weather[0].main;
    let temp = Math.round(responseJson.main.temp);
    let tempMin = Math.round(responseJson.main.temp_min);
    let tempMax = Math.round(responseJson.main.temp_max);
    let wind = Math.round(responseJson.wind.speed);
    let rain = Math.round(responseJson.rain['1h'])
    let humid = Math.round(responseJson.main.humidity);
    
    
    
    
    
    //let activitiesList = canIDoIt(temp,wind,rain);
    //doableActivities = canIDoIt(temp,wind,rain);
    
    
    //send information to forecast page
    forecast(condition,temp,tempMin,tempMax,wind,humid);
    canIDoIt(temp,wind,rain);
    //console.log(activitiesList)
    

    
    
    
    //$('.js-results').removeClass('hidden')

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
 
 $('.forecast').on('click', e => {
     console.log('forecast click')
     $('.container').html(forecastHtml)
 })
}

function suggestedActivities(newArray,qualifiedArray){
let qualifiedActivities = 
`
<h1>Activities</h1>
<section class= "activitiesList">

<ul class="js-suggested">
</section>
`

 $('.container').on('click', '.activites', e => {
     console.log(newArray)
     $('.container').html(qualifiedActivities)
     
      
     for(let i = 0; i < newArray.length; i++){
      let activityCorrected = newArray[i].activity.replace("_", " ")

    $(".js-suggested").append(
      `<div class="${newArray[i].activity} activity">
      
      <img src=${newArray[i].imageico} class="activity-photo">
      
      <p class="acttitle">${activityCorrected}</p>
    </div>
      `
      )

      
    }
      activityPages(newArray)
 })
}

function activityPages(newArray){
  for(let i = 0; i < newArray.length; i++){
   $(`.${newArray[i].activity}.activity`).on('click', e=>{
    let activityCorrected = newArray[i].activity.replace("_", " ")
     //let corrected2 = activityCorrected.toLowerCase();
    let pageHtml = `<h1>${activityCorrected}</h1>
  
    <img src=${newArray[i].image} class="activity-photo-big" >
      </div>
 <br><h2>Here are some links you may find helpful if youre going outside to ${newArray[i].activityTense}</h2>
  <ul>
      <li><a target="_blank" href='https://duckduckgo.com/?t=ffab&q=${newArray[i].activity}+near+me&ia=places'> ${activityCorrected} Search</a></li>
      <li><a target="_blank" href='https://en.wikipedia.org/wiki/${newArray[i].activity}'>${activityCorrected} Wiki</a> </li>
  </ul>
  <input class="back" type="button" value="Back">
  <input class="home" type="button" value="Home">`
    
    console.log(`${newArray[i].activity}`)

    $('.container').html(pageHtml)

  })
   
  }
  backButton(newArray);
}

function backButton(newArray){
$('.container').on('click',".back", e=> {
      
    let qualifiedActivities = 
    `
    <h1>Activities</h1>
    <section class= "activitiesList">

    <ul class="js-suggested">
    </section>
    `
$('.container').html(qualifiedActivities)
     
      
     for(let i = 0; i < newArray.length; i++){
      let activityCorrected = newArray[i].activity.replace("_", " ")
    $(".js-suggested").append(
      `<div class="${newArray[i].activity} activity">
      
      <img src=${newArray[i].imageico} class="activity-photo">
      
      <p class="acttitle">${activityCorrected}</p>
    </div>
      `
      )

      
    }
   
   activityPages(newArray)

      
    
  })
}


function activitylisted(){
 $('ul').on('click','li', e => {
     console.log('sailing click')
     
 })
}


//Uses the user input of thier coordinates to find the weather grid area to report on.
function getWeather(latt,long) {
   // const url = `https://api.weather.gov/points/${coords}/`
    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latt}&lon=${long}&units=imperial&appid=b5302c127b5029d44db41bd278e83d3d`
    fetch(url2)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(data => {

          formatResults(data)
          //console.log(data.rain['1h'])
          
        }
          )
        .catch(err => {
            //displayError(err.message);
        });
         
} 
function getWeather2(city) {
  
   const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=b5302c127b5029d44db41bd278e83d3d`
   fetch(url2)
       .then(response => {
           if (response.ok) {
               return response.json();
           }
           throw new Error(response.statusText);
       })
       .then(data => {

         formatResults(data)
         
         
       }
         )
       .catch(err => {
           //displayError(err.message);
       });
        
} 



//HTML for error scenario
function displayError(error) {
    console.log('displayError ran');
    $('.js-results').html(`<h3 class="error">Something went wrong: ${error}</h3>`)
    $('.loading').addClass('hidden');
    $('.js-results').removeClass('hidden')
}



//relays position object
function success(geoLocationPos){
  let user = geoLocationPos.coords;

  console.log('Coordinates Sent');
  relayPosition(user)
};

//calls navigator and runs sucess function
function getPos(){
 $('.click').on('click', e =>{
  console.log('click')
  window.navigator.geolocation.getCurrentPosition(success)
  })
};
//sets coordinates to varibale
function relayPosition(user){

    let latt = user.latitude
    let long = user.longitude
    console.log(latt,long)

    //the rest of the code in this function and display position isnt needed
    //let coords = latt + "," + long;

    getWeather(latt,long)
};

function displayPosition(string){
  $('.location').empty();
  $('.location').append(string);

}

function citySearch(){
  

  $('.citybtn').on('click', e => {
    e.preventDefault();
    let city = $('.citysearch').val().trim();
    getWeather2(city)
  })
}

getPos();
citySearch();
//activitylisted();

