import * as types from 'actions/types'

const initialState = {
  list: [],
  showModal: false,
  currentPost: {
    id: '',
    title: '',
    body: ''
  }
}
export default (posts = initialState, action) => {
  switch (action.type) {
    case types.SET_POSTS:
      return { ...posts, list: action.list }
    case types.TOGGLE_POST_FORM:
      return { ...posts, showModal: action.isOpen, currentPost: action.post }
    default:
      return posts
  }
}

