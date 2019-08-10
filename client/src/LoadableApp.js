import React, { Component } from "react";
import Loadable from "react-loadable";
//react-loadable is used for lazy loading React applications
//It has a Higher Order Component(HOC) called Loadable
//Loadable dynamically loads any module before rendering it into your application

//Lazy loading definition: instead of loading everything at the same time, you can load something asynchronously while the other pieces other still loading
//React 16.6 > is required to lazy load
const LoadApp = Loadable({
  loader: () => import("./App"), //this tells Loadable to import our specified component
  loading() {
    return <div>Loading...</div>;
  },
  timeout: 10000 // 10 seconds, this would tell Loadable how long to try loading
  //the component before it fails. This handles issues with slow internet connections.
});
export default class LoadableApp extends Component {
  render() {
    return <LoadApp />; //assigning the component returned by Higher Order Component Loadable to LoadApp then exporting class LoabableApp which is render LoadApp inside
  }
}
