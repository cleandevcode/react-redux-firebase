import { SET_AUTH, SET_ROLE, SET_USER, SET_USERS } from "../actions/types";

const initState = {
  isAuthed: localStorage.getItem("isAuthed") || false,
  userRole: -1,
  user: localStorage.getItem("user") || null,
  users: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthed: action.isAuthed,
      };
    case SET_ROLE:
      return {
        ...state,
        userRole: action.userRole,
      };
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
