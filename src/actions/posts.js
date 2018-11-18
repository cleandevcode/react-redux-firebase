import * as types from 'actions/types'
import firestore from 'utils/firebase/firestore'

export const fetchPosts = () => dispatch => {
  const list = []
  return firestore.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      let { title, body } = data
      list.push({ id: doc.id, title: title, body: body })
    })
    dispatch(setPosts(list))
  })
}

export const setPosts = (list) => ({
  type: types.SET_POSTS, list
})

export const togglePostForm = (isOpen, post = {}) => ({
  type: types.TOGGLE_POST_FORM, isOpen, post
})

export const addPost = (newPost) => ({
  type: types.ADD_POST, newPost
})
