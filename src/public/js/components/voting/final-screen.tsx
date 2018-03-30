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
    };

    this.getFinalPerformances = this.getFinalPerformances.bind(this);
    this.checkPermission = this.checkPermission.bind(this);
    this.submitVote = this.submitVote.bind(this);
  }

  async componentDidMount () {
    const performances = await this.getFinalPerformances();
    this.setState({performances: performances});
  }

  async getFinalPerformances() {
    const onSuccess = (response: any) => { return response.data.response; };

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
    const performanceName = ""; // get vote somehow

    axios.post("/performances/final/vote", {
      name: performanceName
    }).then((res) => {
      if (res.data.code !== 200) {
        console.log(res);
      }
      return res;
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return(
      <div>
        <div className="row align-items-center">
          <div className="col-1 arrow-left">
            <button id="prev-performance" onClick={this.routeToPerformances}>
              <i className="fas fa-arrow-left final-arrow"></i>
            </button>
          </div>
          <div className="col-10">
            <div id="card-holder" className="final-card">
              <div id="final-title">
                <h3>Choose your favorite!</h3>
              </div>
              <button id="selection-1" className={this.state.selection1Class} onClick={() => this.selectWinner("selection-1")}>
                <h3 className="selection-text">Performance #1:</h3>
                <h2 className="selection-text">performance one</h2>
              </button>
              <button id="selection-2" className={this.state.selection2Class} onClick={() => this.selectWinner("selection-2")}>
                <h3 className="selection-text">Performance #3:</h3>
                <h2 className="selection-text">performance three</h2>
              </button>
              <button id="selection-3" className={this.state.selection3Class} onClick={() => this.selectWinner("selection-3")}>
                <h3 className="selection-text">Performance #5:</h3>
                <h2 className="selection-text">performance five</h2>
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
  }
}
