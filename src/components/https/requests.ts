import axios from 'axios';

export function getData(cb: any) {
  const url = 'http://localhost:5000/cities';
  axios
    .get(url)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

const API_key = 'b9738870038c115a4fde7af065114044';
export function getWeather(lat: number, lon: number, cb: any) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;
  axios
    .get(url)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getWeatherForecast(lat: number, lon: number, cb: any) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
  axios
    .get(url)
    .then((response) => {
      cb(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
