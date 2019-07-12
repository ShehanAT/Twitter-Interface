import React, { Component } from "react";
import PropTypes from "prop-types";
import FontAwesome from "react-fontawesome";
import { API_URL } from "../config";

export default class OAuth extends Component {
  componentDidMount() {
    console.log(this.popup);
  }

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
