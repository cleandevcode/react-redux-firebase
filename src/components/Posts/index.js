import React from "react";
import { connect } from "react-redux";
import requireAuth from "components/requireAuth";
import { fetchPosts, togglePostForm } from "../../actions/posts";
import { getUserRoleByUID } from "../../actions/auth";
import { Container, Table, Button, Grid } from "semantic-ui-react";
import { PostsListPlaceholder } from "components/common/placeholders";
import PostRow from "components/Posts/PostRow";
import PostFormModal from "components/Posts/PostFormModal";

class Posts extends React.Component {
  state = {
    loading: true,
  };

  UNSAFE_componentWillMount() {
    this.props.fetchPosts().then(() => {
      this.setState({ loading: false });
    });
  }

  componentDidMount() {
    this.props.getUserRoleByUID(this.props.userId);
  }

  handleNew = () => {
    this.props.togglePostForm(true);
  };

  render() {
    const { posts, role } = this.props;
    return (
      <Container>
        <Grid columns={2}>
          <Grid.Column>
            <h2>Working Hours</h2>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button primary onClick={this.handleNew}>
              New
            </Button>
          </Grid.Column>
        </Grid>
        {this.state.loading ? (
          <PostsListPlaceholder />
        ) : (
          <Table>
            <Table.Header>
              <Table.Row>
                {role === 0 && <Table.HeaderCell>User</Table.HeaderCell>}
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Launch Time</Table.HeaderCell>
                <Table.HeaderCell>Break Time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {posts && posts.length > 0 ? (
                posts.map((post) => <PostRow key={post.id} post={post} />)
              ) : (
                <Table.Row>
                  <Table.Cell>No Data</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
        <PostFormModal />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts.list,
    userId: state.auth.user,
    role: state.auth.userRole,
  };
};

const mD = (dispatch) => {
  return {
    togglePostForm: (data) => dispatch(togglePostForm(data)),
    fetchPosts: () => dispatch(fetchPosts()),
    getUserRoleByUID: (id) => dispatch(getUserRoleByUID(id)),
  };
};

export default connect(mapStateToProps, mD)(requireAuth(Posts));
