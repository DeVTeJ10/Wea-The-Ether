import axios from "axios";
import { useEffect, useState } from "react";
import "./homepage.css"
import windspeed from "../Images/windspeed.png"



const HomePage = () => {
 
    const [weatherInput, setWeatherInput] = useState("");  // Handle the input value
    const [weatherData1, setWeatherData1] = useState(); // Handle the second api call
    const [weatherData2, setWeatherData2] = useState(); // Handle the first api call
    const [localSunriseTime, setLocalSunriseTime] = useState(); // Handle local sunrise data
    const [localSunsetTime, setLocalSunsetTime] = useState(); // Handle local sunset data
    const [displayIconic, setDisplayIcon] = useState(""); // Handle displaying the right image for the right weather
    const [forecastHour1, setForecastHour1] = useState("") // Handle forecast of first hour available.
    const [forecastHour2, setForecastHour2] = useState("")
    const [forecastHour3, setForecastHour3] = useState("")
    const [forecastHour4, setForecastHour4] = useState("")
    const apiKey = 'b96e0a473aed03ed2ffcdd3d32e5f323' // Api key needed for both apis to work


    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTwoApis();
      };


    const handleChange = (e) => {
        setWeatherInput(e.target.value);  // Update state with input value
      };
 

    const fetchData2 = async () => {
        console.log("fetchData2 is being called");
        if (!weatherInput) return;
    
        const apiKey = "b96e0a473aed03ed2ffcdd3d32e5f323";
        const apidata1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${apiKey}`);
        return apidata1;
    };
    
    const fetchData1 = async () => {
        console.log("fetchData1 is being called");
    
        // Wait for fetchData2 to complete and get its data
        const weatherData2 = await fetchData2();
    
        if (!weatherData2 || !weatherData2?.data?.coord?.lat || !weatherData2?.data?.coord?.lon) return;
    
        const locationLat = weatherData2.data.coord.lat;
        const locationLon = weatherData2.data.coord.lon;
        const apiKey = "b96e0a473aed03ed2ffcdd3d32e5f323";
        
        const datacorrectly = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${locationLat}&lon=${locationLon}&appid=${apiKey}`);
        return datacorrectly;
    };
    

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
                if (weatherInput && !weatherData2 ) {  // Only fetch data if there's input
                    fetchTwoApis()
                }
            }, [weatherInput && weatherData2]);



        
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



        // const displayForecastImage = () => {
        //     if (weatherData2 && weatherData2?.weather?.[0].icon) {
        //         const iconCode = weatherData2?.weather[0].icon;
        //         const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        //          setForecastImage(iconUrl)
        //     }
        // }
        // useEffect(() => {
        //     displayForecastImage()
        // },[weatherData2])



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



        const processDatas = () => {
            if (weatherData1 && weatherData1?.list && weatherData1?.list)  {
                const hour1 = weatherData1.list[0].dt_txt; // Ensure value is present
                const hour2 = weatherData1.list[1].dt_txt;
                const hour3 = weatherData1.list[2].dt_txt;
                const hour4 = weatherData1.list[3].dt_txt;
                const forecastHour1Data = new Date(hour1)
                const forecastHour2Data = new Date(hour2)
                const forecastHour3Data = new Date(hour3)
                const forecastHour4Data = new Date(hour4)
                const forecastHourly1 = forecastHour1Data.getHours()
                const forecastHourly2 = forecastHour2Data.getHours()
                const forecastHourly3 = forecastHour3Data.getHours()
                const forecastHourly4 = forecastHour4Data.getHours()
                // const forecastValue1 = weatherData1.list[0];
                setForecastHour1(forecastHourly1)
                setForecastHour2(forecastHourly2)
                setForecastHour3(forecastHourly3)
                setForecastHour4(forecastHourly4)
            }
        };
        // Run the function only when `weatherData` has been updated
        useEffect(() => {
            if (weatherData1) {
                processDatas(); 
            }
        }, [weatherData1]);
        

    
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
            <h3 className="forehour">Todays Hourly Forecast</h3>
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
                            <h3>{forecastHour1}:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <h5 className="hourlydesc">Weather description</h5>
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                        <div className="Hourlyforecast">
                            <h3>{forecastHour2}:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <h5 className="hourlydesc">Weather description</h5>
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                        <div className="Hourlyforecast">
                            <h3>{forecastHour3}:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <h5 className="hourlydesc">Weather description</h5>
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                        <div className="Hourlyforecast">
                            <h3>{forecastHour4}:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <h5 className="hourlydesc">Weather description</h5>
                            <h3 className="hourly">0km/hr</h3>
                        </div>
                    <div className="Hourlyforecast">
                            <h3>00:00</h3>
                            <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">00c</h3>
                            <h5 className="hourlydesc">Weather description</h5>
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