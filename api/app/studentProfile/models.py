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

    def update_table(self, update_table_data):
        if not self.class_table:
            self.class_table = update_table_data
        else:
            self.class_table = f'{self.class_table},{update_table_data}'

        self.save()
        return self

    def __repr__(self):
        return '<StudentProfile %r>' % self.id
