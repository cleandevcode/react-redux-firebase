import firebase from 'firebase/app'
import * as types from 'actions/types'

export const changeAuth = (isAuthed) => ({
  type: types.CHANGE_AUTH,
  isAuthed: isAuthed
})

