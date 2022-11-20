import Test from "./Test";
import React from "react";

export default function About() {
  class ErrorBoundary extends React.Component {

    constructor(props) {
      super(props);
      this.state = {error: false}
    }

    static getDerivedStateFromError(error) {
      return {error: true}
    }

    componentDidCatch(error, errorInfo) {
      console.log(error, errorInfo);
    }

    render() {
      if(this.state.error){
        return <div className="alert alert-danger">Il y a eu un problème</div>
      }
      return this.props.children;
    }
  }

  return (
    <>
      <h1>About</h1>
      <ErrorBoundary>
        <Test />
      </ErrorBoundary>
    </>
  );
}
