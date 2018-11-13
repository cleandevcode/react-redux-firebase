import * as types from 'actions/types'

export const changeAuth = (isAuthed) => dispatch => {
  localStorage.setItem('isAuthed', isAuthed)
  dispatch(setAuth(isAuthed))
}

export const setAuth = (isAuthed) => ({
  type: types.SET_AUTH,
  isAuthed: isAuthed
})

