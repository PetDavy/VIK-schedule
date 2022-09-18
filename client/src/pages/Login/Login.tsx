import Form from "../../components/Form/Form";
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
import { login } from "../../api/api";

import { useStore } from "../../state/storeHooks";

function Login() {
  const [{ user, errors }, dispatch] = useStore(({ login }) => login);

  const fields: FormField[] = [
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
      const userData = await login(user.email, user.password);

      if ('errors' in userData) {
        dispatch(failLoggingIn(userData.errors));
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
    <div>
      Login
      <Form
        fields={fields}
        formObject={user}
        errors={errors}
        buttonText="Login"
        onChange={updateFileds}
        onSubmit={signIn}
      />
    </div>
  );
}

export default Login;
