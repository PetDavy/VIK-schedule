from marshmallow import Schema
from marshmallow import fields
from marshmallow import validates_schema
from marshmallow import post_dump
from marshmallow import ValidationError

from app.studentProfile.serializers import StudentProfileSchema
from app.utils.validators.student import StudentValidator


class StudentSchema(Schema):
    id = fields.Int()
    name = fields.Str()
    age = fields.Int()
    info = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    profiles = fields.List(fields.Nested(StudentProfileSchema))

    @post_dump
    def create_student(self, data, **kwargs):
        return data

    @validates_schema
    def validate_student(self, data, **kwargs):
        StudentValidator.validate(data)

    class Meta:
        strict = True


class StudentUpdateSchema(StudentSchema):
    @validates_schema
    def validate_student(self, data, **kwargs):
        id = data.get('id')
        if id is None:
            raise ValidationError('You must provide an id')


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
