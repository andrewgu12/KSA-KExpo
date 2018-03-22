import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import DisplayCurrentPerformances from "../performances/display-performance";
import InsertAPerformance from "../performances/insert-performance";

import Performance, { PerformanceArray } from "../performances/performance";

interface State {
  competitors: PerformanceArray;
  loading: boolean;
  newPerformance: any;
  counter: number;
}

interface Props {

}

export default class EnterCompetitors extends React.Component<Props, State> {
  constructor(props: Props) {
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
      const performances = res.data.response;
      performances.map((perf: any) => {
        perf.approval = parseInt(perf.approval);
      });
      this.setState({competitors: res.data.response, loading: false});      
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  deleteAPerformance(id: number) {    
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
      <DisplayCurrentPerformances enableVoting={false} performances={this.state.competitors} delete={this.deleteAPerformance} />
    );

    return(
      <div>
        {loadingElement}
        <InsertAPerformance handleInsert={this.insertAPerformance} />
      </div>
    );
    
    
  }
}
