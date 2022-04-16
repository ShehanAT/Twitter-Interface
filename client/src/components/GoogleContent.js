import React, { Component } from "react";
import "../stylesheets/GoogleContent.scss";
import { ReactComponent as GmailLogo} from "../img/gmail.svg";
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
      <div className="gmail__card" >
        <GmailLogo className="gmail__logo "/>
        <li >Subject : {this.props.gmail.payload.headers.find((value) => {
          if(value.name === "Subject"){
            return value.value;
          }
        }).value}</li>
         <li >Snippet: {this.props.gmail.snippet}</li>
        <li className="gmailLabel__container">Labels: 
          {this.props.gmail.labelIds.map((label,index) => {
            return <span className="gmailLabel" key={index}>{label + " "}</span>
          })}
        </li>
        <li>Sent From: {this.props.gmail.payload.headers.find((value) => {
          if(value.name === "From"){
            return value.value;
          }
        }).value}</li>
      </div>
    );
  }
}