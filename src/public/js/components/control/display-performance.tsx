import * as React from "react";
import * as ReactDOM from "react-dom";

import PerfRow from "./perf-row";

interface State {
  performances: any;
}

interface Props {
  performances: any;
  delete(id: number): void;
}

interface Performance {
  name: string;
  id: number;
  approval: number;
  enabled: boolean;
}

export default class DisplayCurrentPerformances extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      performances: props.performances
    };
  }

  render() {
    let counter = 1;
    const perfRows = this.state.performances.map((perf: Performance) => {
      return <PerfRow delete={this.props.delete} dbID={perf.id} key={perf.id} counter={counter++} name={perf.name} approval={perf.approval} enabled={perf.enabled} />;
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