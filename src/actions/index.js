import { api_key, url_base_forecast, url_base_weather } from './../constants/api_url';
import transformForecast from './../services/transformForecast';
import transformWeather from './../services/transformWeather';

export const SET_CITY = 'SET_CITY';
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA';

export const GET_WEATHER_CITY = 'GET_WEATHER_CITY';
export const SET_WEATHER_CITY = 'SET_WEATHER_CITY';

const setCity = payload => ({ type: SET_CITY, payload });
const setForecastData = payload => ({ type: SET_FORECAST_DATA, payload });

const getWeatherCity = payload => ({ type: GET_WEATHER_CITY, payload });
const setWeatherCity = payload => ({ type: SET_WEATHER_CITY, payload });

export const setSelectedCity = payload => {
    return (dispatch, getState) => {
        const url_forecast = `${url_base_forecast}?q=${ payload }&appid=${api_key}`; 

        dispatch(setCity(payload));

        const state = getState();
        const date = state.cities[payload] && state.cities[payload].forecastDataDate;

        const now = new Date();

        if (date && (now - date) < 1 * 60 * 1000){
            return;
        }
        
        // fecth or axios
        fetch(url_forecast)
            .then(
                data => (data.json())
            )
            .then(
                weather_data => {
                    const forecastData = transformForecast(weather_data);

                    dispatch(setForecastData({ city: payload, forecastData }));
                }
            );

        return;
    };
};

export const setWeather = payload => {
    return dispatch => {
        payload.forEach(city => {
            dispatch(getWeatherCity(city));

            const api_weather = `${url_base_weather}?q=${ city }&appid=${api_key}`; 
            fetch(api_weather)
                .then(data => {
                    return data.json();
                })
                .then(weather_data => {
                    const weather = transformWeather(weather_data);
                    dispatch(setWeatherCity({city, weather}));
                });
        });
    };
};