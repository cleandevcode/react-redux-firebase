import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as postsActions from 'actions/posts'
import firestore from 'utils/firebase/firestore'
import * as alerts from 'utils/alerts'

class PostRow extends React.Component {

  handleEdit = (post) => {
    this.props.togglePostForm(true, post)
  }

  handleDelete = (postId) => {
    const { list } = this.props.posts
    firestore.collection('posts').doc(postId).delete()
    .then(() => {
      const newList = list.filter((p) => p.id !== postId)
      this.props.setPosts(newList)
      alerts.success('Successfully deleted post!')
    }).catch(error => {
      alerts.error(error.message)
    })
  }

  render() {
    const { post } = this.props
    return (
      <Table.Row key={post.id}>
        <Table.Cell>{post.title}</Table.Cell>
        <Table.Cell>{post.body}</Table.Cell>
        <Table.Cell>
          <Button.Group size='tiny'>
            <Button onClick={() => this.handleEdit(post)}>Edit</Button>
            <Button onClick={() => this.handleDelete(post.id)} icon='trash' negative />
          </Button.Group>
        </Table.Cell>
      </Table.Row>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, postsActions)(PostRow)
