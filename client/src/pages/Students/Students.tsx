import StudentsList from "../../components/StudentsList/StudentsList"
import StudentForm from "../../components/StudentForm/StudentForm"

function Students() {
  return (
    <main className="students">
      <StudentForm />
      <StudentsList />
    </main>
  )
}

export default Students