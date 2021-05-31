import React from "react";
import { Message, Grid, Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase/app";
import * as actions from "../../actions/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import * as alerts from "../../utils/alerts";

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

class SignUp extends React.Component {
  handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    const { email, password } = values;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res) {
          const { email, uid } = res.user;
          firebase
            .firestore()
            .collection("users")
            .add({
              id: uid,
              email: email,
              role: 1,
            })
            .then((res) => {
              console.log("res>>>", res);
            })
            .catch((error) => {
              console.log("error>", error);
            });
          this.props.changeAuth(true);
          this.props.changeUserRole(1, email);
          alerts.success("Successfully registered!");
          this.props.history.push("/posts");
        }
      })
      .catch((error) => {
        this.props.changeAuth(false);
        this.props.changeUserRole(-1, null);
        alerts.error(error.message);
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
              validationSchema={SignupSchema}
              render={({ errors, touched, isSubmitting }) => (
                <>
                  <Message
                    attached
                    header="Sign Up"
                    content="Fill out the form below to sign-up for a new account"
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
                    Already signed up? <Link to="/login">Login here</Link>{" "}
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

export default connect(mapStateToProps, actions)(SignUp);
