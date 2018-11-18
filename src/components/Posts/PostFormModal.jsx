import React from 'react'
import { Header, Image, Modal, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'

import * as postsActions from 'actions/posts'

class PostFormModal extends React.Component {

  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  handleClose = (e) => {
    this.props.togglePostForm(false)
  }

  handleSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
    }, 500);
  }

  render() {
    const { posts } = this.props
    const { showModal, currentPost } = posts
    return (
      <Modal open={showModal} closeIcon onClose={this.handleClose} size="small">
        <Modal.Header>{currentPost.id ? 'Edit Post' : 'Create Post'}</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>New Post</Header>
            <Formik
              initialValues={currentPost}
              onSubmit={this.handleSubmit}
              render={() => (
                <Form className="ui form" ref={this.formRef}>
                  <div className='field'>
                    <label>Title</label>
                    <Field type="text" name="title" value={currentPost.title} disabled={false} />
                    <ErrorMessage name="title" component="div" />
                  </div>

                  <div className='field'>
                    <label>Body</label>
                    <Field component="textarea" rows="3" name="body" value={currentPost.body} disabled={false} />
                    <ErrorMessage name="body" component="div" />
                  </div>

                </Form>
              )}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.formRef.current.formSubmit()} inverted>
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
