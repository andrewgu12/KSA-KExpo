import * as React from "react";
import * as ReactDOM from "react-dom";

import axios from "axios";

import Performance, { PerformanceArray } from "../performances/performance";
import DisplayCurrentPerformances from "../performances/display-performance";
import TopThreeTable from "./top-three";

interface Props {

}

interface State {
  performances: PerformanceArray;
  loading: boolean;
  finalVotingButtonText: string;
  showTopThreeTable: boolean;
  showEnableButton: boolean;
  enableVotingButtonText: string;
  disableEnableBtn: boolean;
  disableCalcBtn: boolean;
  disableFinalVoting: boolean;
  finalPerformances: PerformanceArray;
}

export default class ResultsPane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      performances: [],
      loading: true,
      finalVotingButtonText: "Calculate Final 3",
      showTopThreeTable: false,
      showEnableButton: false,
      enableVotingButtonText: "Enable Final Voting",
      disableEnableBtn: false,
      disableCalcBtn: false,
      disableFinalVoting: false,
      finalPerformances: []
    };

    this.fetchPerformanceAndSort = this.fetchPerformanceAndSort.bind(this);
    this.calculateFinalThree     = this.calculateFinalThree.bind(this);
    this.enableFinalVoting       = this.enableFinalVoting.bind(this);
    this.showEnableButton        = this.showEnableButton.bind(this);
    this.sortPerformance         = this.sortPerformance.bind(this);
    this.fetchFinalResults       = this.fetchFinalResults.bind(this);
  }

  sortPerformance(performances: PerformanceArray) {
    performances = performances.sort((perf1: Performance, perf2: Performance) => {
      if (perf1.approval < perf2.approval)
        return 1;
      else if (perf1.approval > perf2.approval)
        return -1;
      else
        return 0;
    });

    return performances;
  }

  fetchPerformanceAndSort() {
    let performances = [];

    axios.get("/performances").then((res) => {
      performances = res.data.response;
      // sort in descending order, so flip #
      performances = this.sortPerformance(performances);
      this.setState({performances: performances, loading: false});
    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.fetchPerformanceAndSort();
  }


  calculateFinalThree() {
    this.setState({showTopThreeTable: true, disableCalcBtn: true});
  }

  enableFinalVoting() {
    axios.post("/permissions/flip-flag", {
      name: "final_voting",
      value: true
    }).then((res) => {
      this.setState({enableVotingButtonText: "Enabled", disableEnableBtn: true, disableFinalVoting: true});
    }).catch((err) => {
      console.log(err);
    });
  }

  showEnableButton() {
    this.setState({showEnableButton: true});
  }

  fetchFinalResults() {
    const disableFinalVotingFlag = () => {
      return axios.post("/permissions/flip-flag", {
        name: "final_voting",
        value: false
      });
    };

    const getFinalResults = () => {
      return axios.get("/performances/get-final");
    };

    axios.all([disableFinalVotingFlag(), getFinalResults()])
      .then(axios.spread((finalVoting, finalResults) => {
        const performances = this.sortPerformance(finalResults.data.response);
        this.setState({finalPerformances: performances});
      })).catch((err: Error) => {
        console.log(err);
      });
  }

  render() {
    const intermediateTopThreeTable = (this.state.showTopThreeTable) ? (
      <TopThreeTable performances={this.sortPerformance(this.state.performances)} showEnableButton={this.showEnableButton}/>
    ) : undefined;
    const enableButton = (this.state.showEnableButton) ? (
      <button type="button" className="btn btn-primary" id="enable__btn" disabled={this.state.disableEnableBtn} onClick={this.enableFinalVoting}>{this.state.enableVotingButtonText}</button>
    ) : undefined;
    const disableFinalVoting = (this.state.disableFinalVoting) ?   (
      <button type="button" className="btn btn-primary" id="disable-final__btn" onClick={this.fetchFinalResults}>Disable Final Voting</button>
    ) : undefined;

    if (this.state.loading) {
      return (
        <i className="fas fa-spinner fa-spin fa-5x"></i>
      );
    } else {
      return (
        <div>
          <DisplayCurrentPerformances enableVoting={true} performances={this.state.performances} delete={undefined} hideEnableColumn={true} />
          <div className="btn-group" id="final-three-table__btn-group" role="group">
            <button type="button" className="btn btn-primary" disabled={this.state.disableCalcBtn} onClick={this.calculateFinalThree}>{this.state.finalVotingButtonText}</button>
            { enableButton }
          </div>
          { intermediateTopThreeTable }
          { disableFinalVoting }
          { this.state.finalPerformances.length > 0 &&
            <DisplayCurrentPerformances enableVoting={true} performances={this.state.finalPerformances} delete={undefined} hideEnableColumn={true} />
          }
        </div>
      );
    }
  }

 }
