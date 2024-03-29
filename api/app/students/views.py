from flask import Blueprint
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from .models import Student
from .serializers import student_schema, students_schema
from app.studentProfile.models import StudentProfile

blueprint = Blueprint('students', __name__)


@blueprint.route('/api/student', methods=('POST',))
@jwt_required()
@use_kwargs(student_schema)
@marshal_with(student_schema)
def create_student(name, age, info, **kwargs):
    student = Student(name=name, age=age, info=info, user=current_user)
    student_profile = StudentProfile(student=student)
    student.save()
    student_profile.save()
    return student


@blueprint.route('/api/student', methods=('PUT',))
@jwt_required()
@use_kwargs(student_schema)
@marshal_with(student_schema)
def update_student(id, **kwargs):
    student = Student.query.get(id)

    if student and student.user == current_user:
        return student.update_student(**kwargs)

    raise Exception('You are not allowed to update this student')


@blueprint.route('/api/students', methods=('GET',))
@jwt_required()
@marshal_with(students_schema)
def get_students():
    return Student.get_by_user(current_user)
