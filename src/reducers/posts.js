import * as types from 'actions/types'

const initialState = {
  list: [],
  showModal: false
}
export default (posts = initialState, action) => {
  switch (action.type) {
    case types.SET_POSTS:
      return { ...posts, list: action.list }
    default:
      return posts
  }
}

