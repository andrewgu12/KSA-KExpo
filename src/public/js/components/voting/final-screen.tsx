import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
  changeState(state: string): void;
}

interface State {

}

export default class FinalScreen extends React.Component<Props, State> {
  render() {
    return(
      <p>Final Screen</p>
    );
  }
}
