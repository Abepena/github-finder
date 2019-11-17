import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import Alert from "./components/users/Alert";
import About from "./components/pages/About";
import User from "./components/users/User";

import axios from "axios";

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  };

  setAlert = alert => {
    alert(alert);
  };

  //Search Github users from searchbar query
  searchUsers = async text => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret_key=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  //Get single github user
  getUser = async username => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret_key=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  // Grab repos
  getRepos = async username => {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&secret_key=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data });
  };

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => this.setState({ alert: null }), 4000);
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  async componentDidMount() {
    // this.setState({ loading: true });
    // const res = await axios.get(
    //   `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret_key=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    // );
    // this.setState({ users: res.data, loading: false });
  }

  render() {
    const { user, loading, repos } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      setAlert={this.setAlert}
                      showClear={this.state.users.length > 0 ? true : false}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                      getUser={this.getUser}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getRepos={this.getRepos}
                    user={user}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
