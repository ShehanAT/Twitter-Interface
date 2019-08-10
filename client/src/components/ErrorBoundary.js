import React, { Component } from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    //Catchs error in any child components and re-renders them with error message
    //Display fallback UI
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          {/* Emmet works only inside html elements */}
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
    // if no error in the children just render the children components
  }
}
