import * as React from "react";
import * as ReactDOM from "react-dom";

import axios from "axios";

interface State {
  id: number;
  order: number;
  name: string;
  approval: number;
  enabled: boolean;
  enableVoting: boolean;
}

interface Props {
  key: number;
  dbID: number;
  counter: number;
  name: string;
  approval: number;
  enabled: boolean;
  delete(id: number): void;
  enableVoting: boolean;
}

export default class PerfRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      id: props.dbID,
      order: props.counter,
      name: props.name,
      approval: parseInt(props.approval),
      enabled: props.enabled,
      enableVoting: props.enableVoting
    };
    this.deleteMember = this.deleteMember.bind(this);
    this.toggleVoting = this.toggleVoting.bind(this);
  }

  deleteMember(evt: any) {
    console.log(evt);
    console.log(this.state.id);
    this.props.delete(this.state.id);
  }

  toggleVoting(evt: any) {
    evt.preventDefault();
    const enabled = (this.state.enabled) ? false : true;
    this.setState({enabled: enabled});
    console.log("toggleVoting");
    axios.post("/performances/update", {
      id: this.state.id,
      enabled: enabled
    }).then((res: Object) => {
      console.log("success!");
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  render() {
    let enabledElement = undefined;
    const enabledElementText = (this.state.enabled) ? "Enabled" : "Disabled";
    const perfEnabled = this.state.enabled;

    // console.log(this.state.enableVoting);
    if (this.state.enableVoting) {
      const labelClassName = (this.state.enabled) ? "btn btn-secondary active" : "btn btn-secondary";
      enabledElement = (
        <div className="btn-group-toggle" data-toggle="buttons">
          <label className={labelClassName} onClick={this.toggleVoting}>
            <input type="checkbox" checked={perfEnabled} /> {enabledElementText}
          </label>
        </div>
      );
    } else {
      enabledElement = enabledElementText;
    }    

    console.log(typeof this.state.approval);
    return (
      <tr>
        <th scope="row">{this.state.order}</th>
        <td>{this.state.name}</td>
        <td>{this.state.approval}</td>
        <td>{enabledElement}</td>
        <td><i className="fa fa-times" onClick={this.deleteMember}/></td>
      </tr>
    );
  }
}