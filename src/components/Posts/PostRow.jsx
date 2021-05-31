import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as postsActions from '../../actions/posts'
import firestore from '../../utils/firebase/firestore'
import * as alerts from '../../utils/alerts'

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
        <Table.Cell>{post.start.split(" ").length == 2 ? post.start.split(" ")[1] : ""}</Table.Cell>
        <Table.Cell>{post.end.split(" ").length == 2 ? post.end.split(" ")[1] : ""}</Table.Cell>
        <Table.Cell>{post.startLaunch ? ((post.startLaunch.split(" ").length == 2 ? post.startLaunch.split(" ")[1] : "") + " - " + (post.endLaunch.split(" ").length == 2 ? post.endLaunch.split(" ")[1] : "")) : ""}</Table.Cell>
        <Table.Cell>
          {post.breakTime && post.breakTime.length > 0 && post.breakTime.map(item => {
            return <div>{item.startBreak ? ((item.startBreak.split(" ").length == 2 ? item.startBreak.split(" ")[1] : "") + " - " + (item.endBreak.split(" ").length == 2 ? item.endBreak.split(" ")[1] : "")) : ""}</div>
          })}
        </Table.Cell>
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
