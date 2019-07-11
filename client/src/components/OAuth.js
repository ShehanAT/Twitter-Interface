import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { API_URL } from "../config";

export default class OAuth extends Component {
  state = {
    user: {},
    disabled: ""
  };
  componentDidMount() {
    console.log(this.popup);
    const { socket, provider } = this.props;
    socket.on(provider, (user) => {
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

  openPopup() {
    //making and rendering the OAuth window
    const { provider, socket } = this.props;
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      //opens a new browser window
      url,
      "",
      `toolbar=no, location, directories=no, status=no, menubar=no,
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}` //defining the properties of the browser window to be created
    );
  }

  startAuth = () => {
    if (!this.state.disabled) {
      //this.state.disable means the Sign in button is disabled
      this.popup = this.openPopup(); // assigns the window object to this.popup variable
      this.checkPopup(); //check if the popup window is closed
      this.setState({ disabled: "disabled" }); //if reached this line the popup window is closed forsure
    }
  };

  closeCard = () => {
    this.setState({ user: {} });
  };

  render() {
    const { name, photo } = this.state.user; //equivalent to const name = this.state.user.name
    const { provider } = this.props; //equivalent to const provider = this.props.provider(props is pass down from the parent component App)
    const { disabled } = this.state; //equivalent to const disabled = this.state.disabled
    const atSymbol = provider === "twitter" ? "@" : "";
    return (
      <div>
        {name ? (
          <div className="card">
            <img src={photo} alt={name} />
            <FontAwesome
              name="times-circle"
              className="close"
              onClick={this.closeCard}
            />
            <h4>{`${atSymbol}${name}`}</h4>
            {/* displaying the logged in user's Twitter Username */}
          </div>
        ) : (
          <div className="button-wrapper fadein-fast">
            <button
              onClick={this.startAuth}
              className={`${provider} ${disabled} button`}
            >
              <FontAwesome name={provider} />
            </button>
          </div>
        )}
      </div>
    );
  }
}
OAuth.propTypes = {
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};
