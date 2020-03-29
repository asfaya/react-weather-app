import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ForecastExtended from './../components/ForecastExtended';

class ForecastExtendedContainer extends Component {

    render() { 
        const { city } = this.props;

        return (
            city && <ForecastExtended city={ city }></ForecastExtended>
        );
    }
}

ForecastExtendedContainer.propTypes = {
    city: PropTypes.string.isRequired,
};

const mapStateToProps = ({ city }) => ({ city });

export default connect(mapStateToProps, null)(ForecastExtendedContainer);