from marshmallow import Schema, fields, post_dump, validates_schema

from app.utils.validators.studnetProfile import StudentProfileValidator
from app.classesTable.serializers import ClassTableSchema


class StudentProfileSchema(Schema):
    id = fields.Int()
    student_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)
    class_price = fields.Int()
    schedule_dates = fields.List(fields.Nested(ClassTableSchema))

    @post_dump
    def create_student_profile(self, data, **kwargs):
        return data

    @validates_schema
    def validate_student_profile(self, data, **kwargs):
        StudentProfileValidator.validate(data)


student_profile_schema = StudentProfileSchema()
student_profiles_schema = StudentProfileSchema(many=True)
