import Form from "../Form/Form";
import { FormField, createFormField } from "../../types/formField";

import { useStore } from "../../state/storeHooks";
import {
  startCreating,
  successCreate,
  failCreate,
  updateName,
  updateAge,
  updateInfo,
  endCreating,
  addNewStudent,
} from "./StudentForm.slice";
import { setStudents } from "../StudentsList/StudentsList.slice";

import { createStudent, loadStudents } from "../../api/api.student";

function StudentForm() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ student, creating, errors, newStudents }, dispatch] = useStore(({ studentForm }) => studentForm);

  const fields = getDefaultFormFields();

  function updateFileds(name: string, value: string) {
    if (name === "name") {
      dispatch(updateName(value));
    } else if (name === "age") {
      dispatch(updateAge(Number(value)));
    } else if (name === "info") {
      dispatch(updateInfo(value));
    }
  }

  async function addStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user) {
      return;
    }

    dispatch(startCreating());

    try {
      const newStudentData = await createStudent(student, user.token);
      console.log('newStudentData', newStudentData);

      if ('messages' in newStudentData) {
        dispatch(failCreate(newStudentData));
      }

      if ('id' in newStudentData) {
        dispatch(successCreate());
        dispatch(addNewStudent(newStudentData));
        dispatch(setStudents(await loadStudents(user.token)));
      }
    } catch (error) {
      console.warn(error);
    } finally {
      dispatch(endCreating());
    }
  }

  return (
    <div className="StudentForm">
      <h2>Add new student</h2>
      <Form
        fields={fields}
        formObject={{ ...student, age: String(student.age) }}
        errors={errors}
        buttonText="Add"
        onChange={updateFileds}
        onSubmit={addStudent}
      />
      <ul>
        {newStudents.map((student) => (
          <li key={student.id}>{student.name}</li>
        ))} 
      </ul>
    </div>
  );
}

function getDefaultFormFields(): FormField[] {
  return [
    createFormField({
      name: "name",
      placeholder: "Name",
      required: true,
    }),
    createFormField({
      name: "age",
      type: "number",
      placeholder: "Age",
    }),
    createFormField({
      name: "info",
      placeholder: "Info",
    }),
  ];
}

export default StudentForm;
