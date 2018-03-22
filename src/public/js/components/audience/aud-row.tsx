import * as React from "react";
import * as ReactDOM from "react-dom";

import Audience, { Approval, ApprovalArray } from "./audience";

interface Props {
  dbID: number;
  name: string;
  performances: ApprovalArray;
  perfNumber: number;
}

interface State {

}

export default class AudRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // this.state = {

    // };

    this.generateVotingResults = this.generateVotingResults.bind(this);
  }

  
  generateVotingResults() {
    const perfNumber = this.props.perfNumber;
    const cells = [];
    const remaining = perfNumber - this.props.performances.length;

    // first generate however many results they voted on
    for (let i = 0; i < this.props.performances.length; i++) {
      const result = (this.props.performances[i]) ? "Yes" : "No";
      cells.push( <td> {result} </td> );
    }

    // pad the rest with false
    for (let i = 0; i < remaining; i++) {
      cells.push( <td> No </td> );
    }
    return cells;
  }

  render() {
    const approvalCells = this.generateVotingResults();

    return(
      <tr>
        <th scope="row" style={{display: "none"}}>{this.props.dbID}</th>
        <td>{this.props.name}</td>
        {approvalCells}
      </tr>
    );
  }
}
