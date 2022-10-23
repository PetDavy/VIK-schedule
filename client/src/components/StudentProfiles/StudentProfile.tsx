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
  updateScheduleDates,
} from "./StudentProfiles.slice";
import { setDay } from "../ScheduleDates/StudentDates.slice";
import { ScheduleDate } from "../../types/scheduleDate";

import {
  updateStudentProfile,
  creatStudentProfile,
} from "../../api/api.studentProfile";
import { updateScheduleDate, deleteScheduleDate, createScheduleDate } from "../../api/api.scheduleDate";

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
  const [{ activeStudentProfile, activeStudentProfileForm, errors }, dispatch] =
    useStore(({ studentProfiles }) => studentProfiles);

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
    } catch (e) {
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
        setDates(updatedProfile);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function setDates(updatedProfile: StudentProfileType) {
    const { token } = user as User;

    for (const date of updatedProfile.schedule_dates) {
      if (days[date.day]) {
        const { time, duration } = days[date.day] as ScheduleDate;

        if (time !== date.time || duration !== date.duration) {
          await updateSingelDate(date, token);
        }
      } else {
        await deleteSingleDate(date, token);
      }
    }

    const dates = Object.values(days).filter((day) => day !== null);
    
    for (const currDate of dates as ScheduleDate[]) {
      if (!updatedProfile.schedule_dates.find((date) => date.day === currDate.day)) {
        await createSingleDate(currDate, token);
      }
    }

    dispatch(updateScheduleDates(dates as ScheduleDate[]));
  }

  async function updateSingelDate(date: ScheduleDate, token: string) {
    const updatingObject = {
      time: days[date.day]!.time,
      duration: days[date.day]!.duration,
    };

    try {
      const updatedDate = await updateScheduleDate(
        date.id,
        updatingObject,
        token
      );

      if ("messages" in updatedDate) {
        dispatch(failUpdate(updatedDate));
      }

      if ("id" in updatedDate) {
        dispatch(setDay(updatedDate));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSingleDate(date: ScheduleDate, token: string) {
    try {
      const deletedDate = await deleteScheduleDate(date.id, token);

      if ("messages" in deletedDate) {
        dispatch(failUpdate(deletedDate));
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function createSingleDate(date: ScheduleDate, token: string) {
    try {
      const { id } = activeStudentProfile as StudentProfileType;
      const formatedDate = {day: date.day, time: date.time, duration: date.duration};
      const createdDate = await createScheduleDate(id, formatedDate, token);

      if ("messages" in createdDate) {
        dispatch(failUpdate(createdDate));
      }

      if ("id" in createdDate) {
        dispatch(setDay(createdDate));
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
