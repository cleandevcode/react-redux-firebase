import React from 'react'
import { connect } from 'react-redux'
import requireAuth from 'components/requireAuth'
import * as postsActions from 'actions/posts'
import { Container, Table, Button, Grid } from 'semantic-ui-react'
import { PostsListPlaceholder } from 'components/common/placeholders'
import PostRow from 'components/Posts/PostRow'
import PostFormModal from 'components/Posts/PostFormModal'

class Posts extends React.Component {

  state = {
    loading: true,
    showPostModal: false,
  }

  componentWillMount() {
    this.props.fetchPosts().then(() => {
      this.setState({loading: false})
    })
  }

  handleNew = () => {
    this.props.togglePostForm(true)
  }

  render() {
    const { posts } = this.props
    const { list } = posts
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column><h2>Posts</h2></Grid.Column>
          <Grid.Column textAlign="right">
            <Button primary onClick={this.handleNew}>New Post</Button>
          </Grid.Column>
        </Grid>
        { this.state.loading ? <PostsListPlaceholder /> : (
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Body</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { list ? list.map(post => (
                <PostRow key={post.id} post={post} />
              )) : (
                <Table.Row>
                  <Table.Cell>No posts</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
        <PostFormModal />
      </Container>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, postsActions)(requireAuth(Posts))
