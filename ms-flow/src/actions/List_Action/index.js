import { SET_LOGGED, RESET } from "../Action_Type";

// setting log var
export const SET_LOGGED_ACTION = TRUE => (
  {
    type: SET_LOGGED,
    payload: TRUE
  }
);

// to reset log var/clearing session info
export const SET_RESET = E => (
    {
      type: RESET,
      payload: E
    }
);