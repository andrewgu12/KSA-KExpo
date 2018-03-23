import * as React from "react";
import * as ReactDOM from "react-dom";

import axios from "axios";

interface Props {

}

interface State {

}

export default class ResultsPane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <p>Hello from results pane!</p>
    );
  }

 }
