import { useState, useEffect } from "react";
import Tawk from "./Tawk";
import axios from "axios";
import WeatherDescKo from "./WeatherDescKo";
import City from "./City";
import { Link } from "react-router-dom";

// import {Morning} from "./images/Morning.png";
// import { MdLocationCity } from "react-icons/md";
// import { SiUnitednations } from "react-icons/si";
// import { FaTemperatureHalf } from "react-icons/fa6";
// import { TbWorldLatitude } from "react-icons/tb";
// import { TbWorldLongitude } from "react-icons/tb";
// import { FaWind } from "react-icons/fa";
// import { MdOutlineWindPower } from "react-icons/md";

function App() {
  const REACT_API_KEY = "c1acfd024a0875dcca5addd752d9dfdf";
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  // const [currentPeriod, setCurrentPeriod] = useState("");

  const searchWeather = async (e) => {
    if (e.key === "Enter") {
      try {
        const englishLocation = City(location);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${englishLocation}&appid=${REACT_API_KEY}`;
        const { data } = await axios.get(url);

        // 필요한 날씨 데이터만 추출
        const { name, main, weather, coord, wind, uv } = data;
        const temperatureInCelsius = Math.round((main.temp - 273.15) * 10) / 10;

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
          pressure: main.pressure,
          humidity: main.humidity,
          uvIndex: uv ? uv.uvi : 0,
          apparentTemperature: Math.round(main.feels_like - 273.15),
          rainfall: data.rain ? data.rain["1h"] : 0,
        });

        console.log(data);
      } catch (err) {
        alert("도시를 입력하세요.");
      }
    }
  };

  // 날씨 상태 코드에 대한 한국어 설명 가져오기
  const getWeatherDescription = (weatherCode) => {
    const descriptionObject = WeatherDescKo.find(
      (item) => Object.keys(item)[0] === weatherCode.toString()
    );
    return descriptionObject ? Object.values(descriptionObject)[0] : "";
  };

  // 강수량
  const categorizeRainfall = (rainfall) => {
    if (rainfall === 0) {
      return "없음";
    } else if (rainfall < 2.5) {
      return "약함";
    } else if (rainfall < 10) {
      return "보통";
    } else {
      return "강함";
    }
  };
  // 현재 시간대를 반환하는 함수
  // const getTimeOfDay = () => {
  //   const hour = new Date().getHours();
  //   if (hour >= 5 && hour < 12) {
  //     return "새벽";
  //   } else if (hour >= 12 && hour < 18) {
  //     return "아침";
  //   } else if (hour >= 18 && hour < 22) {
  //     return "오후";
  //   } else {
  //     return "밤";
  //   }
  // };

  useEffect(() => {
    // 현재 날짜 및 시간을 1초마다 업데이트
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
      // setCurrentPeriod(getTimeOfDay());
    }, 1000);

    // 컴포넌트가 언마운트될 때 interval 해제
    return () => clearInterval(intervalId);
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      <div className=" fixed top-0 w-full h-14 flex  justify-center items-center font-semibold text-2xl  bg-purple-700 z-20">
        세계 날씨 사이트
      </div>
      <div className=" bg-purple-600 w-full h-[100vh] flex justify-center items-center ">
        <div className="w-[25%] flex justify-center  items-center">
          <Link to={"/Banner"}>
            <div className=" w-[200px] h-[400px] bg-slate-500">광고</div>
          </Link>
        </div>

        <div className="w-[50%]">
          <div className="w-full h-[55px] mt-[150px] flex justify-center  text-white text-7xl font-bold">
            {currentDate}
          </div>
          <div className="w-full h-[85px] my-2 flex justify-center  text-white text-8xl font-bold">
            {currentTime}
          </div>

          <div className="flex justify-center items-center pb-2">
            <input
              className="w-[600px] h-[70px] mt-3  text-center text-4xl font-semibold rounded-lg"
              placeholder="도시를 입력하세요."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              onKeyDown={searchWeather}
            />
          </div>

          <div className="w-full h-[330px] flex justify-center items-center">
            {weatherData && (
              <div className=" bg-white text-xl w-[600px] h-[330px] rounded-lg py-1">
                <div className=" px-6 font-bold text-5xl flex justify-between items-center">
                  <div>
                    <img
                      src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
                      alt="Weather Icon"
                      className=" inline-block w-[65px] h-[65px] "
                    />
                    {weatherData.temperature}°
                  </div>

                  <div className="text-2xl uppercase py-6">
                    {weatherData.name}
                  </div>
                </div>
                <div className="px-6  text-2xl font-bold flex  justify-start pb-2">
                  {weatherData.weatherDescription}
                </div>

                <div className=" px-6 font-bold text-2xl flex justify-between items-center pb-2">
                  <div>체감온도 :</div>
                  <div className="text-2xl">
                    {weatherData.apparentTemperature}°
                  </div>
                </div>
                <div className=" px-6 font-bold text-2xl flex justify-between items-center pb-2">
                  <div>적외선 지수 :</div>
                  <div className="text-2xl">{weatherData.uvIndex}</div>
                </div>
                <div className=" px-6 font-bold text-2xl flex justify-between items-center pb-2">
                  <div>습도 :</div>
                  <div className="text-2xl">{weatherData.humidity}%</div>
                </div>
                <div className=" px-6 font-bold text-2xl flex justify-between items-center pb-2">
                  <div>강수량 :</div>
                  <div className="text-2xl">
                    {categorizeRainfall(weatherData.rainfall)}
                  </div>
                </div>
                {/* <div className=" px-6 font-bold text-2xl flex justify-between items-center py-2">
                <div>기압 :</div>
                <div className="text-2xl">{weatherData.humidity}%</div>
              </div> */}
                <div className=" px-6 font-bold text-2xl flex justify-between items-center pb-2">
                  <div>위도,경도 :</div>
                  <div className="text-2xl">{`${weatherData.latitude},${weatherData.longitude}`}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-[25%] flex justify-center items-center">
          <Link to={"/Banner"}>
            <div className=" w-[200px] h-[400px] bg-slate-500">광고</div>
          </Link>
        </div>
      </div>

      <Tawk />
    </>
  );
}

export default App;
