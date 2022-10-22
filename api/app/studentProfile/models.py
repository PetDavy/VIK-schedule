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
    class_price = db.Column(db.Integer)

    def __init__(self, student, **kwargs):
        db.Model.__init__(
            self,
            student=student,
            **kwargs
        )

    def update_student_profile(self, **kwargs):
        for key, value in kwargs.items():
            if key in self.__dict__:
                setattr(self, key, value)

        self.save()
        return self

    def __repr__(self):
        return '<StudentProfile %r>' % self.id
