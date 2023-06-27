import React, { useEffect, useState } from 'react';
import { TiWeatherCloudy, TiWeatherDownpour } from 'react-icons/ti';
import { SlCalender } from 'react-icons/sl'
import humidity from '../assests/humidity.png';
import feels_like from '../assests/feels_like.png';
import temp_max from '../assests/temp_max.png';
import temp_min from '../assests/temp_min.png';
import { WiHumidity } from 'react-icons/wi';
import { TbTemperaturePlus } from 'react-icons/tb';
import { TbTemperatureMinus } from 'react-icons/tb';
import { BiSolidHot } from 'react-icons/bi';
import Notfound from '../notfound/Notfound'
import '../weather/weather.css';

const WeatherApp = () => {

    const [state, setState] = useState('');
    const [search, setSearch] = useState("bhubaneswar");
    const [cloud, setCloud] = useState("")
    const [inputValue, setInputValue] = useState("")
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const weatherFunc = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=11dc8b5eee1ec8af929387eb650afd7b&units=metric`)
                const data = await response.json()
                const fetchdata = await data.main
                const cloudData = await data
                setState(fetchdata)
                setCloud(cloudData)
            } catch (error) {
                console.log(error);
            }
        }
        weatherFunc();
    }, [search])

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000);
        return () => {
            clearInterval(interval)
        }
    })
    const handleClick = (e) => {
        e.preventDefault()
        setSearch(inputValue)
    }

    if (!state) {
        return <Notfound />
    }
    return (
        <main>
            <div className='weatherapp'>
                <div className="weather">
                    <div className="main">
                        <section>
                            <h2>{cloud.name}</h2>
                            <aside>
                                <TiWeatherCloudy />
                                <p>{state.temp} <span>°C</span></p>
                            </aside>
                            <div className="time">
                                <span>{currentDate.toLocaleString()}</span>
                            </div>
                        </section>
                        <div className="searchBox">
                            <form >
                                <input type="text" name="search" id="search" placeholder='Search your city' onChange={((e) => setInputValue(e.target.value))} />
                                <button type="submit" onClick={handleClick}>submit</button>
                            </form>
                            {/* <p>Sunshine is delicious, rain is refreshing, wind braces us up, snow is exhilarating; there is really no such thing as bad weather, only different kinds of good weather</p> */}
                            <p>Life isn't about waiting for the storm to pass, it's about learning to dance in the rain</p>

                        </div>
                        <article>
                            <Weather cloud={cloud} />
                        </article>
                    </div>
                </div>
            </div>
            <div className='secondpara'>
                <div className="box">
                    <img src={humidity} alt="" />
                    <p>Humidity</p>
                    <span><WiHumidity />{state.humidity}</span>
                </div>
                <div className="box">
                    <img src={temp_min} alt="" />
                    <p>Temp_min</p>
                    <span><TbTemperatureMinus />{state.temp_min}</span>
                </div>
                <div className="box">
                    <img src={temp_max} alt="" />
                    <p>Temp_max</p>
                    <span><TbTemperaturePlus />{state.temp_max}</span>
                </div>
                <div className="box">
                    <img src={feels_like} alt="" />
                    <p>Feels_like</p>
                    <span><BiSolidHot />{state.feels_like}</span>
                </div>
            </div>
        </main>
    )
}

export default WeatherApp



const Weather = ({ cloud }) => {
    const date = new Date()
    const dayOfWeek = date.getDay();
    let weekday = "";
    switch (dayOfWeek) {
        case 0:
            weekday = "Sunday";
            break;
        case 1:
            weekday = "Monday";
            break;
        case 2:
            weekday = "Tuesday";
            break;
        case 3:
            weekday = "Wednesday";
            break;
        case 4:
            weekday = "Thursday";
            break;
        case 5:
            weekday = "Friday";
            break;
        case 6:
            weekday = "Saturday";
            break;
        default:
            break;
    }
    return (
        <div className='season'>
            <p>Weather</p>
            <span><SlCalender />{weekday}</span>
            <span><TiWeatherDownpour />{ cloud.weather[0].main}</span>
        </div>
    )
}
