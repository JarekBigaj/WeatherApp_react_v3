import styled from "styled-components";
import { useEffect, useState } from "react";
import { informationAboutWeather, informationAboutWeatherInSelectedCity } from "./connection";

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

  return (
    <div>
      <WeatherAppWrapper>
        <Date/>
        <Time/>
        <Title/>
        <ButtonBox>
          {
            citiesButtonsValues.map((value,index) => {
              return <Button key={index} value={value} onClick={() => setCurrenCity(value)} />
            })
          }
        </ButtonBox>
        <Temperature/>
        <Wind/>
        <InformationAboutWheater/>
      </WeatherAppWrapper>
    </div>
  );
}

const WeatherAppWrapper = ({children}) => {
  return <div>{children}</div>
}

const Date = () =>{
  return <span>data</span>
}

const Time = () =>{
  return <span>Time</span>
}

const Title = () =>{
  return <h1>Pogodynka</h1>
}

const ButtonBox = ({children}) =>{
  return <div>{children}</div>
}

const Button = ({value, onClick}) =>{
  return <button onClick={onClick}>{value}</button>
}

const Temperature = () => {
  return <span>Temperature</span>
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
  return <span>WindDirection</span>
}

const WindSpeed = () => {
  return <span>WindSpeed</span>
}

const InformationAboutWheater = () => {
  return <span>InformationAboutWheater</span>
}
export default App;
