import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from 'prop-types'; 

const Users = ({ loading, users}) => {
  return (
    <div style={loading ? {} :userStyle}>
		{loading ? <Spinner/> : 
			users.map(user => (
					<UserItem key={user.id} user={user} />
				))
		}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

Users.propTypes = {
	users: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	getUser:PropTypes.func.isRequired,
}

export default Users;
