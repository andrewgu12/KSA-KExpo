import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import Audience, { ApprovalArray } from "../audience/audience";
import Performance, { PerformanceArray } from "../performances/performance";

interface Props {
  changeState(state: string): void;
  setMemberState(admin: boolean, id: number, username: string, votes: ApprovalArray): void;
  user: Audience;
  performances: PerformanceArray;
}

interface State {
  currentVote: boolean; // keep track of current vote - only update if changes!
  currentPerformanceNumber: number;
  currentPerformanceID: number;
  currentPerformanceName: string;
  totalPerformanceNumber: number;
  currentPerformanceImage: string;
  voteEnabled: boolean;
  errorMessage: string;
  approvedButtonEnabled: boolean;
}

export default class VotingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const firstPerformance = props.performances[0];
    const user = props.user;
    const userPerformances = user.performances;

    this.state = {
      currentVote:              (userPerformances[0]) ? true : false, // keep track of current vote - only update if changes!
      currentPerformanceNumber: 1,
      currentPerformanceID:     firstPerformance.id,
      currentPerformanceName:   firstPerformance.name,
      currentPerformanceImage:  firstPerformance.imageName,
      totalPerformanceNumber:   props.performances.length,
      voteEnabled:              false,
      errorMessage:             undefined,
      approvedButtonEnabled:    false // default value for votes!
    };

    this.checkPermission          = this.checkPermission.bind(this);
    this.checkAndSubmitVote       = this.checkAndSubmitVote.bind(this);
    this.updateCurrentPerformance = this.updateCurrentPerformance.bind(this);
  }

  /**
   * check the value of flag in DB
   */
  checkPermission() {
    const flagName = this.state.currentPerformanceName;
    return axios.get(`/permissions/check-flag?id=${flagName}`);
  }

  /**
   * Get new vote - only submit to DB & update if changes!
   * TODO: add in loading UI
   */
  async checkAndSubmitVote() {
    // get new vote
    const newVote = true; // fake value, replace with actual new vote value
    const currentVote = this.state.currentVote;
    const currentUser = this.props.user;

    this.checkPermission().then((res) => {
      if (res.data.value) {
        this.setState({voteEnabled: true});
        if (newVote !== this.state.currentVote) {
          // going from no to yes
          const direction = (newVote && !currentVote) ? "increment" : "decrement";
          axios.post("/performances/vote", {
            name: this.state.currentPerformanceName,
            direction: direction
          }).then((res) => {
            this.setState({currentVote: newVote});
            // update total votes count
            const totalVotes = this.props.user.performances;
            totalVotes.push(newVote);
            this.props.setMemberState(currentUser.admin, currentUser.id, currentUser.username, totalVotes);
          }).catch((err) => {
            console.log(err);
          });
        }
      } else {
        this.setState({voteEnabled: false, errorMessage: "Sorry! Looks like you can't vote for this performance right now.\n", approvedButtonEnabled: false});
      }
    });
  }

  /**
   * increment counter & update relevant info
   */
  updateCurrentPerformance() {
    const nextPerformanceNumber = this.state.currentPerformanceNumber + 1;
    const userPerformances = this.props.user.performances;
    const currentVote = this.state.currentVote;

    if (nextPerformanceNumber >= 1 && nextPerformanceNumber <= this.state.totalPerformanceNumber) {
      const nextPerformance = this.props.performances[nextPerformanceNumber - 1];
      // reset!
      // if user has already votes for this, load it in
      const nextVote = (userPerformances.length > (nextPerformanceNumber - 1) && userPerformances[nextPerformanceNumber - 1]) ? true : false;
      this.setState({currentVote: currentVote, currentPerformanceNumber: nextPerformanceNumber, currentPerformanceID: nextPerformance.id,
        currentPerformanceName: nextPerformance.name, voteEnabled: false, errorMessage: undefined, approvedButtonEnabled: false});
    } else if (nextPerformanceNumber === this.state.totalPerformanceNumber + 1) {
      // final voting!
      this.props.changeState("final");
    }
  }

  render() {
    return(
      <div>
        <p>Voting Screen</p>
        <button className="btn" type="button" onClick={this.checkAndSubmitVote}>Submit!</button>
      </div>
    );
  }
}
