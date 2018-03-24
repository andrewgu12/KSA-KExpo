import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import AdminPanel from "./admin/index"; // sample, not right - TODO

// Control Panel components
import ControlPanel from "./control/index";
import EnterCompetitors from "./control/enter";

// Results Panel components
import ResultsPane from "./results/results-pane";


export default class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>          
          <Route path="/control/enter" component={EnterCompetitors} />
          <Route path="/control" component={ControlPanel}/>
          <Route path="/results" component={ResultsPane} />
        </Switch>
      </div>
    );
  }
}
