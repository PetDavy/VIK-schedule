import { useStore } from "../../state/storeHooks";
import { FormField, createFormField } from "../../types/formField";
import { formatFormFromObject } from "../../utils/forms";
import { updateClassPrice, successUpdate, failUpdate } from "./StudentProfiles.slice";

import { updateStudentProfile } from "../../api/api.studentProfile";

import Form from "../Form/Form";
import React from "react";

function StudentProfile() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ activeStudentProfile, errors }, dispatch] = useStore(({ studentProfiles }) => studentProfiles);

  const fields = getDefaultInfoFormFields();

  function updateFields(name: string, value: string) {
    if (name === 'class_price') {
      dispatch(updateClassPrice(Number(value)));
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (typeof activeStudentProfile.id === "number") {
      updateProfileInfo(activeStudentProfile.id);
    }
  }
  
  async function updateProfileInfo(id: number) {
    if (!user || !activeStudentProfile.id) {
      return;
    }

    // filter out class_time because it's null
    const { class_time, ...rest } = activeStudentProfile; // change this later
  
    try {
      const updatedProfile = await updateStudentProfile({
        ...rest,
        ...(activeStudentProfile.class_price ? { class_price: Number(activeStudentProfile.class_price)} : {}),
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

  return (
    <div className="StudentProfile">
      <h1>StudentProfile</h1>
      <i>id: </i>{activeStudentProfile.id}
      <Form
        fields={fields}
        formObject={formatFormFromObject(activeStudentProfile, fields)}
        errors={errors}
        buttonText="Update"
        onChange={updateFields}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

function getDefaultInfoFormFields(): FormField[] {
  return [
    createFormField({
      name: 'class_price',
      type: 'number',
      placeholder: 'Class Price',
    }),
  ];
}

export default StudentProfile;