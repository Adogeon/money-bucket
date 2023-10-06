import React, { useState } from "react";
import { fetchUserLoginToken } from "../../API/auth/auth.api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const token = await fetchUserLoginToken(username, password);
    console.log(token);
    // navigate to homepage;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

const LoginPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
