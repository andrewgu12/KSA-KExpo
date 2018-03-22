import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import DisplayCurrentPerformances from "./display-performance";
import InsertAPerformance from "./insert-performance";

interface State {
  competitors: any;
  loading: boolean;
  newPerformance: any;
  counter: number;
}

interface Props {

}

interface Performance {
  name: string;
  id: number;
  approval: number;
  enabled: boolean;
}

export default class EnterCompetitors extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      competitors: [],
      loading:     true,
      newPerformance: {},
      counter: 0
    };
    this.fetchAllPerformances = this.fetchAllPerformances.bind(this);
    this.insertAPerformance   = this.insertAPerformance.bind(this);
    this.deleteAPerformance = this.deleteAPerformance.bind(this);
  }

  componentDidMount() {
    this.fetchAllPerformances();
  }

  insertAPerformance(newPerformance: string) {
    const performances = this.state.competitors;

    axios.post("/performances/enter", {
      name: newPerformance
    }).then((res: Object) => {            
      this.fetchAllPerformances();
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  fetchAllPerformances() {        
    this.setState({loading: true});
    const performances = {};
    axios.get("/performances").then((res: any) => {
      this.setState({competitors: res.data.response, loading: false});      
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  deleteAPerformance(id: number) {
    console.log(id);
    axios.delete("/performances/delete", {
      params: {
        id: id
      }
    }).then((res: any) => {
      this.fetchAllPerformances();
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  render() {    
    const loadingElement = this.state.loading ? (    
      <i className="fas fa-spinner fa-spin fa-5x"></i>   
    ) : (
      <DisplayCurrentPerformances performances={this.state.competitors} delete={this.deleteAPerformance} />
    );

    return(
      <div>
        {loadingElement}
        <InsertAPerformance handleInsert={this.insertAPerformance} />
      </div>
    );
    
    
  }
}
