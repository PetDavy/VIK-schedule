import { useStore } from "../../state/storeHooks";
import StudentListItem from "./StudentListItem";

function StudentsList() {
  const [{ students }] = useStore(({ studentsList }) => studentsList);
  const [{ user }] = useStore(({ app }) => app);

  return (
    <div className="students-list">
      {students.length === 0 && <div>There are no students yet</div>}
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
