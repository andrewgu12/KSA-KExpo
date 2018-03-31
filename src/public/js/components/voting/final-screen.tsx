import * as React from "react";
import * as ReactDOM from "react-dom";

import Audience from "../audience/audience";
import Performance, { PerformanceArray } from "../performances/performance";

import axios from "axios";

interface Props {
  changeState(state: string): void;
  user: Audience;
}

interface State {
  performances: PerformanceArray;
  voteEnabled: boolean;
  selection1Class: string;
  selection2Class: string;
  selection3Class: string;
  disableRefresh: boolean;
}

export default class FinalScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      performances: [],
      voteEnabled: false,
      selection1Class: "final-selection",
      selection2Class: "final-selection",
      selection3Class: "final-selection",
      disableRefresh: false
    };

    this.getFinalPerformances = this.getFinalPerformances.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
    this.submitVote = this.submitVote.bind(this);
    this.refreshScreen = this.refreshScreen.bind(this);
    this.routeToPerformances = this.routeToPerformances.bind(this);
  }

  async componentWillMount () {
    const response = await this.checkPermission();
    if (response) {
      await this.getFinalPerformances();
    }
  }

  async getFinalPerformances() {
    const onSuccess = (response: any) => {
      this.setState({performances: response.data.response});
      return response.response;
    };

    try {
      const response = await axios.get("/performances/get-final");
      return onSuccess(response);
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async checkPermission() {
    const onSuccess = (success: any) => {
      const enabled = success.data.value;
      this.setState({voteEnabled: enabled});
      return enabled;
    };

    try {
      const success = await axios.get("/permissions/check-flag?id=final_voting");
      return onSuccess(success);
    } catch (error) {
      return false;
    }
  }

  selectWinner(selectionId: string) {
    console.log(selectionId);
    let newSelectionClass = "";

    if (selectionId === "selection-1") {
      newSelectionClass = (this.state.selection1Class === "final-selection") ? "final-selection selected" : "final-selection";
      this.setState({selection1Class: newSelectionClass});  // changes color after tap
      if (newSelectionClass == "final-selection selected") {  // deselects other options
        this.setState({selection2Class: "final-selection", selection3Class: "final-selection"});
      }
    } else if (selectionId === "selection-2") {
      newSelectionClass = (this.state.selection2Class === "final-selection") ? "final-selection selected" : "final-selection";
      this.setState({selection2Class: newSelectionClass});  // changes color after tap
      if (newSelectionClass === "final-selection selected") { // deselects other options
        this.setState({selection1Class: "final-selection", selection3Class: "final-selection"});
      }
    } else if (selectionId === "selection-3") {
      newSelectionClass = (this.state.selection3Class === "final-selection") ? "final-selection selected" : "final-selection";
      this.setState({selection3Class: newSelectionClass});  // changes color after tap
      if (newSelectionClass === "final-selection selected") { // deselects other options
        this.setState({selection1Class: "final-selection", selection2Class: "final-selection"});
      }
    }
  }

  // need to be fixed
  routeToPerformances() {
    this.props.changeState("voting");
  }

  submitVote() {
    let performanceName = ""; // get vote somehow
    const performances = this.state.performances;

    if (this.state.selection1Class === "final-selection selected")
      performanceName = performances[0].name;
    else if (this.state.selection2Class === "final-selection selected")
      performanceName = performances[1].name;
    else if (this.state.selection2Class === "final-selection selected")
      performanceName = performances[2].name;


    axios.post("/performances/final/vote", {
      name: performanceName
    }).then((res) => {
      if (res.data.code !== 200) {
        console.log(res);
      }
      this.props.changeState("thanks");
      return res;
    }).catch((err) => {
      console.log(err);
    });
  }

  // Call this with refresh to check if voting enabled and get performances
  async refreshScreen() {
    this.setState({disableRefresh: true});
    const response = await this.checkPermission();

    if (response) {
      await this.getFinalPerformances();
    } else {
      this.setState({disableRefresh: false});
    }
  }

  render() {

    const performances = this.state.performances;
    if (this.state.voteEnabled && this.state.performances.length > 0) {
      console.log("within performances");
      console.log(performances);
      return(
        <div>
          <div className="row align-items-center">
            <div className="col-1 arrow-left">
              {/* <button id="prev-performance" onClick={this.routeToPerformances}>
                <i className="fas fa-arrow-left final-arrow"></i>
              </button> */}
            </div>
            <div className="col-10">
              <div id="card-holder" className="final-card">
                <div id="final-title">
                  <h3>Choose your favorite!</h3>
                </div>
                <button id="selection-1" className={this.state.selection1Class} onClick={() => this.selectWinner("selection-1")}>
                  {/* <h3 className="selection-text">Performance #1:</h3> */}
                  <h2 className="selection-text">{performances[0].name}</h2>
                </button>
                <button id="selection-2" className={this.state.selection2Class} onClick={() => this.selectWinner("selection-2")}>
                  {/* <h3 className="selection-text">Performance #:</h3> */}
                  <h2 className="selection-text">{performances[1].name}</h2>
                </button>
                <button id="selection-3" className={this.state.selection3Class} onClick={() => this.selectWinner("selection-3")}>
                  {/* <h3 className="selection-text">Performance #5:</h3> */}
                  <h2 className="selection-text">{performances[2].name}</h2>
                </button>
                <div className="row justify-content-center">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary" onClick={this.submitVote}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const refreshElement = (this.state.disableRefresh) ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : "Refresh";
      return (
        <div>
          <div className="row align-items-center">
            <div className="col-1 arrow-left">
              <button id="prev-performance" className="btn-fix" onClick={this.routeToPerformances}>
                <i className="fas fa-arrow-left final-arrow-early"></i>
              </button>
            </div>
            <div className="col-10">
              <div id="card-holder" className="final-card-early">
                <div id="final-title">
                  <h3>Final voting hasn't begun!</h3>
                </div>
                <div className="row justify-content-center">
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary" onClick={this.refreshScreen} disabled={this.state.disableRefresh}>{refreshElement}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
