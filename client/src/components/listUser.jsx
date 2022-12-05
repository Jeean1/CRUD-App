import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  deleteUserThunk,
  setUser,
  updateUserThunk,
} from "../store/slices/user.slices";

const ListUser = () => {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const globalUser = useSelector((state) => state.user);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/users")
      .then((res) => setUsers(res.data.data.users));
  }, [globalUser]);

  console.log(globalUser);

  const selectedUser = (user) => {
    console.log(user);
    dispatch(setUser(user));
  };

  const deleteUser = (id) => {
    console.log(id);
    dispatch(deleteUserThunk(id));
  };

  return (
    <div className="listuser_container">
      <h3 style={{ textAlign: "center", paddingBottom: "3%" }}>
        Users information
      </h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nro ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.surname}</td>
              <td>{user.gender}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info me-3"
                  onClick={() => {
                    selectedUser(user), (window.location.href = "#");
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ListUser;
