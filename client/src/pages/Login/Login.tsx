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
import {
  setStudents,
  startLoad as startStudentLoad,
} from "../../components/StudentsList/StudentsList.slice";
import { loadUser } from "../../components/App/App.slice";
import { login } from "../../api/api.user";
import { loadStudents } from "../../api/api.student";

import { useStore } from "../../state/storeHooks";

import '../../assets/styles/login.scss';

function Login() {
  const [{ user, loggingIn, errors }, dispatch] = useStore(
    ({ login }) => login
  );

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

    if (loggingIn) {
      return;
    }

    dispatch(startLoggingIn());

    try {
      const userData = await login(user);

      if ("messages" in userData) {
        dispatch(failLoggingIn(userData));
      }

      if ("token" in userData) {
        const { token } = userData;
        localStorage.setItem("token", token);
        dispatch(loadUser(userData));
        dispatch(successLoggingIn());
        loadUserStudents(token);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endLoggingIn());
    }
  }

  async function loadUserStudents(token: string) {
    dispatch(startStudentLoad());
    dispatch(setStudents(await loadStudents(token)));
  }

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">
          Log in
        </h1>
        <Form
          fields={fields}
          formObject={user}
          errors={errors}
          buttonText="Login"
          onChange={updateFileds}
          onSubmit={signIn}
          isLoading={loggingIn}
        />
        <GoogleAuth />
        <Link to="/register">Sign up</Link>
      </div>
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
