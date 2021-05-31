import React from "react";
import { Modal, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import * as postsActions from "../../actions/posts";
import firestore from "../../utils/firebase/firestore";
import * as alerts from "../../utils/alerts";

const PostSchema = Yup.object().shape({
  start: Yup.string().required("Required"),
  end: Yup.string().required("Required"),
  startLaunch: Yup.string(),
  endLaunch: Yup.string(),
  breakTime: Yup.array().of(Yup.object().shape({
    startBreak: Yup.string().required("Required"),
    endBreak: Yup.string().required("Required"),
  }))
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
      // this.submitButton.ref.removeAttribute("disabled");
    });
  };

  addNewPost(values) {
    const today = new Date();
    const todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " ";
    const payload = {
      userId: this.props.userId,
      start: values.start ? (todayDate + values.start) : "",
      end: values.end ? (todayDate + values.end) : "",
      startLaunch: values.startLaunch ? (todayDate + values.startLaunch) : "",
      endLaunch: values.endLaunch ? (todayDate + values.endLaunch) : "",
      breakTime: values.breakTime ? values.breakTime.map(item => {
        return {
          startBreak: todayDate + item.startBreak,
          endBreak: todayDate + item.endBreak
        }
      }): null
    };
    return firestore
      .collection("posts")
      .add(payload)
      .then((docRef) => {
        this.props.addPost({
          id: docRef.id,
          ...payload,
        });
        this.props.togglePostForm(false);
        alerts.success("Successfully created post!");
      });
  }

  updatePost(postId, values) {
    const today = new Date();
    const todayDate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " ";

    console.log("update values => ", values);
    const payload = {
      userId: this.props.userId,
      start: values.start.length == 5 ? (todayDate + values.start) : values.start,
      end: values.end.length == 5 ? (todayDate + values.end) : values.end,
      startLaunch: values.startLaunch.length == 5 ? (todayDate + values.startLaunch) : values.startLaunch,
      endLaunch: values.endLaunch.length == 5 ? (todayDate + values.endLaunch) : values.endLaunch,
      breakTime: values.breakTime.map((item, index) => {
        return {
          startBreak: item.startBreak.length == 5 ? (todayDate + item.startBreak) : item.startBreak,
          endBreak: item.endBreak.length == 5 ? (todayDate + item.endBreak) : item.endBreak
        }
      })
    };
    console.log("update payload => ", payload);
    return firestore
      .collection("posts")
      .doc(postId)
      .update(payload)
      .then(() => {
        // no result response
        this.props.updatePost({ id: postId, ...payload });
        this.props.togglePostForm(false);
        alerts.success("Successfully created post!");
      });
  }

  render() {
    const { posts, showModal, currentPost, role } = this.props;
    const isEdit = currentPost.id;
    console.log("currenct post =>", currentPost);
    return (
      <Modal
        open={showModal}
        closeIcon
        onClose={this.handleClose}
        size="tiny"
        // centered={true}
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
                      value={values.start ? values.start.split(" ")[1] : ""}
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
                      value={values.end ? values.end.split(" ")[1] : ""}
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
                            value={values.startLaunch ? values.startLaunch.split(" ")[1] : ""}
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
                            value={values.endLaunch ? values.endLaunch.split(" ")[1] : ""}
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
                    <FieldArray
                      name="breakTime"
                      render={arrayHelpers => (
                        <div>
                          <label>Break Time:</label>
                          {this.state.numberOfBreaks.map((item, index) => (
                            <div
                              className="d-flex justify-content-between mb-2"
                              key={item}
                            >
                              <div>
                                <div className="d-flex">
                                  <label className="mr-2">Start Time:</label>
                                  <Field
                                    type="time"
                                    name={`breakTime[${index}].startBreak`}
                                    // name="startBreak"
                                    value={(values.breakTime && values.breakTime[index] && values.breakTime[index].startBreak) ? values.breakTime[index].startBreak.split(" ")[1] : ""}
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
                                    // name="endBreak"
                                    name={`breakTime[${index}].endBreak`}
                                    value={(values.breakTime && values.breakTime[index] && values.breakTime[index].endBreak) ? values.breakTime[index].endBreak.split(" ")[1] : ""}
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
                        </div>
                      )}
                    />
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
