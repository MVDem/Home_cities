import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { IForecast, IState, IWeather } from '../components/types/type';
import { getWeather, getWeatherForecast } from '../components/https/requests';
import { setUserUnits } from '../components/store/citySlice';

export default function CityPage() {
  const [weather, setWeather] = useState<IWeather>();
  const [forecast, setForecast] = useState<IForecast>();
  const { name } = useParams();
  const city = useSelector((state: IState) => state.cities.data).find(
    (e) => e.name === name
  );
  const unit = useSelector((state: IState) => state.cities.searchParams.units);
  const [units, setUnits] = useState(unit);
  const dispach = useDispatch();
  const handleUnits = (e: string) => {
    setUnits(e);
    dispach(setUserUnits(e));
  };

  const handleTemp = (temp: number | undefined, param: string | undefined) => {
    if (param === 'Fahrenheit' && temp) {
      return Math.round((temp - 273.15) * 1.8 + 32);
    } else if (param === 'Celsius' && temp) {
      return Math.round(temp - 273.15);
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (city) {
      getWeather(city?.coords.lat, city?.coords.lng, setWeather);
      getWeatherForecast(city?.coords.lat, city?.coords.lng, setForecast);
    }
  }, [city]);

  const writeMonth = (e: number) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months[e];
  };

  return (
    <div className="cityWrapper">
      <div className="cityPage">
        <NavLink to={'/'}>
          <img className="cityPage__close" src="./close.png" alt="CityImage" />
        </NavLink>
        <section className="cityPage__about">
          <h3 className="cityPage__title">
            {city?.country}-{city?.name}
          </h3>
          <h3 className="cityPage__title">{city?.continent}</h3>
          <p className="cityPage__description">{city?.description}</p>
          <div className="cityPage__temp">
            <p className="cityPage__description">
              Temp: {handleTemp(weather?.main.temp, unit)}
              {unit === 'Fahrenheit' ? '°F' : '°C'}
            </p>
            <select
              className="cityPage__select"
              onChange={(e) => handleUnits(e.target.value)}
            >
              <option value={units}>Please choose a unit</option>
              <option value="Fahrenheit">Fahrenheit,°F</option>
              <option value="Celsius">Celsius, °C</option>
            </select>
          </div>
          <p className="cityPage__description">
            Weather: {weather?.weather[0].description}
          </p>
          <p className="cityPage__description">
            Humidity: {weather?.main.humidity}%
          </p>
          <p className="cityPage__description">
            Pressure: {weather?.main.pressure} hPa
          </p>
        </section>
        <img className="cityPage__image" src={city?.image} alt="CityImage" />
        <section className="cityPage__forecast">
          <div className="forecast">
            <h3 className="forecast__title">Weather for the next few days</h3>
            <div className="forecast__list">
              {forecast &&
                forecast.list.map((e, i) => {
                  const date = new Date(e.dt_txt);
                  if (date.getHours() === 15) {
                    return (
                      <div key={i} className="forecast__oneDay">
                        <p className="cityPage__description">
                          {date.getDate()} {writeMonth(date.getMonth())}
                        </p>
                        <p className="cityPage__description">
                          Afternoon {handleTemp(e.main.temp, unit)}
                          {unit === 'Fahrenheit' ? '°F' : '°C'}
                        </p>
                        <p className="">{e.weather[0].description}</p>
                      </div>
                    );
                  }
                  return <div key={i}></div>;
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
