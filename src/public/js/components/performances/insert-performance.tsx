import * as React from "react";
import * as ReactDOM from "react-dom";

interface Props {
  handleInsert(newPerformance: string): void;
}
interface State {
  name: string;
}

export default class InsertAPerformance extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }

  handleInsert(event: any) {
    event.preventDefault();
    this.props.handleInsert(this.state.name);
    this.setState({name: ""});
  }

  handleChange(e: any) {
    this.setState({name: e.target.value});
  }
  render() {
    return(
      <form id="insert-perf-form" onSubmit={this.handleInsert}>
        <div className="form-group">
          <label htmlFor="perfName">Performance Name</label>
          <input type="text" className="form-control" id="perfName" value={this.state.name} onChange={this.handleChange} placeholder="Enter name" />   
          <button type="submit" className="btn btn-primary">Submit</button>         
        </div>
      </form>
    );
  }
}
