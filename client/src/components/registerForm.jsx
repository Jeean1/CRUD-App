import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewUserThunk,
  updateUserThunk,
} from "../store/slices/user.slices";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const userSelected = useSelector((state) => state.user);

  const [userId, setUserId] = useState(0);
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [gender, setGender] = useState("");

  const reset = () => {
    setUserId("");
    setName("");
    setSurName("");
    setGender("");
  };

  useEffect(() => {
    if (userSelected !== null) {
      setUserId(userSelected.userId);
      setName(userSelected.name);
      setSurName(userSelected.surname);
      setGender(userSelected.gender);
    }
  }, [userSelected]);

  const submit = (e) => {
    e.preventDefault();

    let newUser = {
      userId: Number(userId),
      name,
      surname: surName,
      gender,
    };

    if (userSelected.id !== undefined) {
      dispatch(updateUserThunk(newUser, userSelected.id));
      reset();
    } else {
      dispatch(createNewUserThunk(newUser));
      reset();
    }
  };

  return (
    <div className="register_container">
      <h3 style={{ textAlign: "center", paddingBottom: "3%" }}>
        register form
      </h3>
      <Form onSubmit={submit}>
        <Form.Group className="mb-3" controlId="userId">
          <Form.Label>Id nro</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your id nro"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="surname">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your surname"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicSelect" className="my-3">
          <Form.Label>Select Gender</Form.Label>
          <Form.Control
            as="select"
            value={gender}
            onChange={(e) => {
              console.log("e.target.value", e.target.value);
              setGender(e.target.value);
            }}
          >
            <option value="">select...</option>
            <option value="m">masculine</option>
            <option value="f">femenine</option>
            <option value="other">Other</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
