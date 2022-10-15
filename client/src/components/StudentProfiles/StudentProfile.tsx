import { useStore } from "../../state/storeHooks";

function StudentProfile() {
  const [{ activeStudentProfile }] = useStore(({ studentProfiles }) => studentProfiles);

  return (
    <div>
      <h1>StudentProfile</h1>
      <i>id: </i>{activeStudentProfile.id}
    </div>
  )
}

export default StudentProfile;