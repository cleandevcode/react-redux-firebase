import React from "react";
import { Message, Grid, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase/app";
import * as actions from "../../actions/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as alerts from "../../utils/alerts";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

class Login extends React.Component {
  handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    const { email, password } = values;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        const { uid } = res.user;
        this.props.changeAuth(true);
        localStorage.setItem("user", uid);

        this.props.getUserRoleByUID(uid);
        alerts.success("Successfully logged in!");
        this.props.history.push("/posts");
      })
      .catch((error) => {
        this.props.changeAuth(false);
        alerts.error(error.message);
        actions.setSubmitting(false);
        actions.resetForm();
      });
  };

  render() {
    return (
      <Container>
        <Grid centered columns={2}>
          <Grid.Column>
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={this.handleSubmit}
              validationSchema={LoginSchema}
              render={({ errors, touched, isSubmitting, status }) => (
                <>
                  <Message
                    attached
                    header="Log In"
                    content="Fill out the form below to log into your account"
                  />
                  <Form className="ui form attached fluid segment">
                    <div className="field">
                      <label>Email</label>
                      <Field
                        type="email"
                        name="email"
                        disabled={isSubmitting}
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="dangerText"
                      />
                    </div>
                    <div className="field">
                      <label>Password</label>
                      <Field
                        type="password"
                        name="password"
                        disabled={isSubmitting}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="dangerText"
                      />
                    </div>
                    <Button type="submit" disabled={isSubmitting}>
                      Submit
                    </Button>
                  </Form>
                  <Message attached="bottom" warning>
                    Not signed up? <Link to="/signup">Sign up here</Link>{" "}
                    instead.
                  </Message>
                </>
              )}
            />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(mapStateToProps, actions)(Login);
