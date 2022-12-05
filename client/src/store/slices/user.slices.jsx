import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const URL = "http://localhost:4000/api/v1/users";

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      return user;
    },
  },
});

export const getUsersThunk = () => (dispatch) => {
  return axios
    .get(URL)
    .then((res) => {
      dispatch(setUser(res.data));
      swal("User has been update", "", "success");
    })
    .catch((error) => {
      swal(`${error.response.data.message}`, "", "error");
    });
};

export const createNewUserThunk = (newUser) => (dispatch) => {
  return axios
    .post(`${URL}`, newUser)
    .then((res) => {
      dispatch(getUsersThunk());
      swal("User has been registered in data base", "", "success");
    })
    .catch((error) => swal(`${error.response.data.message}`, "", "error"));
};

export const updateUserThunk = (user, id) => (dispatch) => {
  return axios
    .patch(`${URL}/${id}`, user)
    .then((res) => {
      dispatch(getUsersThunk());
      swal("User has been update", "", "success");
    })
    .catch((error) => {
      dispatch(setUser([]));
      swal(`${error.response.data.message}`, "", "error");
    });
};

export const deleteUserThunk = (id) => (dispatch) => {
  return axios
    .delete(`${URL}/${id}`)
    .then((res) => {
      dispatch(getUsersThunk());
      swal("User has been delete", "", "success");
    })
    .catch((error) => {
      dispatch(setUser([]));
      swal(`${error.response.data.message}`, "", "error");
    });
};

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
