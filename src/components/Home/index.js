import React from "react";
import { Container } from "semantic-ui-react";

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h2>Management Tool</h2>

        <p className="mt-5">
          This app is designed for project manager to control the working hours
          for a company's employees.
        </p>
        <p>Version: 0.0.1</p>
      </Container>
    );
  }
}

export default Home;
