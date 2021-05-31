import * as types from "../actions/types";
import firestore from "../utils/firebase/firestore";

export const changeAuth = (isAuthed) => (dispatch) => {
  localStorage.setItem("isAuthed", isAuthed);
  dispatch(setAuth(isAuthed));
};

export const changeUserRole = (role, email) => (dispatch) => {
  dispatch(setUserRole(role));
  dispatch(setUser(email));
};

export const getUserRoleByUID = (uid) => (dispatch) => {
  const lists = [];
  return firestore
    .collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        lists.push(data);
        if (doc.data().id === uid) {
          dispatch(setUserRole(doc.data().role));
          dispatch(setUser(doc.data().id));
          if (doc.data().role === 0) {
            dispatch(setUsers(lists));
          }
        }
      });
    });
};

export const setAuth = (isAuthed) => ({
  type: types.SET_AUTH,
  isAuthed: isAuthed,
});

export const setUserRole = (role) => ({
  type: types.SET_ROLE,
  userRole: role,
});

export const setUsers = (lists) => ({
  type: types.SET_USERS,
  users: lists,
});

export const setUser = (id) => ({
  type: types.SET_USER,
  user: id,
});
