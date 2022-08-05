from marshmallow import Schema, fields, validate, post_dump


class StudentSchema(Schema):
    name = fields.Str(required=True, validate=validate.Length(min=1, max=80))
    age = fields.Int(validate=validate.Range(min=2, max=90))
    info = fields.Str(validate=validate.Length(min=1, max=250))
    created_at = fields.DateTime(dump_only=True)

    @post_dump
    def create_student(self, data, **kwargs):
        return {'student: ': data}


student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
