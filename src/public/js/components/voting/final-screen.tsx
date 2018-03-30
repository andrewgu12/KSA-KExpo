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
        <p> Final Voting Screen! </p>        
      </div>
    );
  }
}
