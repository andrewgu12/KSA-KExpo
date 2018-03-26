import * as React from "react";
import * as ReactDOM from "react-dom";

import LoginScreen from "./login-screen";
import VotingScreen from "./voting-screen";
import FinalScreen from "./final-screen";

interface Props {

}
interface State {
  state: string; // can be in four states - loading, login, voting screen, final
}

export default class VotingPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      state: "loading"
    };

    this.changeState = this.changeState.bind(this);
  }

  // ability to change screen from other screens.
  changeState(state: string) {
    this.setState({state: state});
  }

  render() {
    const currentState = this.state.state;
    let renderElement = undefined;

    switch (currentState) {
      case "loading":
        renderElement = <i className="fas fa-spinner fa-spin fa-5x"></i>;
        break;
      case "login":
        renderElement = <LoginScreen changeState={this.changeState} />;
        break;
      case "voting":
        renderElement = <VotingScreen changeState={this.changeState} />;
        break;
      case "final":
        renderElement = <FinalScreen changeState={this.changeState} />;
        break;
    }

    return (
      renderElement
    );
  }
}
