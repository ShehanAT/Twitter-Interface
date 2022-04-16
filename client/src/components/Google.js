import React, { Component } from "react";
import "../stylesheets/Google.scss";
import GoogleContent from "./GoogleContent";
import { Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

export default class Google extends Component {
    render(){
        return(
            <div className="gmail__container">
            <ButtonToolbar>
              <Button variant="danger" id="gmailLogout" onClick={this.props.closeCard}>
                <FontAwesomeIcon
                  icon={faTimesCircle}
                  onClick={this.props.closeCard}
                />
                Logout
              </Button>
            </ButtonToolbar>
            {this.props.gmailInfo.map((gmail, index) => {
                
                return <GoogleContent gmail={gmail} key={index}/>
            })}
            </div>
           
        );
    }


}
