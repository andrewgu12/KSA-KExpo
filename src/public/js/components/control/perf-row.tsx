import * as React from "react";
import * as ReactDOM from "react-dom";

interface State {
  id: number;
  order: number;
  name: string;
  approval: number;
  enabled: boolean;
}

interface Props {
  key: number;
  dbID: number;
  counter: number;
  name: string;
  approval: string;
  enabled: boolean;
  delete(id: number): void;
}

export default class PerfRow extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(props);
    this.state = {
      id: props.dbID,
      order: props.counter,
      name: props.name,
      approval: parseInt(props.approval),
      enabled: props.enabled  
    };
    this.deleteMember = this.deleteMember.bind(this);
  }

  deleteMember(evt: any) {
    console.log(evt);
    console.log(this.state.id);
    this.props.delete(this.state.id);
  }

  render() {
    const enabled = (this.state.enabled) ? "Y" : "N";
    return (
      <tr>
        <th scope="row">{this.state.order}</th>
        <td>{this.state.name}</td>
        <td>{this.state.approval}</td>
        <td>{enabled}</td>
        <td><i className="fa fa-times" onClick={this.deleteMember}/></td>
      </tr>
    );
  }
}