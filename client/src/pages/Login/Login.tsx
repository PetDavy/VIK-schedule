import { Link } from "react-router-dom";

import Form from "../../components/Form/Form";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";
import { FormField, createFormField } from "../../types/formField";
import {
  startLoggingIn,
  endLoggingIn,
  successLoggingIn,
  failLoggingIn,
  updateEmail,
  updatePassword,
} from "./Login.slice";
import { loadUser } from "../../components/App/App.slice";
import { login } from "../../api/api.user";

import { useStore } from "../../state/storeHooks";

function Login() {
  const [{ user, loggingIn, errors }, dispatch] = useStore(({ login }) => login);

  const fields = getDefaultFormFields();

  function updateFileds(name: string, value: string) {
    if (name === "email") {
      dispatch(updateEmail(value));
    } else if (name === "password") {
      dispatch(updatePassword(value));
    }
  }

  async function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(startLoggingIn());

    try {
      const userData = await login(user);

      if ('messages' in userData) {
        dispatch(failLoggingIn(userData));
      }

      if ('token' in userData) {
        localStorage.setItem('token', userData.token);
        dispatch(loadUser(userData));
        dispatch(successLoggingIn());
      }

    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endLoggingIn());
      
    }
  }

  return (
    <div className="Login">
      Login
      {loggingIn && <p>Logging in...</p>}
      <Form
        fields={fields}
        formObject={user}
        errors={errors}
        buttonText="Login"
        onChange={updateFileds}
        onSubmit={signIn}
      />
      <GoogleAuth />
      <Link to="/register">Sign up</Link>
    </div>
  );
}

function getDefaultFormFields(): FormField[] {
  return [
    createFormField({
      name: "email",
      placeholder: "Email",
      type: "email",
      required: true,
    }),
    createFormField({
      name: "password",
      placeholder: "Password",
      type: "password",
      required: true,
    }),
  ];
}

export default Login;
