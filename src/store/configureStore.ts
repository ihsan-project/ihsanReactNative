import {createStore, combineReducers} from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import countReducer from '../reducers/countReducers'


const rootReducer = combineReducers({
    count: countReducer
});

const configureStore = () => {
    return createStore(rootReducer, composeWithDevTools());

}

export default configureStore;