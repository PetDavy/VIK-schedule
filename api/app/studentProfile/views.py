from flask import Blueprint
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from app.students.models import Student
from .models import StudentProfile
from .serializers import student_profile_schema

blueprint = Blueprint('studentProfile', __name__)


@blueprint.route('/api/student/profile/', methods=('POST',))
@jwt_required()
@use_kwargs(student_profile_schema)
@marshal_with(student_profile_schema)
def create_student_profile(student_id, class_time, class_price):
    student = Student.query.get(student_id)
    if student and student.user == current_user:
        student_profile = StudentProfile(
          student=student,
          class_time=class_time,
          class_price=class_price
        )
        student_profile.save()
        return student_profile

    raise Exception('You are not allowed to create this student profile')
