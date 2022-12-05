import { useState } from "react";
import ListUser from "./components/listUser";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <div className="App">
      <RegisterForm />
      <ListUser />
    </div>
  );
}

export default App;
