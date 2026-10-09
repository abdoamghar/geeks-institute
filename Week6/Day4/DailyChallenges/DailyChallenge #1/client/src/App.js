import React, { Component } from "react";

class App extends Component {
  state = {
    helloMessage: "",
    inputValue: "",
    responseMessage: "",
  };

  async componentDidMount() {
    try {
      const response = await fetch("/api/hello");
      const message = await response.text();

      this.setState({ helloMessage: message });
    } catch (error) {
      console.error("Could not get the hello message:", error);
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/world", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: this.state.inputValue }),
      });
      const message = await response.text();

      this.setState({ responseMessage: message });
    } catch (error) {
      console.error("Could not send the message:", error);
    }
  };

  render() {
    return (
      <main className="app">
        <h1>{this.state.helloMessage}</h1>
        <h2>Post to Server:</h2>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>

        <p>{this.state.responseMessage}</p>
      </main>
    );
  }
}

export default App;
