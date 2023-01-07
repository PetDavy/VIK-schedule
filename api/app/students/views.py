from flask import Blueprint
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from .models import Student
from .serializers import student_schema, students_schema
from app.studentProfile.models import StudentProfile
from app.exeptions import InvalidUsage

blueprint = Blueprint('students', __name__)


@blueprint.route('/api/student', methods=('POST',))
@jwt_required()
@use_kwargs(student_schema)
@marshal_with(student_schema)
def create_student(name, age, info, contact, **kwargs):
    student = Student(
        name=name,
        age=age,
        info=info,
        contact=contact,
        user=current_user
    )
    student_profile = StudentProfile(student=student)
    student.save()
    student_profile.save()
    return student, 201


@blueprint.route('/api/student', methods=('PUT',))
@jwt_required()
@use_kwargs(student_schema)
@marshal_with(student_schema)
def update_student(id, **kwargs):
    student = Student.query.get(id)

    if student and student.user == current_user:
        return student.update_student(**kwargs)

    raise InvalidUsage.not_allowed_to_update()


@blueprint.route('/api/student/<int:id>', methods=('DELETE',))
@jwt_required()
@marshal_with(student_schema)
def delete_student(id):
    student = Student.query.get(id)

    if student and student.user == current_user:
        student.delete()
        return student

    raise InvalidUsage.not_allowed_to_delete()


@blueprint.route('/api/students', methods=('GET',))
@jwt_required()
@marshal_with(students_schema)
def get_students():
    return Student.get_by_user(current_user)
