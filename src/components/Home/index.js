import React from "react";
import { Container } from "semantic-ui-react";

class Home extends React.Component {
  render() {
    return (
      <Container>
        <h2>Management Tool</h2>
        <div>
          <h3>Short Summary</h3>
          <p>
            This app is designed for project manager to control the working
            hours for a company's employees.
          </p>
          <p className="text-right">Version: 0.0.1</p>
        </div>
      </Container>
    );
  }
}

export default Home;
