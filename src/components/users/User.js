import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getRepos(this.props.match.params.login);
  }

  render() {
    const {
      login,
      avatar_url,
      html_url,
      name,
      company,
      blog,
      location,
      hireable,
      bio,
      followers,
      following,
      gists,
      public_repos
    } = this.props.user;

    const { loading, repos } = this.props;

    return (
      <Fragment>
        {loading ? (
          <Spinner />
        ) : (
          <Fragment>
            <Link to="/" className="btn btn-light">
              Back to search
            </Link>
            Hireable:{" "}
            {hireable ? (
              <i className="fas fa-check text-success"></i>
            ) : (
              <i className="fas fa-times-circle text-danger"></i>
            )}
            <div className="card grid-2">
              <div className="all-center">
                <img
                  src={avatar_url}
                  alt={login}
                  className="round-img"
                  style={{ width: "150px" }}
                />
                <h1>{name}</h1>
                <p>Location: {location}</p>
              </div>
              <div className="all-center">
                {bio && (
                  <Fragment>
                    <h3>Bio</h3>
                    <p>{bio}</p>
                  </Fragment>
                )}
                <a href={html_url} className="btn btn-dark my-y">
                  Visit Github Profile
                </a>
                <ul>
                  <li>
                    {login && (
                      <Fragment>
                        <strong>Username:</strong> {login}
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {company && (
                      <Fragment>
                        <strong>Company:</strong> {company}
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {blog && (
                      <Fragment>
                        <strong>Website:</strong> {blog}
                      </Fragment>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div className="card text-center">
              <div className="badge badge-primary">Followers: {followers}</div>
              <div className="badge badge-success">Following: {following}</div>
              <div className="badge badge-light">
                Public Repos: {public_repos || "None"}
              </div>
              <div className="badge badge-dark">Gists: {gists || "None"}</div>
            </div>
            {repos && (
              <div>
                <h2>Repos:</h2>
                <Repos repos={repos} />
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  repos: PropTypes.array.isRequired
};

export default User;
