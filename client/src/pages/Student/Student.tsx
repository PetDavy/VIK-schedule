import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useStore } from "../../state/storeHooks";

import { loadStudents, updateStudent, deleteStudent } from "../../api/api.student";

import { FormField, createFormField } from "../../types/formField";
import {
  setStudent,
  updateName,
  updateInfo,
  updateContact,
  updateAge,
  successUpdate,
  failUpdate,
  successDelete,
  failDelete,
} from "./Student.slice";
import { setStudents } from "../../components/StudentsList/StudentsList.slice";

import Form from "../../components/Form/Form";
import StudentProfiles from "../../components/StudentProfiles/StudentProfiles";
import { User } from "../../types/user";

function Student() {
  const [{ user }] = useStore(({ app }) => app);
  const [{ students, isLoading }, dispatch] = useStore(({ studentsList }) => studentsList);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    
    const student = students.find((student) => student.id === Number(id));

    if (!student) {
      location.href = "/students";
      return;
    }

    dispatch(setStudent(student));
  }, [id, students, isLoading]);

  const [{ student, studentForm, errors }] = useStore(({ student }) => student);
  const fields = getDefaultStudentFormFields();

  function updateStudentInfoFileds(name: string, value: string) {
    if (name === "name") {
      dispatch(updateName(value));
    } else if (name === "age") {
      dispatch(updateAge(Number(value)));
    } else if (name === "info") {
      dispatch(updateInfo(value));
    } else if (name === "contact") {
      dispatch(updateContact(value));
    }
  }

  async function updateStudentIndo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!user || !student) {
      return;
    }

    try {
      const responceStudentData = await updateStudent(
        {
          ...studentForm,
          age: Number(studentForm.age),
          id: student.id,
        },
        user.token
      );

      if ("messages" in responceStudentData) {
        dispatch(failUpdate(responceStudentData));
      }

      if ("id" in responceStudentData) {
        dispatch(successUpdate());
        dispatch(setStudents(await loadStudents(user.token)));
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function removeStudent() {
    const { token } = user as User;

    if (!student) {
      return;
    }

    try {
      const responceStudentData =  await deleteStudent(student.id, token);

      if ("messages" in responceStudentData) {
        dispatch(failDelete(responceStudentData));
      }

      if ("id" in responceStudentData) {
        dispatch(successDelete());
        location.href = "/students";
      }
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <div className="Student" style={{maxWidth: '1400px', margin: '0 auto'}}>
      {isLoading && <div>Loading...</div>}
      {!isLoading && student && (
        <div>
          <h1>
            <i>Name:</i> {student.name}
          </h1>
          <p>
            <i>Age:</i> {student.age}
          </p>
          <p>
            <i>Info:</i> {student.info}
          </p>
          <p>
            <i>Contact:</i> {student.contact}
          </p>
          <button
            onClick={removeStudent}
            style={{ backgroundColor: "red", color: "white" }}
          >
            Delete Student
          </button>
          <Form
            fields={fields}
            formObject={{ ...studentForm, age: String(studentForm.age) }}
            errors={errors}
            buttonText="Update"
            onChange={updateStudentInfoFileds}
            onSubmit={updateStudentIndo}
          />
          <StudentProfiles />
        </div>
      )}
    </div>
  );
}

function getDefaultStudentFormFields(): FormField[] {
  return [
    createFormField({
      name: "name",
      placeholder: "Name",
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
    createFormField({
      name: "contact",
      placeholder: "Contact",
    }),
  ];
}

export default Student;
