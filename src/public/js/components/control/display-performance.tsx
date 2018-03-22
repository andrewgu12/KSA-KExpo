import * as React from "react";
import * as ReactDOM from "react-dom";

import PerfRow from "./perf-row";

interface State {
  performances: any;
  enableVoting: boolean;
}

interface Props {
  performances: any;
  enableVoting: boolean; // flag to know if we're modifying voting
  delete(id: number): void;
}

interface Performance {
  name: string;
  id: number;
  approval: string;
  enabled: boolean;
}

export default class DisplayCurrentPerformances extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      performances: props.performances,
      enableVoting: props.enableVoting
    };
  }

  render() {
    let counter = 1;
    const perfRows = this.state.performances.map((perf: Performance) => {
      return <PerfRow delete={this.props.delete} dbID={perf.id} key={perf.id} counter={counter++} enableVoting={this.state.enableVoting} name={perf.name} approval={perf.approval} enabled={perf.enabled} />;
    });

    return(
      <table className="perf-table table">
        <thead>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Approval</th>
          <th scope="col">Enabled</th>
          <th scope="col">Delete</th>
        </thead>
        <tbody>
          {perfRows}
        </tbody>
      </table>
    );
  }
}