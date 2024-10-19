import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css"
import windspeed from "../Images/windspeed.png"



const HomePage = () => {
 
    const [weatherInput, setWeatherInput] = useState("");  // Handle the input value
    const [weatherData, setWeatherData] = useState({});  // Handle the api call value
    // const [loading, setLoading] = useState(true)  // Handle the loading gif
    const apiKey = 'b96e0a473aed03ed2ffcdd3d32e5f323'

 
 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();  // Call function to send data to API
      };
 
 
    const handleChange = (e) => {
        setWeatherInput(e.target.value);  // Update state with input value
      };
 
    
 

    const fetchData = async () => {
        if (!weatherInput) return;  // Prevent fetching if no input

        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${apiKey}`);
            console.log('location', response);  // Add semicolon if missing
            setWeatherData(response.data);
            // setWeatherInput("")
            console.log(response)
        } catch(error) {
            console.error(error);
            // setLoading(true)
        }
 
      };

      useEffect(() => {
        if (weatherInput) {  // Only fetch data if there's input
            fetchData();  // Fetch data whenever 'Input' changes
        }
    }, [weatherInput]);


    const iconCode = weatherData?.weather?.[0]?.icon;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

 
 
 
  return (
    <div>


<div className="doejohn">
    <div className="weatherwe">
        <form onSubmit={handleSubmit} autoComplete='on'>
            <input placeholder="Input city"
                id="weather"
                onChange={handleChange}
                value={weatherInput}
                className="inputcity"
                type="text">
            </input>
        </form>
    </div>
    <button className="weatherBTN" type="button">Enter</button>
    </div>


                <div className="checktemps">
                <div className="detailsofcity" >
                    <div className="detailscity">
                        <div className="citydetails">
                            <h2>Todays Lat in {weatherData?.name} is: {weatherData?.coord?.lat}</h2>
                            <h1>{weatherData?.weather?.[0]?.description}</h1>
                            <h4>Wed, 16th 2024</h4>
                        </div>
                    </div>
                </div>
 
 
                <div className="detailsDay">
                <div className="daysdetails">
                <div>
                    <div className="sunrise">
                        <h4>Sunrise:</h4>
                        <h4>{weatherData?.sys?.sunrise}</h4>
                    </div>
                    <div className="sunset">
                        <h4>Sunset:</h4>
                        <h4>{weatherData?.sys?.sunset}</h4>
                    </div>
                    <h3>Feels like: {weatherData?.main?.temp}</h3>
                </div>
 
                <div>

                    <img src={iconUrl} width={100} height={100} alt="Star 3" />
                    <h3>{weatherData?.weather?.[0]?.description}</h3>

                </div>
 
                <div>
                    <div>
                    <h3>{weatherData?.main?.humidity}</h3>
                    <h4>humidity is:</h4>
                    </div>
                    <div>
                    <h3>{weatherData?.main?.pressure}</h3>
                    <h4>Pressure is:</h4>
                    </div>
                    
                </div>
                <div>
                    <h3>{weatherData?.wind?.speed}</h3>
                    <h4>windspeed is:</h4>
                    <h3>{weatherData?.wind?.gust}</h3>
                    <h4>Wind gust is:</h4>
                </div>
                </div>
                </div>
                </div>
 
                    
 
            <div className="hourlydayforcaster">
            <h3 className="forcaster">5 days forecast</h3>
            <h3 className="forehour">Hourly Forecast</h3>
            </div>
        
                <div className="finaltemp">
                    <div className="weektemperature">
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">Friday, 1st Oct</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">Saturday, 1st Oct</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">Sunday, 1st Oct</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">Monday, 1st Oct</h3>
                    </div>
                    </div>
 
 
                <div className="hourcasterfors">
                <div className="hourcasterfor">
                    <div className="forecasthour">
                        <div className="Hourlyforecast">
                            <h3>00:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                        <div className="Hourlyforecast">
                            <h3>00:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                        <div className="Hourlyforecast">
                            <h3>00:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                        <div className="Hourlyforecast">
                            <h3>00:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                    <div className="Hourlyforecast">
                            <h3>00:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">0km/hr</h3>
                    </div>
                    </div>
                </div>
                </div>
                    </div>
    </div>
  );
};
 
export default HomePage;