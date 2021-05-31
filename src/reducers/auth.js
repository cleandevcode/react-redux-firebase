import { SET_AUTH } from "actions/types";

const initState = {
  isAuthed: localStorage.getItem("isAuthed") || false,
  userRole: -1,
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthed: action.isAuthed,
        userRole: action.userRole,
      };
    default:
      return state;
  }
};
