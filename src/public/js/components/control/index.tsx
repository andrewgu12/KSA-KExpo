import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import DisplayCurrentPerformances from "../performances/display-performance";
import { PerformanceArray } from "../performances/performance";

interface Props {

}

interface State {
  performances: PerformanceArray;
  loading: boolean;
}

export default class ControlPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      performances: [],
      loading: true
    };

    // this.fetch
  }

  fetchAllPerformances() {
    this.setState({ loading: true });
    const performances = {};
    axios.get("/performances").then((res: any) => {
      this.setState({ competitors: res.data.response, loading: false });
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  render() {
    return(
      <p> Control Panel </p>
    );
  }
}
