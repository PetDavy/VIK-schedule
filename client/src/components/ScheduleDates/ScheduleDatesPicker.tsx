import { useStore } from "../../state/storeHooks";
import {
  setOpenedDay,
  setClassTime,
  setClassDuration,
  addDay,
  deleteDay,
} from "./StudentDates.slice";
import { FormField, createFormField } from "../../types/formField";
import { formatFormFromObject } from "../../utils/forms";
import { ScheduleDate, dayType } from "../../types/scheduleDate";

import FormBlock from "../Form/FormBlock";

function ScheduleDatesPicker() {
  const [{ days, openedDay, errors }, dispatch] = useStore(
    ({ scheduleDates }) => scheduleDates
  );

  const fields = getDefaultStudentDateFields();

  function handleDayClick(day: dayType) {
    if (openedDay && openedDay.day === day) {
      // toggle off
      dispatch(setOpenedDay(null));
      return;
    }

    if (day in days && days[day]) {
      // toggle on already saved day
      dispatch(setOpenedDay(days[day]));
    } else {
      dispatch(
        setOpenedDay({
          id: 0,
          student_profile_id: 0,
          day,
          time: "14:00",
          duration: 45,
          created_at: "",
        })
      );
    }
  }

  function updateFields(name: string, value: string) {
    if (!openedDay) {
      return;
    }

    if (name === "time") {
      dispatch(setClassTime(value));
    }

    if (name === "duration") {
      dispatch(setClassDuration(Number(value)));
    }
  }

  function addNewDay() {
    if (!openedDay) {
      return;
    }

    dispatch(addDay());
  }

  function deleteStoredDay() {
    if (!openedDay) {
      return;
    }

    dispatch(deleteDay(openedDay.day));
  }

  return (
    <div className="ScheduleDatesPicker">
      <p>Class Time Picker</p>
      <ul style={{ display: "flex", listStyle: "none" }}>
        {Object.entries(days).map(([day, data]) => (
          <li
            key={day}
            style={{
              padding: "5px",
              marginRight: "5px",
              background: data ? "#15aaff" : "#f4f4f4",
              cursor: "pointer",
            }}
            onClick={() => handleDayClick(day as dayType)}
          >
            {day}
          </li>
        ))}
      </ul>
      {openedDay && (
        <>
          <FormBlock
            fields={fields}
            formObject={formatFormFromObject(openedDay, fields)}
            errors={errors}
            buttonText="Save"
            onChange={updateFields}
            onSubmit={addNewDay}
            noButton={!!days[openedDay.day]}
          />
          {days[openedDay.day] && (
            <button
              style={{
                background: "red",
                color: "white",
                padding: "5px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={deleteStoredDay}
            >
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
}

function getDefaultStudentDateFields(): FormField[] {
  return [
    createFormField({
      name: "time",
      type: "time",
      placeholder: "Time",
    }),
    createFormField({
      name: "duration",
      type: "range",
      placeholder: "Duration",
    }),
  ];
}

export default ScheduleDatesPicker;
