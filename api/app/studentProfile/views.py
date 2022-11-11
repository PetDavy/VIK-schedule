from flask import Blueprint
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from app.students.models import Student
from .models import StudentProfile
from .serializers import student_profile_schema
from app.exeptions import InvalidUsage

blueprint = Blueprint('studentProfile', __name__)


@blueprint.route('/api/student/profile', methods=('POST',))
@jwt_required()
@use_kwargs(student_profile_schema)
@marshal_with(student_profile_schema)
def create_student_profile(student_id, class_price):
    student = Student.query.get(student_id)
    if student and student.user == current_user:
        student_profile = StudentProfile(
          student=student,
          class_price=class_price
        )
        student_profile.save()
        return student_profile

    raise InvalidUsage.not_allowed_to_update()


@blueprint.route('/api/student/profile', methods=('PUT',))
@jwt_required()
@use_kwargs(student_profile_schema)
@marshal_with(student_profile_schema)
def update_student_profile(id, **kwargs):
    student_profile = StudentProfile.query.get(id)

    if student_profile and student_profile.student.user == current_user:
        return student_profile.update_student_profile(**kwargs)

    raise InvalidUsage.not_allowed_to_update()


@blueprint.route('/api/student/profile/<int:id>', methods=('DELETE',))
@jwt_required()
@marshal_with(student_profile_schema)
def delete_student_profile(id):
    student_profile = StudentProfile.query.get(id)

    if student_profile and student_profile.student.user == current_user:
        student_profile.delete()
        return student_profile

    raise InvalidUsage.not_allowed_to_delete()
