import React, { useState } from "react";
import { addUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [err, setErr] = useState("");
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //here we won't use the useSelector hook because we are sending the data from the frontend and storing it in the backend when the "Add User" button is clicked an event is dispatched this event is consumed by the reducer. Reducers is a pure function that takes two value 1.initialState and 2.Actions and performs some task like here it is creating an user when button is clicked and naviagte to home page i.e., "Users.js" and all the reducers are stored inside a single "store" i.e., in store.js.If we want the state to be displayed from the store then we use the useSelector() hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validation = () => {
    if (!name || !email || !age) {
      setErr("Please enter all the fields");
      return false;
    }
    if (!regex.test(email)) {
      setErr("Please enter a valid email");
      return false;
    }
    if (!age) {
      setErr("Please enter the age");
      return false;
    }
    setErr(<p style={{ color: "green" }}>"{name}"" is successfully added</p>);
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isvalid = validation();
    if (!isvalid) {
      return;
    } else {
      axios
        .post("http://localhost:3001/create", { name, email, age })
        .then((response) => {
          dispatch(addUser(response.data));
          setTimeout(() => {
            navigate("/");
          }, 2000);

          console.log(response.data);
        })
        .catch((error) => console.log("Error", error.message));
    }
    setName("");
    setEmail("");
    setAge("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handleSubmit} autocomplete="off"  novalidate>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
             
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
             
            />
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter Age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            
            />
          </div>
          {err && <p style={{ color: "red" }}>{err}</p>}
          <button className="btn btn-primary">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
