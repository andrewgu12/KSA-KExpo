import * as React from "react";
import * as ReactDOM from "react-dom";

import axios from "axios";
import Permission from "../permission";
import Audience, { ApprovalArray } from "../audience/audience";

interface Props {
  changeState(state: string): void;
  setMemberState(admin: boolean, id: number, username: string, votes: ApprovalArray): void;
}

interface State {
  username: string;
  errorMessage: string;
}

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      errorMessage: undefined
    };

    this.handleChange      = this.handleChange.bind(this);
    this.handleSubmit      = this.handleSubmit.bind(this);
    this.checkLoginAllowed = this.checkLoginAllowed.bind(this);
    this.checkExistence    = this.checkExistence.bind(this);
    this.createUser        = this.createUser.bind(this);
  }

  componentWillUpdate(newProps: Props, newState: State) {
    if (newState.errorMessage !== undefined) {
      document.getElementById("username").classList.add("is-invalid");
    }
  }

  handleChange(e: any) {
    this.setState({username: e.target.value});
  }

  // Ensure we're still allowed to create new users
  checkLoginAllowed() {
    return axios.get("/permissions/check-flag?id=create_user");
  }

  // Check to see if user already exists in the DB
  checkExistence() {
    return axios.get(`/audiences/user-info?username=${this.state.username}`);
  }

  // return a promise to creating an user
  createUser() {
    return axios.post("/audiences/enter", {
      username: this.state.username
    });
  }

  handleSubmit(e: any) {
    e.preventDefault(); // handle UI change ourselves
    this.props.changeState("loading");
    // first check to see if we're allowed to create users and if user already exists
    axios.all([this.checkLoginAllowed(), this.checkExistence()])
      .then(axios.spread((permission, userInfo) => {
        if (permission.data.value) { // allowed to make accounts
          if (userInfo.data.code == 404) { // user not found
            const userPromise = this.createUser();

            userPromise.then((res) => {
              if (res.data.code == 200) { // ok!
                this.props.setMemberState(false, 0, this.state.username, []);
                this.props.changeState("voting");
              } else {
                console.log("error creating user!\n");
              }
            }).catch((err) => {
              console.log("error creating user!\n");
            });
          } else if (userInfo.data.code == 200) { // user found, find another unique username
            this.setState({errorMessage: "Sorry! This username has already been taken."});
            this.props.changeState("login");
          }
        } else {
          if (userInfo.data.code == 200) { // userdata was found, so go ahead and load it in
            // this.props.setMemberState(userInfo.)
            const user = userInfo.data.response;
            console.log(userInfo);
            this.props.setMemberState(user.admin, user.id, user.username, user.performances);
            this.props.changeState("voting");
          } else {
            this.setState({errorMessage: "Sorry! We've closed sign ups to vote. Please enjoy the event!"});
            this.props.changeState("login");
          }
        }
      })).catch((err) => {
        console.log(err);
      });
  }

  render() {
    return(
      <div>
        <div className="row align-items-center">
          <div className="col justify-content-center">
            <form id="login-form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" onChange={this.handleChange} placeholder="Enter name" />
                <div className="invalid-feedback">{this.state.errorMessage}</div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
