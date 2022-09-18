from marshmallow import Schema
from marshmallow import fields
from marshmallow import validate
from marshmallow import validates_schema
from marshmallow import post_dump
from marshmallow import ValidationError

from app.studentProfile.serializers import StudentProfileSchema


class StudentSchema(Schema):
    id = fields.Int()
    name = fields.Str(validate=validate.Length(min=1, max=80))
    age = fields.Int(validate=validate.Range(min=2, max=90))
    info = fields.Str(validate=validate.Length(min=1, max=250))
    created_at = fields.DateTime(dump_only=True)
    profiles = fields.List(fields.Nested(StudentProfileSchema))

    @post_dump
    def create_student(self, data, **kwargs):
        return data

    @validates_schema
    def update_student(self, data, **kwargs):
        id = data.get('id')
        name = data.get('name')
        if id is None and name is None:
            raise ValidationError('You must provide a name')


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
