from flask import Blueprint
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from .models import Student
from .serializers import student_schema

blueprint = Blueprint('students', __name__)


@blueprint.route('/api/students', methods=('POST',))
@jwt_required()
@use_kwargs(student_schema)
@marshal_with(student_schema)
def create_student(name, age, info, **kwargs):
    print("TEST IS HERE")
    student = Student(name=name, age=age, info=info, user=current_user)
    student.save()
    return student
