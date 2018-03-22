import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import DisplayCurrentPerformances from "../performances/display-performance";
import DisplayAllAudienceMembers from "../audience/display-audience";
import { PerformanceArray } from "../performances/performance";
import Audience, { AudienceArray } from "../audience/audience";

interface Props {

}

interface State {
  performances: PerformanceArray;
  loading: boolean;
  audiences: AudienceArray;
}

export default class ControlPanel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      performances: [],
      loading: true,
      audiences: []
    };

    this.fetchAllInformation = this.fetchAllInformation.bind(this);
  }

  componentDidMount() {
    this.fetchAllInformation();    
  }

  fetchAllInformation() {
    this.setState({loading: true});
    const getPerformance = () => {
      return axios.get("/performances");
    };

    const getAudience = () => {
      return axios.get("/audiences");
    };

    axios.all([getPerformance(), getAudience()])
      .then(axios.spread((perfs, auds) => {
        const performances: PerformanceArray = perfs.data.response;
        performances.map((perf: any) => {
          perf.approval = parseInt(perf.approval);
        });

        const audiences: AudienceArray = auds.data.response;
        this.setState({performances: performances, audiences: audiences, loading: false});        
      })).catch((err: Error) => {
        console.log(err);
      });
  }

  render() {
    const loadingElement = this.state.loading ? (
      <i className="fas fa-spinner fa-spin fa-5x"></i>
    ) : (
        <div>
          <DisplayCurrentPerformances enableVoting={true} performances={this.state.performances} delete={undefined} />
          <DisplayAllAudienceMembers audiences={this.state.audiences} perfNumber={this.state.performances.length} />
        </div>
      );

    return (
      <div>
        {loadingElement}        
      </div>
    );
  }
}
