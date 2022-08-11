from datetime import datetime

from app.extentions import db


class StudentProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('student.id'))
    student = db.relationship(
        'Student',
        backref=db.backref('profile', lazy='dynamic'),  # change to profiles
        uselist=False
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    class_time = db.Column(db.String(500))
    class_price = db.Column(db.Integer)
    class_table = db.Column(db.String(120))

    def __init__(self, student, **kwargs):
        db.Model.__init__(
            self,
            student=student,
            **kwargs
        )

    def __repr__(self):
        return '<StudentProfile %r>' % self.id
