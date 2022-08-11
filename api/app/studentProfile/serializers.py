from marshmallow import Schema, fields, validate, post_dump, validates_schema

from app.utils import SchemaValidation, DataFormatter


class StudentProfileSchema(Schema):
    id = fields.Int()
    student_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)
    class_time = fields.Str()
    class_price = fields.Int(validate=validate.Range(min=1, max=300))
    class_table = fields.Str(validate=validate.Length(min=1, max=120), dump_only=True)  # noqa: E501

    @post_dump
    def create_student_profile(self, data, **kwargs):
        if data.get('class_time') is not None:
            data['class_time'] = DataFormatter.class_time(data['class_time'])

        return {'studentProfile: ': data}

    @validates_schema
    def validate_inputs(self, data, **kwargs):
        if data.get('class_time') is not None:
            SchemaValidation.class_time(data.get('class_time'))


student_profile_schema = StudentProfileSchema()
student_profiles_schema = StudentProfileSchema(many=True)
