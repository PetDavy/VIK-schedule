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
import { openModal } from "../../components/Modal/Modal.slice";
import { updateUser, getUser } from "../../api/api.user";
import { isSuccessResponse } from "../../api/api";

import Form from "../../components/Form/Form";
import Modal from "../../components/Modal/Modal";
import studentProfileIcon from "../../assets/icons/student-profile.svg";
import checkIcon from "../../assets/icons/check.svg";

import '../../assets/styles/profile.scss';

function Profile() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ students }] = useStore(({ studentsList }) => studentsList);
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

      if (isSuccessResponse(updatedUser)) {
        dispatch(successUpdate());
      } else {
        dispatch(failUpdate(updatedUser));
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
        <span className="profile__avatar">
          {getImgTextFromName(user.username)}
        </span>
      );
    }
  }

  return (
    <main className="profile side-indent">
      <div className="profile__content">
        <div className="profile__left">
          <div className="profile__head">
            {getAvatar()}
            <p className="profile__name">
              {user?.username}
            </p>
            <div className="profile__info">
              <div className="profile__info-item">
                <i className="profile__info-item-icon">
                  <img src={studentProfileIcon} alt="student" />
                </i>
                <div className="profile__info-item-content">
                  <span className="profile__info-item-amount">{students.length}</span>
                  <span className="profile__info-item-text">Students</span>
                </div>
              </div>
              <div className="profile__info-item">
                <i className="profile__info-item-icon">
                  <img src={checkIcon} alt="check" />
                </i>
                <div className="profile__info-item-content">
                  <span className="profile__info-item-amount">37</span>
                  <span className="profile__info-item-text">Classes Done</span>
                </div>
              </div>
            </div>
          </div>
          <div className="profile__details">
            <div className="profile__details-title">details</div>
            <div className="profile__details-item">
              <span className="profile__details-label">Name:</span>
              <span className="profile__details-text">{user?.username}</span>
            </div>
            <div className="profile__details-item">
              <span className="profile__details-label">Email:</span>
              <span className="profile__details-text">{user?.email}</span>
            </div>
            <div className="profile__buttons">
              <button
                className="profile__btn"
                onClick={() => dispatch(openModal())}
              >
                Edit
              </button>
            </div>

            <Modal>
              {user && !user.is_google_auth && (
                <>
                  <h3 className="modal__title">Edit Profile Info</h3>
                  <Form
                    fields={infoFields}
                    formObject={profile}
                    errors={errors}
                    buttonText="Update"
                    onChange={updateInfoFields}
                    onSubmit={updateProfileInfo}
                  />
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
            </Modal>
          </div>

        </div>
        <div className="profile__right">
          <div className="profile__activity">
            <h3>Activity</h3>
          </div>
        </div>

      </div>
    </main>
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
