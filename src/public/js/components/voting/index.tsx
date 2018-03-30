import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import LoginScreen from "./login-screen";
import VotingScreen from "./voting-screen";
import FinalScreen from "./final-screen";

import Audience, { ApprovalArray } from "../audience/audience";
import Performance, { PerformanceArray } from "../performances/performance";

interface Props {

}
interface State {
  state: string; // can be in four states - loading, login, voting screen, final
  member: Audience;
  performances: PerformanceArray;
}

export default class VotingPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      state: "login",
      member: undefined,
      performances: []
    };

    this.changeState = this.changeState.bind(this);
    this.setMemberState = this.setMemberState.bind(this);
  }

  componentWillMount() {
    axios.get("/performances").then((res) => {
      this.setState({performances: res.data.response});
    }).catch((err) => {
      console.log(err);
    });
  }

  // ability to change screen from other screens.
  changeState(state: string) {
    this.setState({state: state});
  }

  setMemberState(admin: boolean, id: number, username: string, performances: ApprovalArray) {
    const member: Audience = {
      id: id || 0,
      admin: admin || false,
      username: username,
      performances: performances
    };

    this.setState({member: member});
    // TODO: send update to DB!
    axios.post("/audiences/update", {
      user: member
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    const currentState = this.state.state;
    let renderElement = undefined;

    switch (currentState) {
      case "loading":
        renderElement = <i className="fas fa-spinner fa-spin fa-5x"></i>;
        break;
      case "login":
        renderElement = <LoginScreen changeState={this.changeState} setMemberState={this.setMemberState}/>;
        break;
      case "voting":
        renderElement = <VotingScreen changeState={this.changeState} setMemberState={this.setMemberState} user={this.state.member} performances={this.state.performances}/>;
        break;
      case "final":
        renderElement = <FinalScreen changeState={this.changeState} user={this.state.member} />;
        break;
    }

    return (
      renderElement
    );
  }
}
