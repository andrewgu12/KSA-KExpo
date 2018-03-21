import React     = require("react");
import ReactDOM  = require("react-dom");
const { Switch, Route } = require("react-router");
import AdminPanel from "./admin/index";

export default class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <AdminPanel />
        </Switch>
      </div>
    );
  }
}
