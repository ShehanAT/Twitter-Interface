import React, { Component } from "react";
import "../stylesheets/Twitter.scss";
import axios from "axios";
import { Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import Content from "./Content";
const backend_URL =
  process.env.NODE_ENV === "production"
    ? "https://agile-thicket-44316.herokuapp.com"
    : "http://localhost:3000";
//USE THIS CLASS TO DISPLAY TWIT CONTENTS
export default class Twitter extends Component {
  state = {
    allInfo: {},
    friendsList: [],
    followerList: [],
    likedTweets: [],
    timelineInfo: [],
    followers_count: "",
    friends_count: ""
  };

  componentDidMount() {
    var user = {
      screen_name: this.props.name
    };
    axios.post(backend_URL + "/testing", { user }).then((response) => {
      if (response.data.timelineInfo.length > 0) {
        this.setState({
          allInfo: response.data,
          friendsList: response.data.friendsList.users,
          followerList: response.data.followerList.users,
          likedTweets: response.data.likedTweets,
          timelineInfo: response.data.timelineInfo,
          followers_count: response.data.timelineInfo[0].user.followers_count,
          friends_count: response.data.timelineInfo[0].user.friends_count
        });
      } else {
      }

      console.log(this.state.allInfo);
    });
  }
  render() {
    const allInfo = "testing";
    const friendsList = "";
    // only errors thrown in render() will be caught by ErrorBoundary component
    return (
      <div className="container">
        <ButtonToolbar>
          <Button variant="danger" onClick={this.props.closeCard}>
            <FontAwesomeIcon
              icon={faTimesCircle}
              onClick={this.props.closeCard}
            />
            Logout
          </Button>
        </ButtonToolbar>

        <Content
          name={this.props.name}
          photo={this.props.photo}
          friendsList={this.state.friendsList}
          followerList={this.state.followerList}
          likedTweets={this.state.likedTweets}
          timelineInfo={this.state.timelineInfo}
          followers_count={this.state.followers_count}
          friends_count={this.state.friends_count}
        />
      </div>
    );
  }
}
