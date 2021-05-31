import * as types from "actions/types";

export const changeAuth = (isAuthed, userRole) => (dispatch) => {
  localStorage.setItem("isAuthed", isAuthed);
  dispatch(setAuth(isAuthed, userRole));
};

export const setAuth = (isAuthed, userRole) => ({
  type: types.SET_AUTH,
  isAuthed: isAuthed,
  userRole: userRole,
});
