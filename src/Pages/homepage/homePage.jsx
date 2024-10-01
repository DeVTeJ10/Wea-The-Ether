import "./homePage.css"
import weatherlogo from "../../images/Suns.png";
import weatherlogo2 from "../../images/humidity.png"
import windspeed from "../../images/windspeed.png"
import pressure from "../../images/pressure.png"


const homePage = () => {
  return (
    <div>

        <div className="weatherwe">
                <input placeholder="City" 
                width={803} 
                height={64} 
                className="inputcity"></input>
        </div>
                <div className="checktemps">
                <div>
                    <div className="detailscity">
                        <div className="citydetails">
                            <h2>City name</h2>
                            <h1>00:00</h1>
                            <h4>Monday, 30th September</h4>
                        </div>
                    </div>
                </div>

                <div className="detailsDay">
                <div className="daysdetails">

                <div>
                <h1>00C</h1>
                    <div className="sunrise">
                        <h4>Sunrise</h4>
                        <h4>00:00</h4>
                    </div>
                    <div className="sunset">
                        <h4>Sunset</h4>
                        <h4>00:00</h4>
                    </div>
                    <h3>Feels like: 00C</h3>
                </div>

                <div>
                    <img src={weatherlogo} width={60.72} height={60.72} alt="Star 3" />
                    <h3>Sunny</h3>
                </div>

                <div>
                    <img src={weatherlogo2} width={30.72} height={30.72} alt="Star 3" />
                    <h3>00%</h3>
                    <h4>humidity</h4>
                    <img src={pressure} width={30.72} height={30.72} alt="Star 3" />
                    <h3>26492</h3>
                    <h4>Pressure</h4>
                </div>
                <div>
                    <img src={windspeed} width={30.72} height={30.72} alt="Star 3" />
                    <h3>00%</h3>
                    <h4>windspeed</h4>
                    <img src={pressure} width={30.72} height={30.72} alt="Star 3" />
                    <h3>26492</h3>
                    <h4>UV</h4>
                </div>
                </div>
                </div>
                </div>

            <h1>5 days forcast</h1>
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

             <h3 className="forehour">Hourly Forecast</h3>
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
  );
};

export default homePage;