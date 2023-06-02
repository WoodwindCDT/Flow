import { SET_LOGGED, RESET } from '../../actions/Action_Type';

const INIT_LOG = false;

// User login -> storing a boolean here for future
const LOGGED_STATE = {
    LOGGEDIN: INIT_LOG // default value
};

// return logged state within mounted component
// get function
export function LOGIN_REDUCER(state = LOGGED_STATE, action) {
    switch (action.type) {
      case SET_LOGGED:
        
        const IS_LOGGED = true;
        state.LOGGEDIN = IS_LOGGED;

        return { ...state, IS_LOGGED }; // Update the value of IS_LOGGED
  
      default:
        return state;
    }
};  

// session data is removed and user is successfully logged out!
// update function
export function LOGOUT_REDUCER (state = LOGGED_STATE, action) {
    switch (action.type) {

        case RESET:
        // A RESET FOR ALL

        console.log(action.payload);

        let {
            LOGGEDIN
        } = state;

        LOGGEDIN = INIT_LOG;

        const RESET_ALL_STATE = {LOGGEDIN};

        return RESET_ALL_STATE;
        
        default:
            return state;
    }
}