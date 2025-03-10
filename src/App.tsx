import React from "react";
import Login from "./components/Login";
import HelloUser from "./components/HelloUser";

const App: React.FC = () => {
  return (
      <div>
        <h1>Redux with OAuth2 Authentication</h1>
        <HelloUser />
        <Login />
      </div>
  );
};

export default App;
