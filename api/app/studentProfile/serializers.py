from marshmallow import Schema, fields, post_dump, validates_schema

from app.ut import DataFormatter
from app.utils.validators.studnetProfile import StudentProfileValidator


class StudentProfileSchema(Schema):
    id = fields.Int()
    student_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)
    class_time = fields.Str()
    class_price = fields.Int()

    # todo: update this
    @post_dump
    def create_student_profile(self, data, **kwargs):
        if data.get('class_time') is not None:
            data['class_time'] = DataFormatter.class_time(data['class_time'])

        return data

    @validates_schema
    def validate_student_profile(self, data, **kwargs):
        StudentProfileValidator.validate(data)


student_profile_schema = StudentProfileSchema()
student_profiles_schema = StudentProfileSchema(many=True)
