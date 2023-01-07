from marshmallow import Schema, fields, post_dump


class LessonSchema(Schema):
    id = fields.Int()
    date = fields.Date()
    time = fields.Time()
    duration = fields.Int()
    student_profile_id = fields.Int()
    price = fields.Int()
    created_at = fields.DateTime(dump_only=True)

    @post_dump
    def dump_lesson(self, data, **kwargs):
        return data


lesson_schema = LessonSchema()
lessons_schema = LessonSchema(many=True)
