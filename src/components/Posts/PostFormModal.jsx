import React from "react";
import { Header, Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as postsActions from "actions/posts";
import firestore from "utils/firebase/firestore";
import * as alerts from "utils/alerts";

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(100, "Too Long!")
    .required("Required"),
  body: Yup.string()
    .min(3, "Too Short!")
    .max(300, "Too Long!")
    .required("Required"),
});

class PostFormModal extends React.Component {
  handleClose = (e) => {
    this.props.togglePostForm(false);
  };

  onClick = () => {
    this.submitButton.ref.setAttribute("disabled", true);
    this.form.submitForm();
  };

  handleSubmit = (values, actions, postId) => {
    const { title, body } = values;
    let response;

    if (postId) {
      response = this.updatePost(postId, title, body);
    } else {
      response = this.addNewPost(title, body);
    }

    response.catch((error) => {
      alerts.error(error.message);
      actions.setSubmitting(false);
      actions.resetForm();
      this.submitButton.ref.removeAttribute("disabled");
    });
  };

  addNewPost(title, body) {
    return firestore
      .collection("posts")
      .add({
        title,
        body,
      })
      .then((docRef) => {
        this.props.addPost({ id: docRef.id, title, body });
        this.props.togglePostForm(false);
        alerts.success("Successfully created post!");
      });
  }

  updatePost(postId, title, body) {
    return firestore
      .collection("posts")
      .doc(postId)
      .update({
        title,
        body,
      })
      .then(() => {
        // no result response
        this.props.updatePost({ id: postId, title, body });
        this.props.togglePostForm(false);
        alerts.success("Successfully created post!");
      });
  }

  render() {
    const { posts } = this.props;
    const { showModal, currentPost } = posts;
    const isEdit = currentPost.id;
    return (
      <Modal
        open={showModal}
        closeIcon
        onClose={this.handleClose}
        size="tiny"
        centered={true}
      >
        <Modal.Header>{isEdit ? "Edit Post" : "Create Post"}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>New Post</Header>
            <Formik
              ref={(node) => (this.form = node)}
              initialValues={currentPost}
              onSubmit={(values, actions) =>
                this.handleSubmit(values, actions, currentPost.id)
              }
              validationSchema={PostSchema}
              render={({ values, isSubmitting }) => (
                <Form className="ui form">
                  <div className="field">
                    <label>Title</label>
                    <Field
                      type="text"
                      name="title"
                      value={isEdit ? values.title : currentPost.title}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="title" component="div" />
                  </div>

                  <div className="field">
                    <label>Body</label>
                    <Field
                      component="textarea"
                      rows="3"
                      name="body"
                      value={isEdit ? values.body : currentPost.body}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="body" component="div" />
                  </div>
                </Form>
              )}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            ref={(node) => (this.submitButton = node)}
            color="green"
            onClick={this.onClick}
          >
            {currentPost.id ? "Save Post" : "Create Post"}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts,
});

export default connect(mapStateToProps, postsActions)(PostFormModal);
