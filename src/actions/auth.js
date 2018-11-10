import firebase from 'firebase/app'
import * as alerts from 'utils/alerts'
import * as types from 'actions/types'

export const registerUser = (email, password) => dispatch => {
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(res => {
      dispatch(changeAuth(true))
    })
    .catch(error => {
      alerts.error(error.message)
    })
}

export const changeAuth = (isAuthed) => ({
  type: types.CHANGE_AUTH,
  isAuthed: isAuthed
})

export const logout = () => dispatch => {
  firebase.auth().signOut().then(function() {
    dispatch(changeAuth(false))
  }).catch(function(error) {
    alerts.error(error.message)
  })
}
