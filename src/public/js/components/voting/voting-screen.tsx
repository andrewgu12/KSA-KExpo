import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
  changeState(state: string): void;
}

interface State {

}

export default class VotingScreen extends React.Component<Props, State> {
  render() {
    return(
      <p>Voting Screen</p>
    );
  }
}
