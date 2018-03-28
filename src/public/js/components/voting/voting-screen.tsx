import * as React from "react";
import * as ReactDOM from "react-dom";

import Audience, { ApprovalArray } from "../audience/audience";
import Performance, { PerformanceArray } from "../performances/performance";

interface Props {
  changeState(state: string): void;
  setMemberState(admin: boolean, id: number, username: string, votes: ApprovalArray): void;
  user: Audience;
  performances: PerformanceArray;
}

interface State {

}

export default class VotingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const firstPerformance = props.performances[0];
    this.state = {
      currentVote: false, // keep track of current vote - only update if changes!
      currentPerformanceNumber: 1,
      currentPerformanceID: firstPerformance.id,
      voteEnabled: false
    };

    this.checkAndSubmitVote = this.checkAndSubmitVote.bind(this);
  }

  /**
   * Get new vote - only submit to DB & update if changes!
   */
  checkAndSubmitVote() {

  }

  render() {
    return(
      <p>Voting Screen</p>
    );
  }
}
