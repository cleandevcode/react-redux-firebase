import React from "react";
import { connect } from "react-redux";
import requireAuth from "components/requireAuth";
import * as postsActions from "actions/posts";
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

  handleNew = () => {
    this.props.togglePostForm(true);
  };

  render() {
    const { posts } = this.props;
    const { list } = posts;
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
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Start Time</Table.HeaderCell>
                <Table.HeaderCell>End Time</Table.HeaderCell>
                <Table.HeaderCell>Launch Time</Table.HeaderCell>
                <Table.HeaderCell>Break Time</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list && list.length > 0 ? (
                list.map((post) => <PostRow key={post.id} post={post} />)
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

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps, postsActions)(requireAuth(Posts));
