import React, { Component } from "react";
import io from "socket.io-client";
import OAuth from "./components/OAuth";
import { API_URL } from "./config";
import "./App.css";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
console.log(API_URL);
const socket = io(API_URL);
const providers = ["twitter"];

export default class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    fetch(`${API_URL}/wake-up`).then((res) => {
      if (res.ok) {
        this.setState({ loading: false });
      }
    });
  }
  render() {
    const buttons = (providers, socket) =>
      providers.map((provider) => (
        <OAuth provider={provider} key={provider} socket={socket} />
      ));
    return (
      <div className="App">
        <div className="container">
          {this.state.loading ? <Loading /> : buttons(providers, socket)}
        </div>
        <Footer />
      </div>
    );
  }
}
