import React, { Component } from "react";
import "../stylesheets/Google.scss";
import GoogleContent from "./GoogleContent";

export default class Google extends Component {
    render(){
        return(
            <div className="gmail__container">
            {this.props.gmailInfo.map((gmail, index) => {
                
                return <GoogleContent gmail={gmail} key={index}/>
            })}
            </div>
           
        );
    }


}
