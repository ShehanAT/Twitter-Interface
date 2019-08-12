import React, { Component } from "react";
import { API_URL } from "./config";
import "./App.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGoogle} from "@fortawesome/free-brands-svg-icons";
import io from "socket.io-client";
import Twitter from "./components/Twitter";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Google from "./components/Google";
import "bootstrap/dist/css/bootstrap.min.css";
const socket = io(API_URL);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      googleUser: {},
      disabled: "",
      twitterInfo: {},
      gmailInfo: [
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "1"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "2"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "3"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "4"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "5"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "6"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "7"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "8"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "9"
        },
        {
          snippet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem ",
          internalDate: "1370001284000",
          id: "10"
        },
      ],
      displayTwitter: false,
      displayGmail: true
    };
    this.popup = null;
  }

  componentDidMount() {
    socket.on("twitter", (user) => {
      this.popup.close();
      this.setState({ user });
    });
    socket.on("google", (googleUser) => {
      this.popup.close();
      this.setState({ googleUser});
      //trigger route on backend to get gmail info
    })
    socket.on("twitterData", (twitterInfo) => {
        this.setState({
          twitterInfo: twitterInfo,//assigning the twitterInfo state object the data from backend ,
          displayTwitter: true
        });
    })
    socket.on("gmailData", (gmailInfo) => {
        this.setState({
          gmailInfo: this.state.gmailInfo.concat(gmailInfo),//assigning the twitterInfo state object the data from backend ,
          displayGmail: true
        });
    })
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this; // const { var } = this is equivalent to const popup = this.popup
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check); //stop the interval if popup is closed/undefined
        this.setState({ disabled: "disabled" }); //set disabled to true when the popup window is closed, so disable the Sign In button, use case: when user is signed in using the OAuth provider
      }
    }, 1000); //check if popup window is closed in 1 second intervals, if not closed wait until the popup window is closed to set this.state.disabled to "disabled" which signals the Sign in button to be disabled
  }

  startAuth = (e) => {
    if (!this.state.disabled) {
      if(e.target.id == "googleButton"){
        this.popup = this.openPopup("google");
        this.checkPopup();
        this.setState({ disabled: "disabled" });
      }else if(e.target.id == "twitterButton"){
        this.popup = this.openPopup("twitter");
        this.checkPopup();
        this.setState({ disabled: "disabled" });
      }
      //this.state.disable means the Sign in button is disabled
     // this.popup = this.openPopup(); // assigns the window object to this.popup variable
     // this.checkPopup(); //check if the popup window is closed
     // this.setState({ disabled: "disabled" }); //if reached this line the popup window is closed forsure
    }
  };

  openPopup(provider) {
    //making and rendering the OAuth window
    const width = 600;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider}?socketId=${socket.id}`;

    return window.open(
      //opens a new browser window
      url,
      "",
      `toolbar=no, location, directories=no, status=no, menubar=no,
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}` //defining the properties of the browser window to be created
    );
  }
  closeCard = () => {
    this.setState({
      user: {},
      twitterInfo: {},
      googleUser: {},
      disabled: ""
    });
  };

  render() {
    const { twitterInfo } = this.state; //equivalent to const name = this.state.user.name, const photo = this.state.user.photo
    const {displayTwitter} = this.state;
    const { displayGmail } = this.state;
    const { gmailInfo }= this.state;
    const { googleName, googlePhoto } = this.state.googleUser;
    const { disabled } = this.state;
    return (
      <ErrorBoundary>
        <div className="App">
          
            <div className="row">
              
            <h1 className="heading">Morning Interface</h1>
            <div className="split left twitter-div">
              {displayTwitter ? (
                <Twitter twitterInfo={twitterInfo} closeCard={this.closeCard} />
              ) : (
                <div className="justify-content-center">
                  <h3 className="sub__heading" id="twitter__heading">Twitter Section</h3>
                  <div className="twitter-center">
                    <div
                      className="twitter-select-button"
                      onClick={this.startAuth.bind(this)}
                      id="twitterButton"
                    >
                      <FontAwesomeIcon icon={faTwitter} />
                      Sign in with Twitter
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="split right google-div">
            <h3 className="sub__heading">Gmail Section</h3>
            {displayGmail ? (
                <Google gmailInfo={gmailInfo} />
            )
               : (
                <div className="justify-content-center">
                
                  <div className="google-center">
                    <div 
                    onClick={this.startAuth.bind(this)}
                    id="googleButton"
                    className="google-select-button"
                    >
                      <FontAwesomeIcon icon={faGoogle} />
                      Sign in with Google
                    </div>
                  </div>
                </div>
               )
            }
          </div> 
         </div>
        </div>
          <Footer />
      </ErrorBoundary>
    );
  }
}
