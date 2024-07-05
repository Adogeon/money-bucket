import { FormEvent, useState } from "react";
import TextField from "./TextField";

type LoginDAO = {
  username: string;
  password: string;
};

interface LoginFormProps {
  submitLogin: (input: LoginDAO) => void;
}

const LoginForm = (props: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitLogin({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField name="username" updateCb={(value) => setUsername(value)} />
      <TextField
        name="password"
        type="password"
        updateCb={(value) => setPassword(value)}
      />
      <div>
        <button type="submit">Log In</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default LoginForm;
