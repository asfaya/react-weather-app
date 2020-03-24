import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Location from './Location';
import WeatherData from './WeatherData';

import transformWeather from './../../services/transformWeather';
import getUrlWeatherByCity from './../../services/getUrlWeatherByCity';

import './styles.css';

class WeatherLocation extends Component {

    constructor(props) {
        super(props);
        const { city } = props;

        this.state = {
            city,
            data: null
        };
    }

    componentDidMount() {
        this.handleUpdateClick();
    }

    componentDidUpdate(prevProps, prevState) {
    }
        
    handleUpdateClick = () => {
        const api_weather = getUrlWeatherByCity(this.state.city);

        console.log("Actualizado");

        fetch(api_weather).then(resolve => {
            return resolve.json();
        }).then(data => {
            const newData = transformWeather(data);
            this.setState({
                data: newData,
            });
        });
    }

    render() {
        const { onWeatherLocationClick } = this.props;
        const { city, data } = this.state;

        return (
            <div className="weatherLocationCont" onClick={onWeatherLocationClick}>
                <Location city={ city }/>
                {data ? 
                    <React.Fragment>
                        <WeatherData data={ data } /> 
                        <button onClick={this.handleUpdateClick}>Actualizar</button>
                    </React.Fragment>
                : 
                    <CircularProgress size={50}/>
                 }
                
            </div>
        );
    }
}

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func.isRequired,
};

export default WeatherLocation;