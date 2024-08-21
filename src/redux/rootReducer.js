
import { combineReducers } from 'redux';

import authReducer from '../redux/auth/reducer.js';


// Combine all reducers.

const rootReducer = combineReducers({
  auth: authReducer
});

export default rootReducer;
