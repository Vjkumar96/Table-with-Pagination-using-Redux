import { combineReducers } from 'redux';
import beerSlice from './beerSlice';

const Reducers = combineReducers({
    beerReducer: beerSlice
})
//export type ApplicationState = ReturnType<typeof Reducers>;

export default Reducers;