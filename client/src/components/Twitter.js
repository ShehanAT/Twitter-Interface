import React, { Component } from "react";
import "../stylesheets/Twitter.scss";
import axios from "axios";
import { Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import TwitterContent from "./TwitterContent";
const backend_URL =
  process.env.NODE_ENV === "production"
    ? "https://agile-thicket-44316.herokuapp.com/"
    : "http://localhost:3000";
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
  
    this.setState({
      allInfo: this.props.twitterInfo,
      friendsList: this.props.twitterInfo.friendsList.users,
      followerList: this.props.twitterInfo.followerList.users,
      likedTweets: this.props.twitterInfo.likedTweets,
      timelineInfo: this.props.twitterInfo.timelineInfo,
      followers_count: this.props.twitterInfo.timelineInfo[0].user.followers_count,
      friends_count: this.props.twitterInfo.timelineInfo[0].user.friends_count
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

        <TwitterContent
          
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
