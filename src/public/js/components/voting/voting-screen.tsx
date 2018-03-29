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
    this.state = {
      currentVote:              false, // keep track of current vote - only update if changes!
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

    axios.get(`/check-flag?id=${flagName}`).then((res) => {
      if (res.data.value) {
        this.setState({voteEnabled: true});
        return true; // enabled!
      } else {
        this.setState({ voteEnabled: false});
        return false;
      }
    }).catch((err) => {
      this.setState({voteEnabled: false});
      return false;
    });
  }

  /**
   * Get new vote - only submit to DB & update if changes!
   * TODO: add in loading UI
   */
  checkAndSubmitVote() {
    // get new vote
    const newVote = true; // fake value, replace with actual new vote value
    const currentVote = this.state.currentVote;
    // check permission!
    if (this.checkPermission()) {
      if (newVote !== this.state.currentVote) {
        // going from no to yes
        const direction = (newVote && !currentVote) ? "increment" : "decrement";

        axios.post("/performance/vote", {
          name: this.state.currentPerformanceName,
          direction: direction
        }).then((res) => {
          this.setState({currentVote: newVote});
        }).catch((err) => {
          console.log(err);
        });
      }
    } else {
      this.setState({errorMessage: "Sorry! Looks like you can't vote for this performance right now.\n", approvedButtonEnabled: false});
      // TODO: disable button to allow revoting
    }
  }

  /**
   * increment counter & update relevant info
   */
  updateCurrentPerformance() {
    const nextPerformanceNumber = this.state.currentPerformanceNumber + 1;

    if (nextPerformanceNumber >= 1 && nextPerformanceNumber <= this.state.totalPerformanceNumber) {
      const nextPerformance = this.props.performances[nextPerformanceNumber - 1];
      // reset!
      this.setState({currentVote: false, currentPerformanceNumber: nextPerformanceNumber, currentPerformanceID: nextPerformance.id,
        currentPerformanceName: nextPerformance.name, voteEnabled: false, errorMessage: undefined, approvedButtonEnabled: false});
    } else if (nextPerformanceNumber === this.state.totalPerformanceNumber + 1) {
      // final voting!
      this.props.changeState("final");
    }
  }

  render() {
    return(
      <p>Voting Screen</p>
    );
  }
}
