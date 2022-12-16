import { FC } from 'react';
import { Student } from '../../types/student';
import { Link } from 'react-router-dom';

interface StudentListItemProps {
  student: Student;
}


const StudentListItem: FC<StudentListItemProps> = ({ student }) => {
  return (
    <Link to={`/students/${student.id}`} className="studentListItem">
      <div className="studentListItem__element studentListItem__element--name">
        {student.name}
      </div>
      <div className="studentListItem__element studentListItem__element--age">
        {student.age}
      </div>
      <div className="studentListItem__element studentListItem__element--created">
        ----
      </div>
      <div className="studentListItem__element studentListItem__element--contact">
        {student.contact}
      </div>
    </Link>
  );
}

export default StudentListItem;