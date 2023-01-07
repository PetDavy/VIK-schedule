import { useStore } from "../../state/storeHooks";
import StudentListItem from "./StudentListItem";

import "../../assets/styles/components/students-list.scss"

function StudentsList() {
  const [{ students }] = useStore(({ studentsList }) => studentsList);
  const [{ user }] = useStore(({ app }) => app);

  return (
    <div className="students-list">
      {students.length === 0
      ? <div>There are no students yet</div>
      : <ul className="students-list__list">
          <li className="students-list__header">
            <div className="students-list__header-item">name</div>
            <div className="students-list__header-item">age</div>
            <div className="students-list__header-item">created</div>
            <div className="students-list__header-item">contact</div>
          </li>
          {students.map((student) => (
            <li key={student.id}>
              <StudentListItem student={student} />
            </li>
          ))}
        </ul>
      }
    </div>
  )
}

export default StudentsList
