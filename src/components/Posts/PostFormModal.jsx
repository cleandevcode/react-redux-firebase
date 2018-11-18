import React from 'react'
import { Header, Modal, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import * as postsActions from 'actions/posts'

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  body: Yup.string()
    .min(3, 'Too Short!')
    .max(300, 'Too Long!')
    .required('Required'),
})

class PostFormModal extends React.Component {

  handleClose = (e) => {
    this.props.togglePostForm(false)
  }

  onClick = () => {
    this.submitButton.ref.setAttribute('disabled', true)
    this.form.submitForm()
  }

  handleSubmit = (values, actions) => {
    console.group('Post Form Submission')
    console.log('actions:', actions)
    console.log('values:', JSON.stringify(values, null, 2))
    console.groupEnd()
    this.submitButton.ref.removeAttribute('disabled', false)
    actions.setSubmitting(false)
  }

  render() {
    const { posts } = this.props
    const { showModal, currentPost } = posts
    return (
      <Modal open={showModal} closeIcon onClose={this.handleClose} size="tiny">
        <Modal.Header>{currentPost.id ? 'Edit Post' : 'Create Post'}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>New Post</Header>
            <Formik
              ref={node => this.form = node}
              initialValues={currentPost}
              onSubmit={this.handleSubmit}
              validationSchema={PostSchema}
              render={({ errors, touched, isSubmitting, status }) => (
                <Form className="ui form" id="form">
                  <div className='field'>
                    <label>Title</label>
                    <Field type="text" name="title" value={currentPost.title} disabled={isSubmitting} />
                    <ErrorMessage name="title" component="div" />
                  </div>

                  <div className='field'>
                    <label>Body</label>
                    <Field component="textarea" rows="3" name="body" value={currentPost.body} disabled={isSubmitting} />
                    <ErrorMessage name="body" component="div" />
                  </div>
                </Form>
              )}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button ref={node => this.submitButton = node} color='green' onClick={this.onClick}>
            {currentPost.id ? 'Save Post' : 'Create Post'}
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ({ posts }) => ({
  posts
})

export default connect(mapStateToProps, postsActions)(PostFormModal)
