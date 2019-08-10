import React, { Component } from "react";
import "../stylesheets/Google.scss";
import axios from "axios";
import { Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import GoogleContent from "./GoogleContent";

const backend_URL =
  process.env.NODE_ENV === "production"
    ? "https://agile-thicket-44316.herokuapp.com/"
    : "http://localhost:3000";
export default class Google extends Component {
    state = {
        randomString: ""
    };

    componentDidMount(){

    }

    render(){
        return(
            <div>
                Random ass content
                My name is : {this.props.googleName}
                <img src={this.props.googlePhoto} />
            </div>



        );
    }


}
