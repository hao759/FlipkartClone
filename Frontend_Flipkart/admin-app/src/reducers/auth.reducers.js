import { authConstants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstName: "",
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        // authenticating: true,
        ...action.paypoad,
      };
      break;
  }
  return state;
};
