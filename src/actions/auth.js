import firebase from 'firebase/app'
import * as alerts from 'utils/alerts'
import * as types from 'actions/types'

export const registerUser = (email, password) => dispatch => {
  console.log(email, password)
  firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error.code, error.message)
      alerts.error(error.message)
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
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
    console.log(error.code, error.message)
    alerts.error(error.message)
  })
}
