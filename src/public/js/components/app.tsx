import React     = require("react");
import ReactDOM  = require("react-dom");
const { Switch, Route } = require("react-router-dom");
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
