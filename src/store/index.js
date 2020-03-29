import { createStore } from 'redux';
import { city } from './../reducers/city';

const initialState = {
    city: 'Ushuaia,ar'
};

export const store = createStore(
    city,           // reducer 
    initialState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
  