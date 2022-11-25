from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from app.studentProfile.models import StudentProfile
from .serializers import lesson_schema, lessons_schema
from .models import Lesson
from app.exeptions import InvalidUsage

blueprint = Blueprint('lesson', __name__)


@blueprint.route('/api/lessons/<int:profile_id>', methods=('GET',))
@jwt_required()
@marshal_with(lessons_schema)
def get_lessons(profile_id):
    student_profile = StudentProfile.query.get(profile_id)

    if student_profile and student_profile.student.user == current_user:
        lessons = student_profile.lessons.all()

        return lessons

    raise InvalidUsage.not_allowed_to_get()


@blueprint.route('/api/lesson/<int:profile_id>', methods=('POST',))
@jwt_required()
@use_kwargs(lesson_schema)
@marshal_with(lesson_schema)
def create_lesson(profile_id, **kwargs):
    student_profile = StudentProfile.query.get(profile_id)

    if student_profile and student_profile.student.user == current_user:
        lesson = Lesson(student_profile=student_profile, **kwargs)
        lesson.save()

        return lesson
    else:
        raise InvalidUsage.not_allowed_to_add()


@blueprint.route('/api/lesson/<int:lesson_id>', methods=('DELETE',))
@jwt_required()
def delete_lesson(lesson_id):
    lesson = Lesson.query.get(lesson_id)

    if lesson and lesson.student_profile.student.user == current_user:
        return jsonify({'id': lesson_id, 'method': 'DELETE'})
    else:
        raise InvalidUsage.not_allowed_to_delete()
