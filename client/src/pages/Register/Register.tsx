import { Link } from "react-router-dom";

import { useStore } from "../../state/storeHooks";
import { FormField, createFormField } from "../../types/formField";
import {
  startRegistering,
  endRegistering,
  successRegister,
  failRegister,
  updateUsername,
  updateEmail,
  updatePassword
} from "./Register.slice";

import Form from "../../components/Form/Form";
import GoogleAuth from "../../components/GoogleAuth/GoogleAuth";

import { registerUser } from "../../api/api.user";
import { loadUser } from "../../components/App/App.slice";

function Register() {
  const [{user, registering, errors}, dispatch] = useStore(({register}) => register);

  const fields = getDefaultFormFields();

  function updateFileds(name: string, value: string) {
    if (name === "username") {
      dispatch(updateUsername(value))
    } else if (name === "email") {
      dispatch(updateEmail(value));
    } else if (name === "password") {
      dispatch(updatePassword(value));
    }
  }

  async function register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(startRegistering());
    
    try {
      const userData = await registerUser(user);

      if ('messages' in userData) {
        dispatch(failRegister(userData));
      }

      if ('token' in userData) {
        localStorage.setItem('token', userData.token);
        dispatch(loadUser(userData));
        dispatch(successRegister());
      }

    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endRegistering());
    }
  }

  return (
    <div className="Register">
      Sign Up
      {registering && <p>Signing up...</p>}
      <Form 
        fields={fields}
        formObject={user}
        errors={errors}
        buttonText="Sign up"
        onChange={updateFileds}
        onSubmit={register} 
      />
      <GoogleAuth />
      <Link to="/login">Log in</Link>
    </div>
  );
}

function getDefaultFormFields(): FormField[] {
  return [
    createFormField({
      name: "username",
      placeholder: "Username",
      required: true,
    }),
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
    })
  ];
}

export default Register;