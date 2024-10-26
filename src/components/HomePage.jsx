import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css"
import windspeed from "../Images/windspeed.png"



const HomePage = () => {
 
    const [weatherInput, setWeatherInput] = useState("");  // Handle the input value
    // const [weatherData, setWeatherData] = useState();  // Handle the api call value
    const [weatherData1, setWeatherData1] = useState();
    const [weatherData2, setWeatherData2] = useState();
    const [localSunriseTime, setLocalSunriseTime] = useState();
    const [localSunsetTime, setLocalSunsetTime] = useState();
    const [displayIconic, setDisplayIcon] = useState("");
    const apiKey = 'b96e0a473aed03ed2ffcdd3d32e5f323'


    

    const handleSubmit = (e) => {
        e.preventDefault();
        // fetchData();  // Call function to send data to API
        fetchTwoApis();
        // fetchData2();
      };

    const handleChange = (e) => {
        setWeatherInput(e.target.value);  // Update state with input value
      };
 

      const fetchData1 = async () => {
        if (!weatherInput && !weatherData2) return;
        if (weatherData2 && weatherData2?.coord?.lat && weatherData2?.coord?.lon) {
            const locationLat = weatherData2.coord.lat
            const locationLon = weatherData2.coord.lon
            const apiKey = "b96e0a473aed03ed2ffcdd3d32e5f323"
            const datacorrectly = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${locationLat}&lon=${locationLon}&appid=${apiKey}`); 
            return datacorrectly
        }
    }


        const fetchData2 = async () => {
            if (!weatherInput) return;
            return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${apiKey}`);
        }


    const fetchTwoApis = async () => {
        Promise.all([fetchData1(), fetchData2()])
        .then (([response1, response2])  => {
            if (!weatherInput) return;
                console.log('Data from 1st api:', response1);
                setWeatherData1(response1?.data)
                console.log('Data from 2nd api:', response2);
                setWeatherData2(response2?.data)
                processData()
                displayImage()
        })
            .catch(error => {
                console.error('Error', error)
            })
    }
            useEffect(() => {
                if (weatherInput && weatherData2) {  // Only fetch data if there's input
                    fetchTwoApis()
                }
            }, [weatherInput && weatherData2]);




    const fetchData = async () => {
        if (!weatherInput) return;  // Prevent fetching if no input

        try {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${apiKey}`);
            console.log('location', response);  // Add semicolon if missing
            // setWeatherData(response.data);
            processData()
            displayImage()
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


        
        const displayImage = () => {
            if (weatherData2 && weatherData2?.weather?.[0].icon) {
                const iconCode = weatherData2?.weather[0].icon;
                const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
                 setDisplayIcon(iconUrl)
            }
        }
        useEffect(() => {
                displayImage()
        },[weatherData2])



        const processData = () => {
            if (weatherData2 && weatherData2?.sys?.sunrise && weatherData2?.sys?.sunset)  {
                const sunriseValue = weatherData2.sys.sunrise; // Ensure value is present
                const sunsetValue = weatherData2.sys.sunset;
                const currentSunriseTime = new Date(sunriseValue * 1000).toLocaleString(); // Convert to date
                const currentSunsetTime = new Date(sunsetValue * 1000).toLocaleString(); // Convert to date
                setLocalSunriseTime(currentSunriseTime); // Update the state variable
                setLocalSunsetTime(currentSunsetTime); // Update the state variable
                console.log(currentSunriseTime);
                console.log(currentSunsetTime);
            }
        };
        // Run the function only when `weatherData` has been updated
        useEffect(() => {
            if (weatherData2) {
                processData(); 
            }
        }, [weatherData2]);
        

    
  return (

    <div>
        <div className="weatherwe">
            <div className="gotitman">
            <form onSubmit={handleSubmit} autoComplete='on'>
                <input placeholder="Input city"
                    id="weather"
                    onChange={handleChange}
                    value={weatherInput}
                    className="inputcity"
                    type="text">
                </input>
            </form>
            <button className="weatherBTN" type="submit">Enter</button>
            </div>
        </div>

        <div className="ThankGod">
        <div className="checktemps">
                <div className="detailsofcity" >
                    <div className="detailscity">
                        <div className="citydetails">
                            <h2>The Latitude for {weatherData2?.name} in {weatherData2?.sys?.country} is: {weatherData2?.coord?.lat} with longitude: {weatherData2?.coord?.lon}</h2>
                            <h1>{weatherData2?.weather?.[0]?.description}</h1>
                            <h4></h4>
                        </div>
                    </div>
                </div>
 
                <div className="detailsDay">
                <div className="daysdetails">
                <div>
                    <div className="sunrise">
                        <h4>Sunrise:</h4>
                        <h4 id="Sunrise">{localSunriseTime}</h4>
                    </div>
                    <div className="sunset">
                        <h4>Sunset:</h4>
                        <h4 id="Sunset">{localSunsetTime} </h4>
                    </div>
                    <h3>Feels like: {weatherData2?.main?.temp}</h3>
                </div>
 
                <div className="tetherwe">
                    <div style={{ width: "100px", height: "100px" }}>
                    {displayIconic && <img src={displayIconic} width={100} height={100} alt="Star 3" />}
                    </div>
                    <h3 className="iconic">{weatherData2?.weather?.[0]?.description}</h3>
                </div>
 
                <div>
                    <div>
                    <h4>humidity is:</h4>
                    <h3>{weatherData2?.main?.humidity}</h3>
                    </div>
                    <div>
                    <h4>Pressure is:</h4>
                    <h3>{weatherData2?.main?.pressure}</h3>
                    </div>
                    
                </div>
                <div className="wind">
                    <h4>windspeed is:</h4>
                    <h3>{weatherData2?.wind?.speed}</h3>
                    <h4>Wind gust is:</h4>
                    <h3>{weatherData2?.wind?.gust}</h3>
                </div>
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