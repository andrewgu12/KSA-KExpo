import * as React from "react";
import * as ReactDOM from "react-dom";
import axios from "axios";

import AudRow from "./aud-row";
import Audience, { AudienceArray } from "./audience";

interface Props {
  audiences: AudienceArray;
  perfNumber: number;
}

interface State {
  audiences: AudienceArray;
  perfNumber: number;
}

export default class DisplayAllAudienceMembers extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      audiences: props.audiences,
      perfNumber: props.perfNumber
    };
  }

  render() {

    const perfHeadElements = [];
    for (let i = 0; i < this.props.perfNumber; i++) {
      perfHeadElements.push( <th scope="col">Performance #{i + 1}</th> );
    }

    const audRows = this.state.audiences.map((aud: Audience) => {
      return <AudRow key = {aud.id} dbID = {aud.id} name = {aud.username} performances = {aud.performances} perfNumber = {this.state.perfNumber}/>;
    });

    return (
      <table className="audience-table table">
        <thead>
          <th scope="col" style={{display: "none"}}>ID</th>
          <th scope="col">Username</th>
          {perfHeadElements}
        </thead>
        <tbody>
          {audRows}
        </tbody>
      </table>
    );
  }
}