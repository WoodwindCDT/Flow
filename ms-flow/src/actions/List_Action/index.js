import { SET_LOGGED, RESET } from "../Action_Type";

// setting log var
export const SET_LOGGED_ACTION = CONDITION => (
  {
    type: SET_LOGGED,
    payload: CONDITION
  }
);

// to reset log var/clearing session info
export const SET_RESET_ACTION = E => (
    {
      type: RESET,
      payload: E
    }
);