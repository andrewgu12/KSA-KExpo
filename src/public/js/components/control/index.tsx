import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import DisplayCurrentPerformances from "../performances/display-performance";
import DisplayAllAudienceMembers from "../audience/display-audience";
import Performance, { PerformanceArray } from "../performances/performance";
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

    const getPermissions = () => {
      return axios.get("/permissions/performances");
    };

    const getAudience = () => {
      return axios.get("/audiences");
    };

    // map performance permission to performance
    const mapPerfToPerm = (perfs: any, perms: any) => {
      perfs.forEach((perf: Performance) => {
        const checkName = perf.imagename.split(".")[0];
        console.log(checkName);
        perms.forEach((perm: any) => {
          if (perm.name === checkName) {
            perf.enabled = perm.enabled;
          }
        });
        // perf.approval = parseInt(perf.approval);
      });
      return perfs;
    };

    axios.all([getPerformance(), getPermissions(), getAudience()])
      .then(axios.spread((perfs, perms, auds) => {
        const performances: PerformanceArray = mapPerfToPerm(perfs.data.response, perms.data.response);

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
          <DisplayCurrentPerformances enableVoting={true} performances={this.state.performances} delete={undefined} hideEnableColumn={false} />
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
