from datetime import datetime
from app.extentions import db


class StudentProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    student = db.relationship(
        'Student',
        backref=db.backref('profiles', lazy='dynamic')
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    class_time = db.Column(db.String(600))
    class_price = db.Column(db.Integer)
    class_table = db.Column(db.String(1000))

    def __init__(self, student, **kwargs):
        db.Model.__init__(
            self,
            student=student,
            **kwargs
        )

    def update_student_profile(self, **kwargs):
        if 'class_table' in kwargs:
            raise ValueError('Cannot update class_table directly')

        for key, value in kwargs.items():
            if key in self.__dict__:
                setattr(self, key, value)

        self.save()
        return self

    def add_to_table(self, value):
        if not self.class_table:
            self.class_table = value
        else:
            self.class_table = f'{self.class_table},{value}'

        self.save()
        return self

    def delete_from_table(self, value):
        if not self.class_table:
            raise ValueError('Cannot delete from empty table')

        del_value = value.split(':')[0]
        class_table_list = self.class_table.split(',')

        filtered_table = [data for data in class_table_list if del_value not in data]  # noqa: E501 -  move to special util function later
        self.class_table = ','.join(filtered_table)

        self.save()
        return self

    def __repr__(self):
        return '<StudentProfile %r>' % self.id
