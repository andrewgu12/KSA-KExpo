import * as React from "react";
import * as ReactDOM from "react-dom";
import * as axios from "axios";

export default class EnterCompetitors extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      competitors: [],
      loading:     true
    };
    this.fetchAllPerformances = this.fetchAllPerformances.bind(this);
    this.insertAPerformance   = this.insertAPerformance.bind(this);
  }

  componentDidMount() {
    this.fetchAllPerformances();
  }

  insertAPerformance() {

  }

  fetchAllPerformances() {
    const options = {
      url:    `/performances`,
      method: "get",
      responseType: "json"
    };
        
    axios(options).then((res: Object) => {
      this.setState({competitors: res, loading: false});
      console.log(res);
    }).catch((err: Object) => {
      console.log(err);
    });
  }

  render() {    
    // still getting information
    if (this.state.loading) {
      return(
        <i className="fas fa-spinner fa-spin fa-5x"></i>
      );
    } else {
      return(
        <p>Competitors returned!</p>
      );
    }    
  }
}
