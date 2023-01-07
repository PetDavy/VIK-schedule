import { useStore } from "../../state/storeHooks";

function ScheduleDatesInfo() {
  const [{ activeStudentProfile }] = useStore(({ studentProfiles }) => studentProfiles);

  return (
    <div className="ScheduleDatesInfo">
      <p>Class Time Info</p>
      <ul>
        {activeStudentProfile?.schedule_dates.map(date => (
          <li key={date.day}>
            {date.day}: {date.time} - {date.duration}min
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ScheduleDatesInfo;