import React, { Component } from "react";
import loadable from "@loadable/component";
import { API_URL } from "./config";
import "./App.scss";
import { Box, Card, Image, Heading, Text } from "rebass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import io from "socket.io-client";
import Twitter from "./components/Twitter";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Content from "./components/Content";

const socket = io(API_URL);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      disabled: ""
    };
    this.popup = null;
  }

  componentDidMount() {
    socket.on("user", (user) => {
      this.popup.close();
      this.setState({ user });
    });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this; // const { var } = this is equivalent to const popup = this.popup
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check); //stop the interval if popup is closed/undefined
        this.setState({ disabled: "disabled" }); //set disabled to true when the popup window is closed, so disable the Sign In button, use case: when user is signed in using the OAuth provider
      }
    }, 1000); //check if popup window is closed in 1 second intervals, if not closed wait until the popup window is closed to set this.state.disabled to "disabled" which signals the Sign in button to be disabled
  }

  startAuth = () => {
    if (!this.state.disabled) {
      //this.state.disable means the Sign in button is disabled
      this.popup = this.openPopup(); // assigns the window object to this.popup variable
      this.checkPopup(); //check if the popup window is closed
      this.setState({ disabled: "disabled" }); //if reached this line the popup window is closed forsure
    }
  };

  openPopup() {
    //making and rendering the OAuth window
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/twitter?socketId=${socket.id}`;

    return window.open(
      //opens a new browser window
      url,
      "",
      `toolbar=no, location, directories=no, status=no, menubar=no,
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}` //defining the properties of the browser window to be created
    );
  }
  closeCard = () => {
    this.setState({
      user: {},
      disabled: ""
    });
  };

  render() {
    const { name, photo } = this.state.user; //equivalent to const name = this.state.user.name, const photo = this.state.user.photo
    const { disabled } = this.state;
    return (
      <ErrorBoundary>
        <div className="App">
          <div className={"container"}>
            {/* If there is a user show the name and photo If no user logged in show
            the login with Twitter button */}
            {name ? (
              <Twitter name={name} photo={photo} closeCard={this.closeCard} />
            ) : (
              // (
              //   <div className={"button"}>
              //     <button
              //       onClick={this.startAuth.bind(this)}
              //       className={`twitter ${disabled}`}
              //       id="signinButton"
              //     >
              //       <FontAwesomeIcon icon={faTwitter} />
              //       Sign in with Twitter
              //     </button>
              //   </div>
              // )

              <div className="justify-content-center">
                <h1>Custom Twitter Interface</h1>
                <h3>by Shehan Atuk</h3>

                <div className="center">
                  <div
                    className="select-button"
                    onClick={this.startAuth.bind(this)}
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                    Sign in with Twitter
                  </div>
                </div>
              </div>
            )}
          </div>

          <Footer />
        </div>
      </ErrorBoundary>
    );
  }
}
