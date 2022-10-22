from marshmallow import Schema, fields, post_dump


class ClassTableSchema(Schema):
    id = fields.Int()
    day = fields.Str()
    time = fields.Time()
    duration = fields.Int()
    student_profile_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)

    @post_dump
    def dump_class(self, data, **kwargs):
        return data
