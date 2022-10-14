import { FC } from 'react';
import { Student } from '../../types/student';
import { Link } from 'react-router-dom';

interface StudentListItemProps {
  student: Student;
}


const StudentListItem: FC<StudentListItemProps> = ({ student }) => {
  return (
    <Link to={`/students/${student.id}`} className="StudentListItem" style={{display: "flex"}}>
      name: {student.name}&nbsp;
      age: {student.age}&nbsp;
      info: {student.info}
    </Link>
  );
}

export default StudentListItem;