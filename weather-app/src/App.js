import styled from "styled-components";
import { useState } from "react";
import { informationAboutWeather, informationAboutWeatherInSelectedCity } from "./connection";

const citiesButtonsValues = ['Krakow', 'Marcowka', 'Warsaw'];

function App() {
  const [currentCity, setCurrenCity] = useState(() => {
    return 'Krakow'
  });

  const informationCurrentCityWeather = informationAboutWeather((currentCity));

  const showCurrentCityWeather = fetch(informationCurrentCityWeather)
  .then(response => response.json())
  .then(response => {
    const {current_weather} = response;
    console.log(current_weather);
  })


  return (
    <div>
      <WeatherAppWrapper>
        <Date/>
        <Time/>
        <Title/>
        <ButtonBox>
          {
            citiesButtonsValues.map((value,index) => {
              return <Button key={index} value={value} />
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

const Button = ({value}) =>{
  return <button>{value}</button>
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
