import { useStore } from "../../state/storeHooks";

function ClassTimePicker() {
  const [{ activeStudentProfileForm }] = useStore(({ studentProfiles }) => studentProfiles);

  return (
    <div className="ClassTimePicker">
      <p>Class Time Picker</p>
    </div>
  )
}

export default ClassTimePicker;