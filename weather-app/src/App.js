import styled from "styled-components";
import { createContext, useContext, useEffect, useState } from "react";
import { informationAboutWeather, informationAboutWeatherInSelectedCity } from "./connection";

const WeatherContext = createContext(null);

const citiesButtonsValues = ['Krakow', 'Marcowka', 'Warsaw'];

function App() {
  const [currentCity, setCurrenCity] = useState('Krakow');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const informationCurrentCityWeather = informationAboutWeather((currentCity));

    const showCurrentCityWeather = fetch(informationCurrentCityWeather)
    .then(response => {
      if(!response.ok){
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
      }
      return response.json()
    })
    .then(({current_weather}) => {
      setWeatherData(current_weather);
      setError(null);
    })
    .catch((err) => {
      setError(err.message)
      setWeatherData(null);
    })
    .finally(()=>{
      setLoading(false);
    });
  },[currentCity]);
 
  const sendedDataTime = weatherData ? weatherData.time : '';

  return (
    <div>
      <WeatherAppWrapper>
        <LoadingMessage loading={loading}/>
        <ErrorMessage error={error}/>
        <DataTimeWrapper dateTime={sendedDataTime}/>
        <Title city={currentCity}/>
        <ButtonBox>
          {
            citiesButtonsValues.map((value,index) => {
              return <Button key={index} value={value} onClick={() => setCurrenCity(value)} />
            })
          }
        </ButtonBox>
        <WeatherContext.Provider value={weatherData}>
          <InformationAboutWheaterWrapper/>
        </WeatherContext.Provider>
      </WeatherAppWrapper>
    </div>
  );
}

const WeatherAppWrapper = ({children}) => {
  return <div>{children}</div>
}

const LoadingMessage = ({loading}) =>{
  return (
      <div>
        {loading && <span>A moment please...</span>}
      </div>
    );
}


const ErrorMessage = ({error}) =>{
  return (
    <div>
      {error && <div>{`There is a problem with data - ${error}`}</div>}
    </div>
  )
}

const DataTimeWrapper = ({dateTime}) => {
  const [date,time] = dateTime.split("T");

  return (
      <div>
        <Date date={date}/>
        <Time time={time}/>
      </div>
    )
}

const Date = ({date}) =>{
  return <span>{date}</span>
}

const Time = ({time}) =>{
  return <span>{time}</span>
}

const Title = ({city}) =>{
  return <h1>{city}</h1>
}

const ButtonBox = ({children}) =>{
  return <div>{children}</div>
}

const Button = ({value, onClick}) =>{
  return <button onClick={onClick}>{value}</button>
}

const Temperature = () => {
  const weatherData = useContext(WeatherContext);
  const temperature = weatherData ? weatherData.temperature : '';
  return <span>{temperature}</span>
}

const Wind = () => {
  return (
    <div>
      <WindDirection/>
      <WindSpeed/>
    </div>
  )
}

const WindDirection = () => {
  const weatherData = useContext(WeatherContext);
  const winddirection = weatherData ? weatherData.winddirection : '';
  return <span>{winddirection}</span>
}

const WindSpeed = () => {
  const weatherData = useContext(WeatherContext);
  const windspeed = weatherData ? weatherData.windspeed : '';
  return <span>{windspeed}</span>
}

const InformationAboutWheater = () => {
  const weatherData = useContext(WeatherContext);
  const weathercode = weatherData ? weatherData.weathercode : '';
  return <span>{weathercode}</span>
}

const InformationAboutWheaterWrapper = ({children}) =>{
  return (
    <div>
        <Temperature />
        <Wind/>
        <InformationAboutWheater/>
    </div>
  )
}

const StyledWeatherAppWrapper = styled.div`
  text-align: center;
`;


export default App;
