import * as types from 'actions/types'
import firestore from 'utils/firebase/firestore'

export const fetchPosts = () => dispatch => {
  firestore.collection("posts").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`)
    })
  })
  dispatch(setPosts([]))
}

export const setPosts = (posts) => ({
  type: types.SET_POSTS, posts
})
