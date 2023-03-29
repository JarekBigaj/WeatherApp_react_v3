import styled from "styled-components";
import { createContext, useContext, useEffect, useState } from "react";
import { informationAboutWeather} from "./connection";

const WeatherContext = createContext(null);

const citiesButtonsValues = ['Krakow', 'Marcowka', 'Warsaw'];

function App() {
  const [currentCity, setCurrenCity] = useState('Krakow');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const informationCurrentCityWeather = informationAboutWeather((currentCity));

    fetch(informationCurrentCityWeather)
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
        <WeatherContext.Provider value={weatherData}>
          <InformationAboutWheaterWrapper/>
        </WeatherContext.Provider>
        <ButtonBox>
          {
            citiesButtonsValues.map((value,index) => {
              return <Button key={index} value={value} onClick={() => setCurrenCity(value)} />
            })
          }
        </ButtonBox>
      </WeatherAppWrapper>
    </div>
  );
}

const WeatherAppWrapper = ({children}) => {
  return <StyledWeatherAppWrapper>{children}</StyledWeatherAppWrapper>
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
      <StyledDataTimeWrapper>
        <Date date={date}/>
        <Time time={time}/>
      </StyledDataTimeWrapper>
    )
}

const Date = styled(({className, date}) =>{
  return <span className={className}>{date}</span>
})`
  color: #ffff8b;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: left;
`;

const Time = styled(({className, time}) =>{
  return <span className={className}>{time}</span>
})`
  color: #ffff8b;
  font-weight: bold;
  font-size: 1.3rem;
  text-align: right;
`;

const Title = styled(({className, city}) =>{
  return <h1 className={className}>{city}</h1>
})`
  color: #ffff8b;
  font-weight: bold;
  font-size: 3rem;
`;

const ButtonBox = ({children}) =>{
  return <StyledButtonBox>{children}</StyledButtonBox>
}

const Button = ({value, onClick}) =>{
  return <StyledButton onClick={onClick}>{value}</StyledButton>
}

const Temperature = styled(({className}) => {
  const weatherData = useContext(WeatherContext);
  const temperature = weatherData ? weatherData.temperature+" °C" : '';
  return <span className={className}>{temperature}</span>
})`
  color: #ffff8b;
  font-weight: bold;
  font-size: 4rem;
`;

const Wind = () => {
  return (
    <StyledWind>
      <WindDirection/>
      <WindSpeed/>
    </StyledWind>
  )
}

const WindDirection = () => {
  const weatherData = useContext(WeatherContext);
  const winddirection = weatherData ? weatherData.winddirection+"deg" : '';
  console.log(winddirection);
  return (
    <StyledWindDirectionToCompas>
      <p class="sr-only" data-id="windDirectionText" ></p>
      <StyledWindArrow data-id="windDirectionArrow" direction={winddirection}></StyledWindArrow>
    </StyledWindDirectionToCompas>
  )
}

const WindSpeed = styled(({className}) => {
  const weatherData = useContext(WeatherContext);
  const windspeed = weatherData ? weatherData.windspeed+"km/h" : '';
  return <span className={className}>{windspeed}</span>
})`
  color: #ffff8b;
  font-weight: bold;
  font-size: 2rem;
`

const InformationAboutWheater = () => {
  const weatherData = useContext(WeatherContext);
  const weathercode = weatherData ? weatherData.weathercode : '';
  return <span>{weathercode}</span>
}

const InformationAboutWheaterWrapper = ({children}) =>{
  return (
    <StyledInformationAboutWheaterWrapper>
        <Wind/>
        <Temperature />
        <InformationAboutWheater/>
    </StyledInformationAboutWheaterWrapper>
  )
}

const StyledWeatherAppWrapper = styled.div`
  position: relative;
  text-align:center;
  margin: 2rem auto;
  width: 60rem;
  height: auto;
  padding: 10px;
  border-radius: 5px;
  background-color: #002730;
  box-shadow: 3px 5px 3px 5px;
`;

const StyledButton = styled.div`
  border: none;
  padding: 0.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  outline: none;
  background-color: hsl(201, 100%, 28%);
  color: #ffff8b;
  width:10rem;

  &:hover{
    background-color: hsl(201, 100%, 23%);
    color: hsl(60, 100%, 80%);
    border-bottom: 3px solid  hsl(201, 100%, 18%);
    border-right: 3px solid  hsl(201, 100%, 18%);
    }
  
`;

const StyledButtonBox = styled.div`
  position:relative;
  text-align:center;
  margin: 1.5rem auto;
  padding: 0.5rem;
  height: 3rem;
  width: auto;
  display: inline-grid;
  grid-template-columns: auto auto auto;
  grid-gap: 1.5rem;
`;

const StyledDataTimeWrapper = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: auto auto;
`;


const StyledInformationAboutWheaterWrapper = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: auto auto auto;
`;

const StyledTemperature = styled.span`

`;

const StyledWind = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: auto auto;
`;

const StyledWindDirectionToCompas = styled.div`
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
  --size: 6rem;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: rgba(59, 61, 231, 0.5);
  display: grid;
  place-items: center;


`;

const StyledWindArrow = styled.div`
  --size:1rem;
  height: calc(var(--size)*3);
  width: var(--size);
  background-color:  #ffff8b;
  clip-path: polygon(50% 0, 0% 100%, 100% 100%);
  transform: translateY(-50%)
  rotate(${props => props.direction || "0deg"});
  transform-origin: bottom center;
  transition: transform 500ms ease;
`;



export default App;
