import React from "react";

export default () => (
  <div className="loading-wrapper fadein-slow">
    <h4>Heroku is loading, please wait...</h4>
    <div className="loading">
      <div className="background">
        <i className="icon-heroku" />
      </div>
      <div className="spinner" />
    </div>
  </div>
);
