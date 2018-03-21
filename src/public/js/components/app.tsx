import * as React from "react";
import * as ReactDOM from "react-dom";
import { Switch, Route } from "react-router-dom";
import AdminPanel from "./admin/index";

export default class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route path="/results" component={AdminPanel} />
          {/* <Route path="/" */}
        </Switch>
      </div>
    );
  }
}
