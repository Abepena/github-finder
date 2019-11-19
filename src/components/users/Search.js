import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ showClear, clearUsers, searchUsers, setAlert }) => {
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter something before searching", "danger");
    } else {
      searchUsers(text);
      setText("");
    }
  };

  return (
    <form onSubmit={onSubmit} action="" className="form">
      <input
        type="text"
        name="text"
        placeholder="Search Users..."
        value={text}
        onChange={onChange}
      />
      <input type="submit" className="btn btn-block btn-dark" />
      {showClear && (
        <button className="btn btn-block btn-light" onClick={clearUsers}>
          Clear
        </button>
      )}
    </form>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
