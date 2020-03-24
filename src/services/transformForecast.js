import moment from 'moment';
import 'moment/locale/es';
import transformWeather from './transformWeather';

const transformForecast = data => (
    data.list
        .filter(item => (
            moment.unix(item.dt).utc().hour() === 9 ||
            moment.unix(item.dt).utc().hour() === 15 ||
            moment.unix(item.dt).utc().hour() === 21 
        ))
        .map(item => (
            {
                weekDay: moment.unix(item.dt).format('ddd'),
                hour: moment.unix(item.dt).hour(),
                data: transformWeather(item)
            }
        ))
);

export default transformForecast;