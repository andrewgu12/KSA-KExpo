import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import AdminPanel from "./admin/index"; // sample, not right - TODO

// Control Panel components
import ControlPanel from "./control/index";
import EnterCompetitors from "./control/enter";

// Results Panel components
import ResultsPane from "./results/results-pane";

// Voting Panel - Main Panel
import VotingPanel from "./voting/index";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/magicalbeans/enter" component={EnterCompetitors} />
          <Route path="/magicalbeans" component={ControlPanel}/>
          <Route path="/magicalbeans-results" component={ResultsPane} />
          <Route path="/" component={VotingPanel} />
        </Switch>
      </div>
    );
  }
}
