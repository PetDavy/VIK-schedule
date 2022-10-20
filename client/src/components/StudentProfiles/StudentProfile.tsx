import React from "react";
import { useStore } from "../../state/storeHooks";
import { FormField, createFormField } from "../../types/formField";
import { formatFormFromObject } from "../../utils/forms";
import {
  updateClassPrice,
  successUpdate,
  failUpdate,
  successCreate,
  failCreate,
  removeNewProfile,
} from "./StudentProfiles.slice";

import { updateStudentProfile, creatStudentProfile } from "../../api/api.studentProfile";

import Form from "../Form/Form";
import ClassTimePicker from "../ClassTime/ClassTimePicker";
import ClassTimeInfo from "../ClassTime/ClassTimeInfo";
import { Student } from "../../types/student";
import { User } from "../../types/user";

function StudentProfile() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ student }] = useStore(({ student }) => student);
  const [{ activeStudentProfile, activeStudentProfileForm, errors }, dispatch] = useStore(
    ({ studentProfiles }) => studentProfiles
  );

  const fields = getDefaultInfoFormFields();

  function updateFields(name: string, value: string) {
    if (name === "class_price") {
      dispatch(updateClassPrice(Number(value)));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (typeof activeStudentProfileForm.id === "number") {
      updateProfileInfo(activeStudentProfileForm.id);
    }
    if (typeof activeStudentProfileForm.id === "string") {
      createProfile(activeStudentProfileForm.id); 
    }
  }

  async function createProfile(tempId: string) {
    const { id } = student as Student;
    const { token } = user as User;

    try {
      const createdProfile = await creatStudentProfile(
        id,
        activeStudentProfileForm,
        token
      );

      if ("messages" in createdProfile) {
        dispatch(failCreate(createdProfile));
      }
      
      if ("id" in createdProfile) {
        dispatch(removeNewProfile(tempId));
        dispatch(successCreate(createdProfile));
      }
    } catch(e) {
      console.log(e);
    }
  }

  async function updateProfileInfo(id: number) {
    const { token } = user as User;

    try {
      const updatedProfile = await updateStudentProfile(
        {
          ...activeStudentProfileForm,
          ...(activeStudentProfileForm.class_price
            ? { class_price: Number(activeStudentProfileForm.class_price) }
            : {}),
          id,
        },
        token
      );

      if ("messages" in updatedProfile) {
        dispatch(failUpdate(updatedProfile));
      }

      if ("id" in updatedProfile) {
        dispatch(successUpdate(updatedProfile));
      }
    } catch (err) {
      console.log(err);
    }
  }

  function renderProfileInfo() {
    const profile = activeStudentProfile || activeStudentProfileForm;

    return (
      <>
        <h1>StudentProfile</h1>
        <i>id: </i>
        {profile.id}
        <br />
        <i>price: </i>
        {profile.class_price}
        <br />
        <i>time: </i>
        <ClassTimeInfo />
        <hr />
      </>
    );
  }

  return (
    <div className="StudentProfile">
      {renderProfileInfo()}
      <Form
        fields={fields}
        formObject={formatFormFromObject(activeStudentProfileForm, fields)}
        errors={errors}
        buttonText="Update"
        onChange={updateFields}
        onSubmit={handleSubmit}
      />
      <ClassTimePicker />
    </div>
  );
}

function getDefaultInfoFormFields(): FormField[] {
  return [
    createFormField({
      name: "class_price",
      type: "number",
      placeholder: "Class Price",
    }),
  ];
}

export default StudentProfile;
