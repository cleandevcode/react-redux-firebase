import * as types from 'actions/types'

export const changeAuth = (isAuthed) => ({
  type: types.CHANGE_AUTH,
  isAuthed: isAuthed
})

export const setAuth = (isAuthed) => dispatch => {
  localStorage.setItem('isAuthed', isAuthed)
  dispatch(changeAuth(isAuthed))
}


