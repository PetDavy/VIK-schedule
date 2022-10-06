import { useStore, useStoreWithInit } from "../../state/storeHooks";
import { getImgTextFromName } from "../../utils/user";
import { FormField, createFormField } from "../../types/formField";

import {
  initSetup,
  startUpdating,
  endUpdating,
  updateUsername,
  updateEmail,
  updatePicture,
  failUpdate,
  successUpdate,
  updatePassword,
  updateNewPassword
} from "./Profile.slice";
import { loadUser, endLoad } from "../../components/App/App.slice";
import { updateUser, getUser } from "../../api/api.user";

import Form from "../../components/Form/Form";

function Profile() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ profile, errors }, dispatch] = useStoreWithInit(({ profile }) => profile, setInitFieldsValues);

  const infoFields = getDefaultInfoFormFields();
  const passwordFields = getDefaultPasswordFormFields();

  function setInitFieldsValues() {
    if (user) {
      dispatch(initSetup(user));
    }
  }

  function updateInfoFields(name: string, value: string) {
    if (name === "username") {
      dispatch(updateUsername(value));
    } else if (name === "email") {
      dispatch(updateEmail(value));
    } else if (name === "picture") {
      dispatch(updatePicture(value));
    }
  }

  function updatePasswordFields(name: string, value: string) {
    if (name === "password") {
      dispatch(updatePassword(value));
    }

    if (name === "new_password") {
      dispatch(updateNewPassword(value));
    }
  }

  async function updateProfileInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      return;
    }

    dispatch(startUpdating());

    const updatingFields = {
      ...(profile.username !== user.username && { username: profile.username }),
      ...(profile.email !== user.email && { email: profile.email }),
      ...(profile.picture !== user.picture && { picture: profile.picture }),
    };

    try {
      const updatedUser = await updateUser(updatingFields, user.token);

      if ("messages" in updatedUser) {
        dispatch(failUpdate(updatedUser));
      }

      if ("token" in updatedUser) {
        dispatch(successUpdate());
      }

      dispatch(loadUser(await getUser(user.token)));
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endUpdating());
      dispatch(endLoad());
    }
  }

  async function updateProfilePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      return;
    }

    dispatch(startUpdating());

    try {
      const updatedUser = await updateUser({ password: profile.password, new_password: profile.new_password }, user.token);

      if ("messages" in updatedUser) {
        dispatch(failUpdate(updatedUser));
      }

      if ("token" in updatedUser) {
        dispatch(successUpdate());
      }

      dispatch(loadUser(await getUser(user.token)));
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endUpdating());
      dispatch(endLoad());
    }
  }

  function getAvatar(): JSX.Element | undefined {
    if (user && user.picture) {
      return <img src={user.picture} alt={user.username} width="150" height="180" />;
    }

    if (user && !user.picture) {
      return (
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            background: "purple",
            color: "#fff",
            width: "80px",
            height: "80px",
          }}
        >
          {getImgTextFromName(user.username)}
        </span>
      );
    }
  }

  return (
    <div className="Profile">
      {getAvatar()}
      <p>
        {" "}
        <i>Username: </i>
        {user?.username}
      </p>
      <p>
        {" "}
        <i>Email: </i>
        {user?.email}
      </p>

      {user && !user.is_google_auth && (
        <>
          <h3>Update info</h3>
          <Form
            fields={infoFields}
            formObject={profile}
            errors={errors}
            buttonText="Update"
            onChange={updateInfoFields}
            onSubmit={updateProfileInfo}
          />
          <h3>Update password</h3>
          <Form
            fields={passwordFields}
            formObject={profile}
            errors={errors}
            buttonText="Update"
            onChange={updatePasswordFields}
            onSubmit={updateProfilePassword}
          />
        </>
      )}
    </div>
  );
}

function getDefaultInfoFormFields(): FormField[] {
  return [
    createFormField({
      name: "username",
      placeholder: "Username",
    }),
    createFormField({
      name: "email",
      type: "email",
      placeholder: "Email",
    }),
    createFormField({
      name: "picture",
      type: "text",
      placeholder: "Picture url",
    }),
  ];
}

function getDefaultPasswordFormFields(): FormField[] {
  return [
    createFormField({
      name: "password",
      type: "password",
      placeholder: "Old password",
    }),
    createFormField({
      name: "new_password",
      type: "password",
      placeholder: "New password",
    }),
  ];
}

export default Profile;
