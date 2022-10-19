import React from "react";
import { useStore } from "../../state/storeHooks";
import { FormField, createFormField } from "../../types/formField";
import { formatFormFromObject } from "../../utils/forms";
import {
  updateClassPrice,
  successUpdate,
  failUpdate,
} from "./StudentProfiles.slice";

import { updateStudentProfile } from "../../api/api.studentProfile";

import Form from "../Form/Form";
import ClassTimePicker from "../ClassTime/ClassTimePicker";
import ClassTimeInfo from "../ClassTime/ClassTimeInfo";

function StudentProfile() {
  const [{ user }] = useStore(({ app }) => app);
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
  }

  async function updateProfileInfo(id: number) {
    if (!user || !activeStudentProfileForm.id) {
      return;
    }

    // filter out class_time because it's null
    const { class_time, ...rest } = activeStudentProfileForm; // change this later

    try {
      const updatedProfile = await updateStudentProfile(
        {
          ...rest,
          ...(activeStudentProfileForm.class_price
            ? { class_price: Number(activeStudentProfileForm.class_price) }
            : {}),
          id,
        },
        user.token
      );

      if ("message" in updatedProfile) {
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
