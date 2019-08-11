import React, { Component } from "react";
import "../stylesheets/Google.scss";


export default class Google extends Component {
    render(){
        return(
            <div className="gmail__container">
                <p>Snippet: {this.props.gmail.snippet}</p>
                <p>Internal Data: {this.props.gmail.internalDate}</p>
                <p>Id: {this.props.gmail.id}</p>
            </div>
        );
    }


}
