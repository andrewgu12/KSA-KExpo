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
}

export default class FinalScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      performances: [],
      voteEnabled: false
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
          </div>
          <div className="col-10">
            <div id="card-holder">
              <div id="final-title">
                <h3>Choose your favorite!</h3>
              </div>
              <div id="selection-1" className="final-selection">
                <h3>Performance #1:</h3>
                <h2>performance one</h2>
              </div>
              <div id="selection-2" className="final-selection">
                <h3>Performance #1:</h3>
                <h2>performance one</h2>
              </div>
              <div id="selection-3" className="final-selection">
                <h3>Performance #1:</h3>
                <h2>performance one</h2>
              </div>
              <button type="submit" className="btn btn-primary" onClick={this.submitVote}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
