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
    case types.ADD_POST:
      return { ...posts, list: posts.list.concat(action.newPost)}
    case types.TOGGLE_POST_FORM:
      return { ...posts, showModal: action.isOpen, currentPost: action.post }
    case types.UPDATE_POST:
      const post = posts.list.find(p => p.id === action.post.id);
      return { ...posts,
        list: [ ...posts.list.filter(p => p !== post), { ...post, title: action.post.title, body: action.post.body } ],
        currentPost: { id: '', title: '', body: '' }
      }
    default:
      return posts
  }
}

