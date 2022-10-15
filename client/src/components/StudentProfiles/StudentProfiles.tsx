import { useStore, useStoreWithInit } from "../../state/storeHooks";
import { Student } from "../../types/student";
import { StudentProfile as StudentProfileType } from "../../types/studentProfile";
import { StudentProfileForm } from "./StudentProfiles.slice";
import {
  setStudentProfiles,
  setActiveStudentProfile,
  startNewProfile,
} from "./StudentProfiles.slice";
import { useEffect } from "react";

import StudentProfile from "./StudentProfile";

function StudentProfiles() {
  const [{ student }, dispatch] = useStore(({ student }) => student);
  const [{ studentProfiles, activeStudentProfile }] = useStore(({ studentProfiles }) => studentProfiles);

  useEffect(() => {
    setUpStudentProfiles();
  }, [student]);

  function setUpStudentProfiles() {
    const { profiles } = student as Student;

    if (profiles.length) {
      dispatch(setStudentProfiles(profiles));
      dispatch(setActiveStudentProfile(profiles[0]));
    }
  }

  function handleTabClick(profile: StudentProfileForm) {
    if (activeStudentProfile.id !== profile.id) {
      dispatch(setActiveStudentProfile(profile));
    }
  }

  function addNewProfile() {
    dispatch(startNewProfile());
  }

  return (
    <div className="Profiles">
      <h3>Profiles</h3>
      <div className="Profiles__tabs" style={{ display: "flex" }}>
        {studentProfiles.map((profile: StudentProfileForm) => (
          <div
            className="Profiles__tab"
            key={profile.id}
            onClick={() => handleTabClick(profile)}
            style={{
              padding: "5px",
              marginRight: "3px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            <strong>#{profile.id}</strong>
          </div>
        ))}
        <div
          className="Profiles__tab"
          onClick={addNewProfile}
          style={{
            padding: "5px",
            marginRight: "3px",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          +
        </div>
      </div>
      <StudentProfile />
    </div>
  );
}

export default StudentProfiles;
