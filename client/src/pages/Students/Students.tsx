import StudentsList from "../../components/StudentsList/StudentsList"
import StudentForm from "../../components/StudentForm/StudentForm"

function Students() {
  return (
    <div className="Students">
      <StudentForm />
      <StudentsList />
    </div>
  )
}

export default Students