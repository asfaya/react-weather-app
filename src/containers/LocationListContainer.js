import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from './../actions';
import { getWeatherCities, getCity } from './../reducers';
import LocationList from './../components/LocationList';

class LocationListContainer extends Component {
      
    componentDidMount() {
        const { setSelectedCity, setWeather, cities, city } = this.props;
        setWeather(cities);
        
        setSelectedCity(city);
    }

    handleSelectionLocation = city => {
        const { setSelectedCity } = this.props;

        setSelectedCity(city);
    }

    render() {
        const { citiesWeather } = this.props;

        return (
            <LocationList 
                cities={ citiesWeather }
                onSelectedLocation={this.handleSelectionLocation} />
        );
    }
}

LocationListContainer.propTypes = {
    setSelectedCity: PropTypes.func.isRequired,
    setWeather: PropTypes.func.isRequired,
    cities: PropTypes.array.isRequired,
    citiesWeather: PropTypes.array.isRequired,
};

/* const mapDispatchToProps = dispatch => ({
     setCity: value => dispatch(setSelectedCity(value)),
     setWeather: cities => dispatch(setWeather(cities)),
 });*/

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const mapStateToProps = state => (
    {
        citiesWeather: getWeatherCities(state),
        city: getCity(state),
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(LocationListContainer);