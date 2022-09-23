const api = {
    key : '00a0842eb96f72a55141b325806f2c76',
    baseurl :"https://api.openweathermap.org/data/2.5/"
}
const search = document.querySelector (".search");
search.addEventListener('keypress', (e)=> {
    if (e.keyCode === 13){
        getResult(search.value); 
    }
})

getHome();
function getHome(){
    fetch("http://ip-api.com/json")
    .then ((city) => city.json())
    .then ((city) =>{
        const currentloc = city.city;
        getResult(currentloc);
    })
}


function getResult(query){
fetch((api.baseurl)+"weather?q=" + query + "&units=metric&APPID=" + (api.key))
.then((weather) => weather.json())
  .then((weather) => {
    let city = document.querySelector('.city');
    city.innerText = (weather.name) + ", " +(weather.sys.country);


    let currentUserDate = new Date();
    let datee = document.querySelector('.location .date');
    datee.innerText = date(currentUserDate);

    let temp = document.querySelector ('.current .temp');
    temp.innerHTML = (Math.round(weather.main.temp)) + "°c";

    let weatherelement = document.querySelector ('.current .weather');
    weatherelement.innerText = (weather.weather[0].main);
    if (weatherelement.innerText === "Clouds"){
        document.body.style.background = '#7c848e';
   }else if (weatherelement.innerText === "Rain") {
            document.body.style.background = '#5b9dff'
   }else if (weatherelement.innerText === "Clear"){
        document.body.style.background = 'orange'
   }
    let hilow = document.querySelector('.current .hi-low')
    hilow.innerText = (Math.round(weather.main.temp_min))+ "°c /" +" " + (Math.round(weather.main.temp_min))+"°c";

    img = document.querySelector ('#wicon')
    let imageicon = weather.weather[0].icon;
     img.src = "http://openweathermap.org/img/wn/" + imageicon + "@2x.png"
 });

        
}

function date(d){
    let months = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months [d.getMonth()];
    let year = d.getFullYear();
 return day + " " + date + " " + month + ", " + year;
}

  