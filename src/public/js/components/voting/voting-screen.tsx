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
  heartClass: string;
}

export default class VotingScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const firstPerformance = props.performances[0];
    const user = props.user;
    const userPerformances = user.performances;

    this.state = {

      currentVote:              (userPerformances[0]) ? true : false, // keep track of current vote - only update if changes!
      currentPerformanceNumber: 1, // 1-based!
      currentPerformanceID:     firstPerformance.id,
      currentPerformanceName:   firstPerformance.name,
      currentPerformanceImage:  firstPerformance.imageName,
      totalPerformanceNumber:   props.performances.length,
      voteEnabled:              false,
      errorMessage:             undefined,
      heartClass:               (userPerformances[0]) ? "fas fa-heart" : "far fa-heart"

    };

    this.checkPermission          = this.checkPermission.bind(this);
    this.checkAndSubmitVote       = this.checkAndSubmitVote.bind(this);
    this.updateCurrentPerformance = this.updateCurrentPerformance.bind(this);
    this.decrementPerformance     = this.decrementPerformance.bind(this);
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
    const newVoteClass = (this.state.heartClass === "far fa-heart") ? "fas fa-heart" : "far fa-heart";
    const newVote      = (this.state.heartClass === "far fa-heart") ? true : false;
    const currentVote  = this.state.currentVote;
    const currentUser  = this.props.user;

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
            // update total votes count
            const totalVotes = this.props.user.performances;
            totalVotes[this.state.currentPerformanceNumber - 1] = newVote;
            this.props.setMemberState(currentUser.admin, currentUser.id, currentUser.username, totalVotes);

            this.setState({currentVote: newVote, heartClass: newVoteClass, errorMessage: undefined});
          }).catch((err) => {
            console.log(err);
          });
        }
      } else {
        this.setState({voteEnabled: false, errorMessage: "Sorry! Voting is disabled for this performance at the moment.\n"});
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
      // if user has already votes for this, load it in
      const nextVote = (userPerformances.length > (nextPerformanceNumber - 1) && userPerformances[nextPerformanceNumber - 1]) ? true : false;
      const heartClass = (nextVote) ? "fas fa-heart" : "far fa-heart";
      // reset values!
      this.setState({currentVote: nextVote, currentPerformanceNumber: nextPerformanceNumber, currentPerformanceID: nextPerformance.id,
        currentPerformanceName: nextPerformance.name, voteEnabled: false, errorMessage: undefined, heartClass: heartClass});
    } else if (nextPerformanceNumber === this.state.totalPerformanceNumber + 1) {
      // final voting!
      this.props.changeState("final");
    }
  }

  /**
   * Decrement counter and go back to previous performance
   */
  decrementPerformance() {
    const userPerformances = this.props.user.performances;
    const previousPerformanceNumber = this.state.currentPerformanceNumber - 1;

    if (previousPerformanceNumber >= 1) {
      const previousPerformance = this.props.performances[previousPerformanceNumber - 1];
      const previousVote        = (userPerformances[previousPerformanceNumber - 1]) ? true : false;
      const heartClass          = (previousVote) ? "fas fa-heart" : "far fa-heart";

      this.setState({currentVote: previousVote, currentPerformanceNumber: previousPerformanceNumber, currentPerformanceID: previousPerformance.id,
        currentPerformanceName: previousPerformance.name, voteEnabled: false, errorMessage: undefined, heartClass: heartClass});
    }
  }

  render() {
    const arrowElement = (this.state.currentPerformanceNumber > 1) ? (
      <button id="prev-performance" onClick={this.decrementPerformance}>
        <i className="fas fa-arrow-left nav-arrow"></i>
      </button>
    ) : undefined;

    return(
      <div>
        <div className="row align-items-center">
          <div className="col-1 arrow-left">
            { arrowElement }
          </div>
          <div className="col-10">
            <div id="card-holder">
              <div id="performer-title">
                <h3>Performance #{this.state.currentPerformanceNumber}:</h3>
                <h2>{this.state.currentPerformanceName}</h2>
              </div>
              <div id="performer-image-container">
                <img className="performer-image" src="../images/performers/performer1.jpg"/>
              </div>
              <button id="like-btn" onClick={this.checkAndSubmitVote}>
                <i className={this.state.heartClass}></i>
              </button>
              <div className="no-vote"><p>{this.state.errorMessage}</p></div>
            </div>
          </div>
          <div className="col-1">
            <button id="next-performance" onClick={this.updateCurrentPerformance}>
              <i className="fas fa-arrow-right nav-arrow"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
