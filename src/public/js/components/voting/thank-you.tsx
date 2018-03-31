import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import Audience from "../audience/audience";

interface Props {
  changeState(state: string): void;
  user: Audience;
}

export default class VotingScreen extends React.Component<Props> {

  render() {
    return(
        <div>
          <div className="row align-items-center">
            <div className="col-1 arrow-left">
            </div>
            <div className="col-10">
              <div id="card-holder" className="final-card-early">
                <div id="final-title">
                  <h3>Thank you for coming to K-Expo 2018!</h3>
                  <h3>We will announce the winner shortly.</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
}
