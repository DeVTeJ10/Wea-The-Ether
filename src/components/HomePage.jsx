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

    const [displayForecastImg1, setForecastImage1] = useState("")
    const [displayForecastImg2, setForecastImage2] = useState("")
    const [displayForecastImg3, setForecastImage3] = useState("")
    const [displayForecastImg4, setForecastImage4] = useState("")
    const [displayForecastImg5, setForecastImage5] = useState("")

    const [forecastHour1, setForecastHour1] = useState("") // Handle forecast of first hour available.
    const [forecastHour2, setForecastHour2] = useState("")
    const [forecastHour3, setForecastHour3] = useState("")
    const [forecastHour4, setForecastHour4] = useState("")
    const [forecastHour5, setForecastHour5] = useState("")


    const [avgTemp, setAvgTemp] = useState({})
    
    const apiKey = 'b96e0a473aed03ed2ffcdd3d32e5f323' // Api key needed for both apis to work




    const handleSubmit = (e) => {
        e.preventDefault();
        fetchTwoApis();
      };


    const handleChange = (e) => {
        setWeatherInput(e.target.value);  // Update state with input value
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


    const fetchData2 = async () => {
        console.log("fetchData2 is being called");
        if (!weatherInput) return;
    
        const apiKey = "b96e0a473aed03ed2ffcdd3d32e5f323";
        const apidata1 = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${weatherInput}&appid=${apiKey}`);
        return apidata1;
    };

    

    const fetchTwoApis = async () => {
        Promise.all([fetchData1(), fetchData2()])
        .then (([response1, response2])  => {
            if (!weatherInput) return;
                console.log('Data from 1st api:', response1);
                setWeatherData1(response1?.data)
                console.log('Data from 2nd api:', response2);
                setWeatherData2(response2?.data)
                processSunData()
                processHourlyForecast()
                displayImage()
                displayForecastImage()
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



        const displayForecastImage = () => {
            if (weatherData1 && weatherData1?.list) {
                const iconCode1 = weatherData1?.list[0]?.weather[0]?.icon;
                const iconCode2 = weatherData1?.list[1]?.weather[0]?.icon;
                const iconCode3 = weatherData1?.list[2]?.weather[0]?.icon;
                const iconCode4 = weatherData1.list[3]?.weather[0]?.icon;
                const iconCode5 = weatherData1.list[4]?.weather[0]?.icon

                const iconUrl1 = `http://openweathermap.org/img/wn/${iconCode1}@2x.png`;  
                const iconUrl2 = `http://openweathermap.org/img/wn/${iconCode2}@2x.png`;
                const iconUrl3 = `http://openweathermap.org/img/wn/${iconCode3}@2x.png`;
                const iconUrl4 = `http://openweathermap.org/img/wn/${iconCode4}@2x.png`;
                const iconUrl5 = `http://openweathermap.org/img/wn/${iconCode5}@2x.png`;

                 setForecastImage1(iconUrl1)
                 setForecastImage2(iconUrl2)
                 setForecastImage3(iconUrl3)
                 setForecastImage4(iconUrl4)
                 setForecastImage5(iconUrl5)
            }
        }
        useEffect(() => {
            displayForecastImage()
        },[weatherData1])



        const processSunData = () => {
            if (weatherData2 && weatherData2?.sys?.sunrise && weatherData2?.sys?.sunset)  {
                const sunriseValue = weatherData2.sys.sunrise; // Ensure value is present
                const sunsetValue = weatherData2.sys.sunset;

                const currentSunriseTimes = new Date(sunriseValue * 1000).toLocaleString(); // Convert to date
                const currentSunsetTimes = new Date(sunsetValue * 1000).toLocaleString(); // Convert to date


                setLocalSunriseTime(currentSunriseTimes); // Update the state variable
                setLocalSunsetTime(currentSunsetTimes); // Update the state variable

            }
        };
        // Run the function only when `weatherData` has been updated
        useEffect(() => {
            if (weatherData2) {
                processSunData(); 
            }
        }, [weatherData2]);



        const processHourlyForecast = () => {
            if (weatherData1 && weatherData1?.list && weatherData1?.list)  {
                const hour1 = weatherData1.list[0].dt_txt; // Ensure value is present
                const hour2 = weatherData1.list[1].dt_txt;
                const hour3 = weatherData1.list[2].dt_txt;
                const hour4 = weatherData1.list[3].dt_txt;
                const hour5 = weatherData1.list[4].dt_txt;

                const forecastHour1Data = new Date(hour1)
                const forecastHour2Data = new Date(hour2)
                const forecastHour3Data = new Date(hour3)
                const forecastHour4Data = new Date(hour4)
                const forecastHour5Data = new Date(hour5)

                const forecastHourly1 = forecastHour1Data.getHours()
                const forecastHourly2 = forecastHour2Data.getHours()
                const forecastHourly3 = forecastHour3Data.getHours()
                const forecastHourly4 = forecastHour4Data.getHours()
                const forecastHourly5 = forecastHour5Data.getHours()

                setForecastHour1(forecastHourly1)
                setForecastHour2(forecastHourly2)
                setForecastHour3(forecastHourly3)
                setForecastHour4(forecastHourly4)
                setForecastHour5(forecastHourly5)
            }
        };
        // Run the function only when `weatherData` has been updated
        useEffect(() => {
            if (weatherData1) {
                processHourlyForecast(); 
            }
        }, [weatherData1]);





            const aragmenbtAction = () => {
                let checkerDate;
                let dateCat = {}
                for (let index = 0; index < weatherData1?.list?.length; index++) {
                    const element = weatherData1?.list[index];
                    let elementDate = element?.dt_txt?.split(" ")[0]
                    if(!checkerDate) {
                        checkerDate = elementDate
                    }
                    if(elementDate === checkerDate && !dateCat[elementDate]) {
                        dateCat[elementDate] = [element]
                    } else if(elementDate === checkerDate && dateCat[elementDate]){
                        dateCat[elementDate].push(element)
                    }
            
                    if(elementDate !== checkerDate && checkerDate){
                        checkerDate = elementDate
                        dateCat[elementDate] = [element]
                    }
                    
                }
            
                return dateCat;
            }

            useEffect( () => {
              let _renewD = aragmenbtAction()
              setAvgTemp(_renewD)
            }, [weatherData1])
            





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
            </div>
        </div>


    <div className="mostDevnitly">
    <div className="ThankGod">
        <div className="checktemps">
                <div className="detailsofcity" >
                    <div className="detailscity">
                        <div className="citydetails">
                            <h2>The Latitude for {weatherData2?.name} in {weatherData2?.sys?.country} is: {weatherData2?.coord?.lat} with longitude: {weatherData2?.coord?.lon}</h2>
                            {displayIconic && <img src={displayIconic} width={150} height={150} alt="Star 3" />}
                            <h1>{weatherData2?.weather?.[0]?.description}</h1>
                        </div>
                    </div>
                </div>
 
                <div className="detailsDay">
                <div className="daysdetails">
                <div className="sunrisesunset">
                    <div className="sunrise">
                        <h4>Sunrise:</h4>
                        <h4 id="Sunrise">{localSunriseTime}</h4>
                    </div>
                    <div className="sunset">
                        <h4>Sunset:</h4>
                        <h4 id="Sunset">{localSunsetTime} </h4>
                    </div>
                    <h3 className="feelslike">Feels like: {weatherData2?.main?.temp}</h3>
                </div>
 
                <div className="tetherwe">
                    <div style={{ width: "100px", height: "100px" }}>
                    {displayIconic && <img src={displayIconic} width={100} height={100} alt="Star 3" />}
                    </div>
                    <h3 className="iconic">{weatherData2?.weather?.[0]?.description}</h3>
                </div>
 
            <div className="humidPressure">
            <div>
                    <div className="humidity">
                    <h4>humidity:</h4>
                    <h3>{weatherData2?.main?.humidity}</h3>
                    </div>
                    <div className="pressure">
                    <h4>Pressure:</h4>
                    <h3>{weatherData2?.main?.pressure}</h3>
                    </div>
                    
                </div>
                <div className="speedGust">
                <div className="windSpeed">
                    <h4>windspeed:</h4>
                    <h3>{weatherData2?.wind?.speed}</h3>
                </div>
                <div className="windGust">
                    <h4>Wind gust:</h4>
                    <h3>{weatherData2?.wind?.gust}</h3>
                </div>
                </div>
            </div>
                </div>
                </div>
                </div>
        </div>
    </div>

        <div className="foresighter">
            <div>

            </div>
        <div className="hourlydayforcaster">
            </div>
                <div className="finaltemp">

            <div className="TeJthis">
            <h3 className="forcaster">5 day forecast</h3>
                        <div className="weektemperature">
                        {Object.entries(avgTemp)?.map(([key, value]) =>  {
                        let totalDeg = 0
                        value?.forEach((v) => {
                            totalDeg = totalDeg + v?.main?.temp
                            totalDeg = Math.round(totalDeg * 1000) /1000
                        })
                            return (
                          <div key={key} className="weekdaystempo">
                          <h3 className="degrees">{ `${ totalDeg/value?.length}F`}</h3>
                          <h3 className="degrees">{key}</h3>
                      </div>  
                        )})}
                    </div>
            </div>



            <div className="tentoesgenius">
            <h3 className="forehour">Todays Hourly Forecast</h3>
                    <div className="hourcasterfors">
                    <div className="hourcasterfor">
                        <div className="forecasthour">
                            <div className="forsmallerscreen1">
                                <div className="Hourlyforecast">
                                    <h3>{forecastHour1}:00</h3>
                                    <img src={displayForecastImg1} width={30.72} height={30.72} alt="Star 3" />
                                    <h3 className="hourly">{weatherData1?.list[0]?.main?.feels_like}c</h3>
                                    <h5 className="hourlydesc">{weatherData1?.list[0]?.weather[0]?.description}</h5>
                                    <h5 className="hourly">Humidity is: {weatherData1?.list[0]?.main?.humidity}</h5>
                                </div>
                                <div className="Hourlyforecast">
                                    <h3>{forecastHour2}:00</h3> 
                                    <img src={displayForecastImg2} width={30.72} height={30.72} alt="Star 3" />
                                    <h3 className="hourly">{weatherData1?.list[1]?.main?.feels_like}c</h3>
                                    <h5 className="hourlydesc">{weatherData1?.list[1]?.weather[0]?.description}</h5>
                                    <h5 className="hourly">Humidity is: {weatherData1?.list[1]?.main?.humidity}</h5>
                                </div>
                            </div>
                            <div className="forsmallerscreen2">
                            <div className="Hourlyforecast">
                                <h3>{forecastHour3}:00</h3>
                                <img src={displayForecastImg3} width={30.72} height={30.72} alt="Star 3" />
                                <h3 className="hourly">{weatherData1?.list[2]?.main?.feels_like}c</h3>
                                <h5 className="hourlydesc">{weatherData1?.list[2]?.weather[0]?.description}</h5>
                                <h5 className="hourly">Humidity is: {weatherData1?.list[2]?.main?.humidity}</h5>
                            </div>
                            <div className="Hourlyforecast">
                                <h3>{forecastHour4}:00</h3>
                                <img src={displayForecastImg4} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">{weatherData1?.list[3]?.main?.feels_like}c</h3>
                            <h5 className="hourlydesc">{weatherData1?.list[3]?.weather[0]?.description}</h5>
                            <h5 className="hourly">Humidity is: {weatherData1?.list[3]?.main?.humidity}</h5>
                        </div>
                        </div>
                        <div className="forsmallerscreen3">
                        <div className="Hourlyforecast">
                            <h3>{forecastHour5}:00</h3>
                            <img src={displayForecastImg5} width={30.72} height={30.72} alt="Star 3" />
                            <h3 className="hourly">{weatherData1?.list[4]?.main?.feels_like}c</h3>
                            <h5 className="hourlydesc">{weatherData1?.list[4]?.weather[0]?.description}</h5>
                            <h5 className="hourly">Humidity is: {weatherData1?.list[4]?.main?.humidity}</h5>
                    </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
                    </div>
        </div>
    </div>
  );
};
 
export default HomePage;