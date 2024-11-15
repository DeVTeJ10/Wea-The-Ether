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


    const [day1, setDay1] = useState("")
    const [day2, setDay2] = useState("")
    const [day3, setDay3] = useState("")
    const [day4, setDay4] = useState("")
    const [day5, setDay5] = useState("")

    const [startingDate, setStartDate] = useState("")
    const [endingDate, setEndDate] = useState("")


    let [dataWeather] = useState([""])
    

    let [day1Temp, setDay1Temp] = useState("")
    let [day2Temp, setDay2Temp] = useState("")
    let [day3Temp, setDay3Temp] = useState("")
    let [day4Temp, setDay4Temp] = useState("")
    let [day5Temp, setDay5Temp] = useState("")
    let [day6Temp, setDay6Temp] = useState("")


    const [checkingThisValuesYeahState, setCheckingThisValuesYeahState] = useState(null);




    // let weatherdata = useState([])


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
                extractDataForDateRange()
                getDateRange()

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





        const extractDataForDateRange =  (weatherData1) => {  // 1) This function is setting the startdate and endate of possible 
            // Calculate the dynamic start and end dates      // contd... from (1) available data, "itemDate" then maps through
                                                              // contd... from (1- -) list.dt_txt and compares the date to start
                                                              // cont... from (1- - -) and end date. 
                                                              // cont... from (1 - - - -) (this function only gives me a range of dates ...)
            if(!weatherData1 && !dataWeather && !weatherInput) return
            const startDate = new Date().toISOString().split("T")[0];
            const endDate = new Date(new Date().setDate(new Date().getDate() + 6)).toISOString().split("T")[0];


            setStartDate(startDate)
            setEndDate(endDate)

            console.log("starting date:", startDate)
            console.log("ending date:", endDate)

            console.log("check data weather dawg", dataWeather)



            const weatherData = weatherData1; // Array of 40 weather data objects

                for (let i = 0; i < weatherData?.list?.length; i++) {
                const item = weatherData?.list[i];
                const timestamp = item.dt;
                const temperature = item.main.temp;

                console.log(`Timestamp: ${timestamp}, Temperature: ${temperature}`);
                }

              

            // if ( day1 >= startingDate && day1 <= endingDate){
            //     console.log("this is true", day1)

            // }else{
            //     console.log("check again")
            // }

            // Filter for items within the date range
            return weatherData1?.list?.filter(list => {
                const itemDate = new Date(list?.dt_txt).toISOString().split("T")[0];
                 return itemDate >= startDate && itemDate <= endDate;
                
            });


        };        
        
        useEffect(() => {
            if (!weatherData1 && !weatherInput && dataWeather) {
                return
            }else{
                extractDataForDateRange()
                const filteredData = extractDataForDateRange(weatherData1)
                dataWeather.push(filteredData)
                console.log("Available weather data:", filteredData)
                getDateRange()
            }
        }, [weatherData1]);






        const getDateRange = () => {

            if(!dataWeather && !weatherInput) return
            // Calculate the dynamic start and end dates
            const today = new Date();
            const tomorrow = new Date(today + 1); // Copy today's date
            const nextTomorrow = new Date(tomorrow)
            const dayAfterNextTomorrow = new Date(nextTomorrow)
            const twoDaysFromTomorrow = new Date(dayAfterNextTomorrow)
            const threeDaysFromTomorrow = new Date(twoDaysFromTomorrow)

            tomorrow.setDate(today.getDate() + 1); // returns value for the following day
            nextTomorrow.setDate(today.getDate() + 2); // returns value for the day after tomorrow
            dayAfterNextTomorrow.setDate(today.getDate() + 3); // returns value for 2 days after tomorrow
            twoDaysFromTomorrow.setDate(today.getDate() + 4); // returns value for 3 days after tomorrow
            threeDaysFromTomorrow.setDate(today.getDate() + 5); // returns value for 4 days after tomorrow
        
            const tomorrowsDate = tomorrow.toISOString().split('T')[0];
            const nextTomorrowDate = nextTomorrow.toISOString().split('T')[0];
            const dayAfterNextTomorrowDate = dayAfterNextTomorrow.toISOString().split('T')[0]
            const twoDaysFromTomorrowDate = twoDaysFromTomorrow.toISOString().split('T')[0]
            const threeDaysFromTomorrowDate = threeDaysFromTomorrow.toISOString().split('T')[0]

            // console.log(tomorrowsDate);
            // console.log(nextTomorrowDate)
            // console.log(dayAfterNextTomorrowDate)
            // console.log(twoDaysFromTomorrowDate)
            // console.log(threeDaysFromTomorrowDate)

            setDay1(tomorrowsDate)
            setDay2(nextTomorrowDate)
            setDay3(dayAfterNextTomorrowDate)
            setDay4(twoDaysFromTomorrowDate)
            setDay5(threeDaysFromTomorrowDate)
        };
        
            useEffect(() => {
                if (weatherData1 && weatherInput && dataWeather){
                    getDateRange(); 
                    console.log("checking data forecast 1st day",day1)
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

    {/* <div>
        
    </div> */}

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
                    <h4>humidity:</h4>
                    <h3>{weatherData2?.main?.humidity}</h3>
                    </div>
                    <div>
                    <h4>Pressure:</h4>
                    <h3>{weatherData2?.main?.pressure}</h3>
                    </div>
                    
                </div>
                <div className="wind">
                    <h4>windspeed:</h4>
                    <h3>{weatherData2?.wind?.speed}</h3>
                    <h4>Wind gust:</h4>
                    <h3>{weatherData2?.wind?.gust}</h3>
                </div>
                </div>
                </div>
                </div>
        </div>

  
        <div className="foresighter">
        <div className="hourlydayforcaster">
            <h3 className="forcaster">5 days forecast</h3>
            <h3 className="forehour">Todays Hourly Forecast</h3>
            </div>
        
                <div className="finaltemp">
                    <div className="weektemperature">
                    <div className="weekdaystempo">
                    <div style={{ width: "30.72px", height: "30.72px" }}>
                        { displayForecastImg1 && <img src={windspeed} width={30.72} height={30.72} alt="Star 1" />}
                        </div>
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">{day1}</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">{day2}</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">{day3}</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">{day4}</h3>
                    </div>
                    <div className="weekdaystempo">
                        <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                        <h3 className="degrees">20C</h3>
                        <h3 className="degrees">{day5}</h3>
                    </div>
                    </div>
 
 
                <div className="hourcasterfors">
                <div className="hourcasterfor">
                    <div className="forecasthour">
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
  );
};
 
export default HomePage;