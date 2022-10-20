import { useStore, useStoreWithInit } from "../../state/storeHooks";
import { Student } from "../../types/student";
import { StudentProfile as StudentProfileType } from "../../types/studentProfile";
import { StudentProfileForm } from "./StudentProfiles.slice";
import {
  setStudentProfiles,
  setStudentProfileForms,
  setActiveStudentProfile,
  setActiveStudentProfileForm,
  startNewProfile,
} from "./StudentProfiles.slice";
import { useEffect } from "react";

import StudentProfile from "./StudentProfile";

function StudentProfiles() {
  const [{ student }, dispatch] = useStore(({ student }) => student);
  const [{ studentProfiles, studentProfileForms, activeStudentProfileForm }] = useStore(({ studentProfiles }) => studentProfiles);

  useEffect(() => {
    setUpStudentProfiles();
  }, [student]);

  function setUpStudentProfiles() {
    const { profiles } = student as Student;

    if (profiles.length) {
      dispatch(setStudentProfiles(profiles));
      dispatch(setStudentProfileForms(profiles));
      dispatch(setActiveStudentProfile(profiles[0]));
      dispatch(setActiveStudentProfileForm(profiles[0]));
    }
  }

  function handleTabClick(profile: StudentProfileForm) {
    if (activeStudentProfileForm.id !== profile.id) {
      dispatch(setActiveStudentProfileForm(profile));
    }

    const clickedProfile = studentProfiles.find(studentProfile => studentProfile.id === profile.id);

    dispatch(setActiveStudentProfile(clickedProfile || null));
  }

  function addNewProfile() {
    dispatch(startNewProfile());
  }

  return (
    <div className="Profiles">
      <h3>Profiles</h3>
      <div className="Profiles__tabs" style={{ display: "flex" }}>
        {studentProfileForms.map((profile: StudentProfileForm) => (
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
