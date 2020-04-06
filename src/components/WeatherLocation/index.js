import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';

import './styles.css';

const  WeatherLocation = ({ onWeatherLocationClick, city, data }) => (
    <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
        <Location city={ city }/>
        {data ? 
            <React.Fragment>
                <WeatherData data={ data } /> 
            </React.Fragment>
        : 
            <CircularProgress size={50}/>
            }
        
    </div>
)

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func.isRequired,
    data: PropTypes.shape({
        temperature: PropTypes.string.isRequired,
        weatherState: PropTypes.string.isRequired,
        humidity: PropTypes.number.isRequired,
        wind: PropTypes.string.isRequired,
    }),
};

export default WeatherLocation;