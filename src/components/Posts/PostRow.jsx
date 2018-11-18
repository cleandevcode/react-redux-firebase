import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as postsActions from 'actions/posts'

class PostRow extends React.Component {

  handleEdit = (post) => {
    this.props.togglePostForm(true, post)
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
            <Button data-id={post.id} icon='trash' negative />
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
