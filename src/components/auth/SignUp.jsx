import React from 'react'
import { Grid, Container, Button, Form } from 'semantic-ui-react'
// react-redux-firebase redux-firestore redux-auth-wrapper ???

class SignUp extends React.Component {

  render() {
    const username = ''
    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <h3>Sign Up</h3>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input placeholder='Enter email...' />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='Enter password...' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default SignUp
