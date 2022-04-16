import React, { Component } from "react";
import "../stylesheets/TwitterContent.scss";
export default class TwitterContent extends Component {
  render() {
    return (
      <div className="container">
            <div className="container">
              <div className="row-sm-3">
                <div className="panel panel-default">
                  <div className="panel-body">
                    <a href="#">
                      <img className="img-responsive profile-pic" alt=""/>
                    </a>
                  <div className="not-row">
                    <h3>Your Profile:</h3>
                    <div className="row-xs-4-tweet">
                      <h5>FOLLOWING:<em> {this.props.followers_count}</em>
                      </h5></div>
                      <div className="row-xs-4-tweet">
                        <h5>FOLLOWERS:<em> {this.props.friends_count}</em>
                      </h5></div></div>
                      </div></div></div><div className="row-sm-6">
                        <div className="tweet-panel">
                          <div className="panel-heading">
                            <h3 className="panel-title">Most recent tweets</h3>
                            <div className="panel-body">
                            {this.props.timelineInfo.map(function(item, i) {
                              return (
                                <div className="tweet-media-body" key={i}>
                                  <h4 className="media-heading">Tweet #{i + 1}</h4>
                                  <p>{item.text}</p>
                                </div>
                              );
                            })}
                              </div>
                              </div>
          <div className="row-sm-3">
            <div className="panel panel-default panel-custom">
              <div className="panel-heading"><h3 className="panel-title">5 most recent following</h3>
              </div>
              <div className="panel-body">
              {this.props.friendsList.map((item, i) => {
                return (
                  <div className="medias" key={i}>
                    <div className="media-left">
                      <img
                        src={item.profile_image_url}
                        alt=""
                        className="media-object img-rounded"
                      />
                    </div>
                    <div className="media-body">
                      <h4 className="media-heading">{item.name}</h4>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
            <div className="panel panel-default panel-custom">
                <div className="panel-heading">
                  <h3 className="panel-title">5 most recent followers</h3>
                  </div>
                  <div className="media-body">
                  {this.props.followerList.map(function(item, i) {
                      return (
                        <div className="medias" key={i}>
                          <div className="media-left">
                            <img
                              src={item.profile_image_url}
                              alt=""
                              className="media-object img-rounded"
                            />
                          </div>
                          <div className="media-body">
                            <h4 className="media-heading">{item.name}</h4>
                          </div>
                        </div>
                      );
                    })}
                </div>    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
  }
}
