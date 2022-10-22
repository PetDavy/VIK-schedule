import React from "react";
import { useStore } from "../../state/storeHooks";
import { FormField, createFormField } from "../../types/formField";
import { formatFormFromObject, formatFormToObject } from "../../utils/forms";
import {
  updateClassPrice,
  successUpdate,
  failUpdate,
  successCreate,
  failCreate,
  removeNewProfile,
} from "./StudentProfiles.slice";

import { updateStudentProfile, creatStudentProfile } from "../../api/api.studentProfile";
import { updateScheduleDate } from "../../api/api.scheduleDate";

import Form from "../Form/Form";
import ScheduleDatesPicker from "../ScheduleDates/ScheduleDatesPicker";
import ScheduleDatesInfo from "../ScheduleDates/ScheduleDatesInfo";
import { Student } from "../../types/student";
import { User } from "../../types/user";
import { StudentProfile as StudentProfileType } from "../../types/studentProfile";

function StudentProfile() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ student }] = useStore(({ student }) => student);
  const [{ days, openedDay }] = useStore(({ scheduleDates }) => scheduleDates);
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
          ...formatFormToObject(activeStudentProfileForm, fields),
          id,
        },
        token
      );

      if ("messages" in updatedProfile) {
        dispatch(failUpdate(updatedProfile));
      }

      if ("id" in updatedProfile) {
        dispatch(successUpdate(updatedProfile));
        updateScheduleDates(updatedProfile);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function updateScheduleDates(updatedProfile: StudentProfileType) {
    const { token } = user as User;

    for (const date of updatedProfile.schedule_dates) {
      if (days[date.day]) {
        const updatingObject = {
          time: days[date.day]!.time,
          duration: days[date.day]!.duration,
        }

        const res = await updateScheduleDate(date.id, updatingObject, token);
        console.log("res: ", res);
      }
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
        <ScheduleDatesInfo />
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
      >
        <ScheduleDatesPicker />
      </Form>
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
