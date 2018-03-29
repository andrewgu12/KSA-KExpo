import * as React from "react";
import * as ReactDOM from "react-dom";

import { PerformanceArray } from "../performances/performance";
import DisplayCurrentPerformances from "../performances/display-performance";

import axios from "axios";

interface Props {
  performances: PerformanceArray;
  showEnableButton(): void;

}

interface State {
  performances: PerformanceArray;
  loading: boolean;
}

export default class TopThreeTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      performances: [],
      loading: true
    };
  }

  componentWillMount() {
    let performances = this.props.performances;
    performances = performances.slice(0, 3);
    this.setState({performances: performances});    
  }

  componentDidMount() {
    axios.post("/performances/enter-multiple", {
      performances: this.state.performances
    }).then((res: Object) => {
      console.log(res);
      this.setState({loading: false});
      this.props.showEnableButton();
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <i className="fas fa-spinner fa-spin fa-5x"></i>
      );
    } else {
      return (
        <DisplayCurrentPerformances enableVoting={true} performances={this.state.performances} delete={undefined} hideEnableColumn={true}/>
      );
    }
  }
}
