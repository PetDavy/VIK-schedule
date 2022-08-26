from marshmallow import Schema, fields, post_dump


class ClassTableSchema(Schema):
    id = fields.Int()
    time = fields.DateTime()
    price = fields.Int()
    duration = fields.Float()
    student_profile_id = fields.Int()
    created_at = fields.DateTime(dump_only=True)

    @post_dump
    def dump_class(self, data, **kwargs):

        return {'classTable: ': data}
