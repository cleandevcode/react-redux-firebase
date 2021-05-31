import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as postsActions from "actions/posts";
import firestore from "utils/firebase/firestore";
import * as alerts from "utils/alerts";

const PostSchema = Yup.object().shape({
  start: Yup.string().required("Required"),
  end: Yup.string().required("Required"),
  startLaunch: Yup.string(),
  endLaunch: Yup.string(),
  break: [
    {
      startBreak: Yup.string(),
      endBreak: Yup.string(),
    },
  ],
});

class PostFormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBreaks: [0],
    };
  }

  handleAddBreakTime = () => {
    let length = this.state.numberOfBreaks;
    length.push(this.state.numberOfBreaks.length + 1);
    this.setState({ numberOfBreaks: length });
  };

  handleClose = (e) => {
    this.props.togglePostForm(false);
  };

  onClick = () => {
    this.submitButton.ref.setAttribute("disabled", true);
    this.form.submitForm();
  };

  handleSubmit = (values, actions, postId) => {
    let response;

    if (postId) {
      response = this.updatePost(postId, values);
    } else {
      response = this.addNewPost(values);
    }

    response.catch((error) => {
      alerts.error(error.message);
      actions.setSubmitting(false);
      actions.resetForm();
      this.submitButton.ref.removeAttribute("disabled");
    });
  };

  addNewPost(values) {
    console.log(">>>>>>>>>>>>>..", values);
    // return firestore
    //   .collection("posts")
    //   .add({
    //     userId: this.props.userId,
    //     start: values.start,
    //     end: values.end,
    //     startLaunch: values.startLaunch,
    //     endLaunch: values.endLaunch,
    //     break: values.break
    //   })
    //   .then((docRef) => {
    //     this.props.addPost({
    //       id: docRef.id,
    //       values,
    //     });
    //     this.props.togglePostForm(false);
    //     alerts.success("Successfully created post!");
    //   });
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
    const { posts, showModal, currentPost, role } = this.props;
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
                    <label>Start Time:</label>
                    <Field
                      type="time"
                      name="start"
                      value={isEdit ? values.start : currentPost.start}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage
                      name="start"
                      component="div"
                      className="dangerText"
                    />
                  </div>
                  <div className="field">
                    <label>End Time:</label>
                    <Field
                      type="time"
                      name="end"
                      value={isEdit ? values.end : currentPost.end}
                      disabled={isSubmitting}
                    />
                    <ErrorMessage
                      name="end"
                      component="div"
                      className="dangerText"
                    />
                  </div>
                  <div className="field">
                    <label>Launch Time:</label>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="d-flex">
                          <label className="mr-2">Start Time:</label>
                          <Field
                            type="time"
                            name="startLaunch"
                            value={
                              isEdit
                                ? values.startLaunch
                                : currentPost.startLaunch
                            }
                            disabled={isSubmitting}
                          />
                        </div>
                        <ErrorMessage
                          name="startLaunch"
                          component="div"
                          className="dangerText"
                        />
                      </div>
                      <div>
                        <div className="d-flex">
                          <label className="mr-2">End Time:</label>
                          <Field
                            type="time"
                            name="endLaunch"
                            value={
                              isEdit ? values.endLaunch : currentPost.endLaunch
                            }
                            disabled={isSubmitting}
                          />
                        </div>
                        <ErrorMessage
                          name="endLaunch"
                          component="div"
                          className="dangerText"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <Field name="break">
                      <label>Break Time:</label>
                      {this.state.numberOfBreaks.map((item) => (
                        <div
                          className="d-flex justify-content-between mb-2"
                          key={item}
                        >
                          <div>
                            <div className="d-flex">
                              <label className="mr-2">Start Time:</label>
                              <Field
                                type="time"
                                name="startBreak"
                                value={
                                  isEdit
                                    ? values.startBreak
                                    : currentPost.startBreak
                                }
                                disabled={isSubmitting}
                              />
                            </div>
                            <ErrorMessage
                              name="startBreak"
                              component="div"
                              className="dangerText"
                            />
                          </div>
                          <div>
                            <div className="d-flex">
                              <label className="mr-2">End Time:</label>
                              <Field
                                type="time"
                                name="endBreak"
                                value={
                                  isEdit
                                    ? values.endBreak
                                    : currentPost.endBreak
                                }
                                disabled={isSubmitting}
                              />
                            </div>
                            <ErrorMessage
                              name="endBreak"
                              component="div"
                              className="dangerText"
                            />
                          </div>
                        </div>
                      ))}
                    </Field>
                    <div
                      className="d-flex justify-content-end"
                      style={{ cursor: "pointer" }}
                      onClick={this.handleAddBreakTime}
                    >
                      + Add Item
                    </div>
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

const mapStateToProps = (state) => {
  console.log(">>>>", state);
  return {
    posts: state.posts.list,
    users: state.auth.users,
    userId: state.auth.user,
    role: state.auth.userRole,
    showModal: state.posts.showModal,
    currentPost: state.posts.currentPost,
  };
};

export default connect(mapStateToProps, postsActions)(PostFormModal);
