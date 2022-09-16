import Form from "../../components/Form/Form";
import { FormField, createFormField } from "../../types/formField";
import { updateEmail, updatePassword } from "./Login.slice";

import { useStore } from '../../state/storeHooks';

function Login() {
  const [{user}, dispatch] = useStore(({ login }) => login);

  const fields: FormField[] = [
    createFormField({name: 'email', placeholder: 'Email', type: 'email', required: true}),
    createFormField({name: 'password', placeholder: 'Password', type: 'password', required: true}),
  ]

  function updateFileds(name: string, value: string) {
    if (name === 'email') {
      dispatch(updateEmail(value));
    } else if (name === 'password') {
      dispatch(updatePassword(value));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log('submit');
  }

  return (
    <div>
      Login
      <Form
        fields={fields}
        formObject={user}
        buttonText="Login"
        onChange={updateFileds}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default Login;