import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { getUser, deleteUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users.users); //here the first "users" is the name that we have given to the reducer in the "store.js" file and the second "users" is the name that we have given in the initialState
  //here we are using the useSelector() because we are getting the data from the backend i.e., sending request to the backend and storing it in the frontend i.e., getting the response from the backend.
  //here there is no buuton (or) the form submit so we used the useEffect() hook so inside this hook we have used the "axios.get" method to get the data from the backend on an initial render
  //when the request is send to the backend, then backend send the response to frontend, inside the useEffect() we have used the "dispatch()" method that calls the "getUser()" function which is a reducer inside the "userSlice.js" and the initialState is also stored inside the "userSlice.js". this reducers are stored inside a store i.e., "store.js". to display this state in the browser we use the useSelector() hook

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001"); //here the server is running on port: 3001 so based on the backend server port we write the url i.e., http://localhost:3001. If suppose the backend server is running on the port 5000 then the url should be like "http://localhost:5000"
        dispatch(getUser(response.data));
        console.log(response.data);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteuser/"+id)
      .then((res) => {
        dispatch(deleteUser({ id }))
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success btn-sm">
          Add +
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <Link
                    to={`/edit/${user.id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-sm btn-danger m-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
