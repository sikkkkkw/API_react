import { useState, useEffect } from "react";
import Tawk from "./Tawk";
import axios from "axios";
import WeatherDescKo from "./WeatherDescKo";
import { MdLocationCity } from "react-icons/md";
import { SiUnitednations } from "react-icons/si";
import { FaTemperatureHalf } from "react-icons/fa6";
import { TbWorldLatitude } from "react-icons/tb";
import { TbWorldLongitude } from "react-icons/tb";
import { FaWind } from "react-icons/fa";
import { MdOutlineWindPower } from "react-icons/md";


function App() {
  const REACT_API_KEY = "c1acfd024a0875dcca5addd752d9dfdf";
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState('');

  const searchWeather = async (e) => {
    if (e.key === 'Enter') {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${REACT_API_KEY}`;
        const { data } = await axios.get(url);

        // 필요한 날씨 데이터만 추출
        const { name, main, weather, coord, wind } = data;
        const temperatureInCelsius = Math.round(((main.temp - 273.15) * 10)) / 10;

        setWeatherData({
          name,
          temperature: temperatureInCelsius,
          weatherDescription: getWeatherDescription(weather[0]?.id), // 날씨 설명 함수 사용
          icon: weather[0]?.icon,
          latitude: coord.lat,
          longitude: coord.lon,
          windSpeed: wind.speed,
          windDegree: wind.deg,
          country: data.sys.country,
          airQuality: main.aqi,
        });

        console.log(data);
      } catch (err) {
        alert(err);
      }
    }
  };

  // 날씨 상태 코드에 대한 한국어 설명 가져오기
  const getWeatherDescription = (weatherCode) => {
    const descriptionObject = WeatherDescKo.find((item) => Object.keys(item)[0] === weatherCode.toString());
    return descriptionObject ? Object.values(descriptionObject)[0] : '';
  };

  // 현재 시간대를 반환하는 함수
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return '아침';
    } else if (hour >= 12 && hour < 18) {
      return '오후';
    } else if (hour >= 18 && hour < 22) {
      return '저녁';
    } else {
      return '밤';
    }
  };

  useEffect(() => {
    // 현재 날짜 및 시간을 1초마다 업데이트
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
      setCurrentPeriod(getTimeOfDay());
    }, 1000);

    // 컴포넌트가 언마운트될 때 interval 해제
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
    <div className=" fixed top-0 w-full h-14 flex  justify-center items-center font-semibold text-2xl  bg-purple-700 z-20">세계 현재 날씨</div>
      <div className="relative bg-purple-600 w-full h-[100vh] flex justify-center items-center flex-col">
        
      <div className="absolute top-[160px] text-white text-6xl font-bold">
      {currentDate}
      </div>
        <div className="absolute top-[220px] text-white text-7xl font-bold">
          {`${currentPeriod} ${currentTime}`}
        </div>

        <div className="flex justify-center items-center">
          <input
            className="w-[500px] h-[70px] text-center text-4xl font-semibold rounded-lg"
            placeholder="도시를 입력하세요.(seoul)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            type="text"
            onKeyDown={searchWeather}
          />
        </div>
        <div className="absolute bottom-[20px] flex justify-center items-center">
  {weatherData && ( 
    <div className="text-xl w-[400px] border-2 p-4 rounded-lg bg-black text-gray-800  ">
      <div>
      <div className="flex w-full items-center px-2 justify-between"><div className=""><img src={`http://openweathermap.org/img/w/${weatherData.icon}.png`} alt="Weather Icon" className=" inline-block w-[80px] h-[80px] text-center" /> 날씨 : {weatherData.weatherDescription}</div>
      </div>
              <div className="flex w-full items-center px-2 justify-between"><div className="w-[20px] h-[20px]"><MdLocationCity  /></div> 도시 : {weatherData.name}</div>
              <div className="flex w-full items-center px-2 justify-between"><div className="w-[20px] h-[20px]"><SiUnitednations /></div> 국가 코드 : {weatherData.country}</div>
              <div className="flex w-full items-center px-2 justify-between"><div className="w-[20px] h-[20px]"><FaTemperatureHalf /></div>온도 : {weatherData.temperature}°C</div>
              
            
           </div>
              <div className="flex w-full items-center px-2 justify-between"><div className="w-[20px] h-[20px]"><TbWorldLatitude /></div>위도 : {weatherData.latitude}</div>
              <div className="flex w-full items-center px-2 justify-between"><div className="w-[20px] h-[20px]"><TbWorldLongitude /></div>경도 : {weatherData.longitude}</div>
              <div className="flex w-full items-center px-2 justify-between"><div className="w-[20px] h-[20px]">< FaWind/></div>바람 속도 : {weatherData.windSpeed} m/s</div>
              <div className="flex w-full items-center px-2   justify-between"><div className="w-[20px] h-[20px]">< MdOutlineWindPower /></div>바람 각도 : {weatherData.windDegree}°</div>
            </div>
          )}
        </div>
      </div>

      <Tawk />
    </>
  );
}

export default App;
