import { createStore, 
    applyMiddleware, 
    compose, 
    combineReducers 
} from 'redux';

import userReducer from '../reducers/userReducer';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({ 
	users : userReducer,
	});	

//const store = createStore(rootReducer);
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store