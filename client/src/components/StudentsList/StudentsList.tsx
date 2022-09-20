import { useStore, useStoreWithInit } from "../../state/storeHooks";
import StudentListItem from "./StudentListItem";
import { loadStudents } from "../../api/api.student";
import { setStudents } from "./StudentsList.slice";

function StudentsList() {
  const [{ students }, dispatch] = useStoreWithInit(({ studentsList }) => studentsList, getStudents);
  const [{ user }] = useStore(({ app }) => app);

  async function getStudents() {
    const accessToken = user?.token; 
    
    if (!accessToken) return;
    
    try {
      dispatch(setStudents(await loadStudents(accessToken)));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="StudentsList">
      {students.length === 0 && <div>There are no students</div>}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <StudentListItem student={student} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentsList
