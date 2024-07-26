import { useEffect, useRef, useState } from 'react';
import './App.css';
const api_key="eb3a1f692ff3c70d8427a0cbfc4c8b06";

function App() {
  let ref=useRef();
  const [weatherData,setWeatherData]=useState(null);
  const[loading,setLoading]=useState(false);
  
  async function handleSearch(loc){
    let search=loc;
    if(ref.current.value){ 
    search=ref.current.value;}
    setLoading(true);
  try{ let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=eb3a1f692ff3c70d8427a0cbfc4c8b06`);
   let data= await res.json();
   setLoading(false);
   setWeatherData(data);
   console.log(data);
  ref.current.value="";}
   catch(e){
    console.log(e);
   }
  }
useEffect(()=>{
  handleSearch("landon");
},[])


  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className='search-bar'>
        <input type='text' ref={ref}></input>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className='data'>
        {
          loading?<div>Loading data</div>:
           <div>
           { weatherData.cod==404?<h3>404 {weatherData.message}</h3>:
            <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          
          <div className="temp">{weatherData?.main?.temp}K</div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>}
        </div>
        }
        

      </div>
    </div>
  );
}

export default App;
