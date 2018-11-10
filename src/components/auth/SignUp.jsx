import React from 'react'
import { Grid, Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from 'actions/auth'
import { Formik, Field, Form, ErrorMessage } from 'formik'

class SignUp extends React.Component {

  handleSubmit = (values, actions) => {
    const { email, password } = values
    this.props.registerUser(email, password)
  }

  render() {
    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <h3>Sign Up</h3>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={this.handleSubmit}
              render={({ errors, touched, isSubmitting, status }) => (
                <Form className="ui form">
                  <div className='field'>
                    <label>Email</label>
                    <Field type="email" name="email" disabled={isSubmitting} />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div className='field'>
                    <label>Password</label>
                    <Field type="password" name="password" disabled={isSubmitting} />
                    <ErrorMessage name="password" component="div" />
                  </div>
                  {status && status.msg && <div>{status.msg}</div>}
                  <Button type='submit' disabled={isSubmitting}>Submit</Button>
                </Form>
              )}
            />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({ auth, profile}) => ({
  auth,
  profile
})

export default connect(mapStateToProps, actions)(SignUp)
