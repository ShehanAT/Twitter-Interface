import React, { Component } from "react";
import "../stylesheets/GoogleContent.scss";
export default class GoogleContent extends Component {
  constructor(){
    super();
    this.state = {
      counter: 0
    }

  }
  componentDidMount(){
    this.setState({
      counter: this.state.counter++
    });
    document.counter = this.state.counter;
  }
  
  render() {

    return(
      <div className={"gmail__id" + this.props.id}>
        <p>Snippet: {this.props.gmail.snippet}</p>
        <p>Internal Date: {this.props.gmail.internalDate}</p>
        <p>Id: {this.props.gmail.id}</p>
      </div>
    );
  }
}