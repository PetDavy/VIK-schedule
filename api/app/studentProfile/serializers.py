from marshmallow import Schema, fields, validate, post_dump, post_load, validates_schema  # noqa: E501

from app.utils import SchemaValidation, DataFormatter


class UpdateTableSchema(Schema):
    method = fields.Str(required=True, validate=validate.OneOf(['add', 'delete']))  # noqa: E501
    datetime = fields.Int(required=True)
    duration = fields.Float()

    @post_load
    def post_load(self, data, **kwargs):
        return {
            'method': data['method'],
            'value': f'{data["datetime"]}:{data.get("duration", 1)}'
        }


class StudentProfileSchema(Schema):
    id = fields.Int()
    student_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)
    class_time = fields.Str()
    class_price = fields.Int(validate=validate.Range(min=1, max=300))
    class_table = fields.Str(validate=validate.Length(min=1, max=120), dump_only=True)  # noqa: E501
    update_table_data = fields.Nested(UpdateTableSchema)

    @post_dump
    def create_student_profile(self, data, **kwargs):
        if data.get('class_time') is not None:
            data['class_time'] = DataFormatter.class_time(data['class_time'])
        if data.get('class_table') is not None:
            data['class_table'] = DataFormatter.class_table(data['class_table'])  # noqa: E501
        return {'studentProfile: ': data}

    @validates_schema
    def validate_inputs(self, data, **kwargs):
        if data.get('class_time') is not None:
            SchemaValidation.class_time(data.get('class_time'))


student_profile_schema = StudentProfileSchema()
student_profiles_schema = StudentProfileSchema(many=True)
