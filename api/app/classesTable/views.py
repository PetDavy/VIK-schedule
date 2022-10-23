from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, current_user
from flask_apispec import use_kwargs, marshal_with

from app.studentProfile.models import StudentProfile
from .models import ClassTable
from .serializers import ClassTableSchema

blueprint = Blueprint('classesTable', __name__)


@blueprint.route('/api/classes/<int:profile_id>', methods=('POST',))
@jwt_required()
@use_kwargs(ClassTableSchema)
@marshal_with(ClassTableSchema)
def add_class(profile_id, **kwargs):
    student_profile = StudentProfile.query.get(profile_id)

    if student_profile and student_profile.student.user == current_user:
        class_table = ClassTable(student_profile=student_profile, **kwargs)
        class_table.save()

        return class_table

    raise Exception('You are not allowed to add this class')


@blueprint.route('/api/classes/<int:class_table_id>', methods=('DELETE',))
@jwt_required()
def delete_class(class_table_id):
    class_table = ClassTable.query.get(class_table_id)

    if class_table is None:
        return jsonify({'message': f'Class with id {class_table_id} not found'}), 404  # noqa E501

    current_profile = class_table.student_profile

    if current_profile.student.user == current_user:
        class_table.delete()

        return jsonify({'id': class_table_id, 'method': 'DELETE'})

    raise Exception('You are not allowed to delete this class')


@blueprint.route('/api/classes/<int:class_table_id>', methods=('PUT',))
@jwt_required()
@use_kwargs(ClassTableSchema)
@marshal_with(ClassTableSchema)
def update_class(class_table_id, **kwargs):
    class_table = ClassTable.query.get(class_table_id)

    if class_table is None:
        raise Exception('Class not found')

    current_profile = class_table.student_profile

    if current_profile.student.user == current_user:
        class_table.update(**kwargs)

        return class_table

    raise Exception('You are not allowed to update this class')
