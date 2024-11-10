import { combineReducers } from 'redux';

import authReducer from '../redux/auth/reducer.js';

const rootReducer = combineReducers({
	auth: authReducer,
});

export default rootReducer;
