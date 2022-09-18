import { FC } from 'react';
import { Student } from '../../types/student';

interface StudentListItemProps {
  student: Student;
}


const StudentListItem: FC<StudentListItemProps> = ({ student }) => {
  return (
    <div className="StudentListItem" style={{display: "flex"}}>
      name: {student.name}&nbsp;
      age: {student.age}&nbsp;
      info: {student.info}
    </div>
  );
}

export default StudentListItem;