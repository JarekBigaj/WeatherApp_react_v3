const API_URL_KRAKOW = 'https://api.open-meteo.com/v1/forecast?latitude=50.06&longitude=19.94&current_weather=true';
const API_URL_WARSAW ='https://api.open-meteo.com/v1/forecast?latitude=52.23&longitude=21.01&current_weather=true';
const API_URL_MARCOWKA ='https://api.open-meteo.com/v1/forecast?latitude=49.79&longitude=19.62&current_weather=true';

export const informationAboutWeather = (selectedCity) => {
    switch(selectedCity){
        case `Krakow` : 
        return API_URL_KRAKOW;
    }
}