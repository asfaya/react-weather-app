import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ForecastItem from './ForecastItem';
import { api_key, url_base_forecast } from './../constants/api_url';
import transformForecast from './../services/transformForecast';

import './styles.css';

class ForecastExtended extends Component {

    constructor() {
        super();

        this.state = {
            forecastData: null
        };
    }

    componentDidMount() {
        const { city } = this.props;
        this.updateCity(city);   
    }

    componentDidUpdate(prevProps) {
        const { city } = this.props;

        if (prevProps.city !== city) {
            this.setState({ forecastData: null });
            this.updateCity(city);
        }
    }

    updateCity = city => {
        const url_forecast = `${url_base_forecast}?q=${ city }&appid=${api_key}`; 

        // fecth or axios
        fetch(url_forecast)
            .then(
                data => (data.json())
            )
            .then(
                weather_data => {
                    const forecastData = transformForecast(weather_data);
                    this.setState({ forecastData });
                }
            );
    }

    renderForecastItemDays(forecastData) {
        return forecastData.map(forecast => (
            <ForecastItem 
                key={`${forecast.weekDay}${forecast.hour}`}
                weekDay={ forecast.weekDay } 
                hour={ forecast.hour }
                data={ forecast.data }
                />));
    }

    renderProgress() {
        return (<h3>Cargando Pronóstico Extendido...</h3>);
    }

    render() {
        const { city } = this.props;
        const { forecastData } = this.state;

        return (
            <div>
                <h2 className="forecast-title">
                    Pronóstico Extendido { city }
                </h2>
                { forecastData ? 
                    this.renderForecastItemDays(forecastData) :
                    this.renderProgress() }
            </div>
        );
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
};

export default ForecastExtended;

