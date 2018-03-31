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
    this.createPermissionsFlag = this.createPermissionsFlag.bind(this);
  }

  componentDidMount() {
    this.fetchAllPerformances();
  }

  createPermissionsFlag(performanceName: string) {
    axios.post("/permissions/insert", {
      name: performanceName
    }).then((res: any) => {
      return;
    }).catch((err: Error) => {
      console.log(err);
      return;
    });
  }

  insertAPerformance(newPerformance: string) {
    const performances = this.state.competitors;

    axios.post("/performances/enter", {
      name: newPerformance
    }).then((res: Object) => {
      this.createPermissionsFlag(newPerformance);
      this.fetchAllPerformances();
    }).catch((err: Error) => {
      console.log(err);
    });
  }

  fetchAllPerformances() {
    this.setState({loading: true});
    let performances = [];

    const getPerformances = () => {
      return axios.get("/performances");
    };

    const getPermissions = () => {
      return axios.get("/permissions/performances");
    };

    // map performance permission to performance
    const mapPerfToPerm = (perfs: any, perms: any) => {
      perfs.forEach((perf: any) => {
        const checkName = perf.imagename.split(".")[0];
        perms.forEach((perm: any) => {
          if (perm.name === checkName) {
            perf.enabled = perm.enabled;
          }
        });
        perf.approval = parseInt(perf.approval);
      });
      return perfs;
    };


    axios.all([getPerformances(), getPermissions()])
      .then(axios.spread((perfs, perms) => {
        performances = mapPerfToPerm(perfs.data.response, perms.data.response);
        this.setState({competitors: performances, loading: false});
      })).catch((err: Error) => {
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
      <DisplayCurrentPerformances enableVoting={false} performances={this.state.competitors} delete={this.deleteAPerformance} hideEnableColumn={false} />
    );

    return(
      <div>
        {loadingElement}
        <InsertAPerformance handleInsert={this.insertAPerformance} />
      </div>
    );


  }
}
