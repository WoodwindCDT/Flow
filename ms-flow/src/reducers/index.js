import { combineReducers } from 'redux'
import { LOGIN_REDUCER, LOGOUT_REDUCER } from './List_Reducer';

// allReducers IS EXPORTED AS A CONST WHICH WILL HOLD TODO AND VIEW, CALLING THEIR REDUCERS
const allReducers = combineReducers({
    LOGGED_STATE: LOGIN_REDUCER,
    LOGOUT_STATE: LOGOUT_REDUCER
 });

export default allReducers;