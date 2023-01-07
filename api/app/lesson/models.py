from datetime import datetime

from app.extentions import db


class Lesson(db.Model):
    '''Model for representing a single lesson what was done by a student.'''

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, default=datetime.utcnow)
    time = db.Column(db.Time, default=datetime.utcnow)

    # represent a duration as a precents of a classTable duration
    duration = db.Column(db.Integer, default=100)
    price = db.Column(db.Integer, default=0)

    student_profile_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'))  # noqa: E501
    student_profile = db.relationship(
        'StudentProfile',
        backref=db.backref('lessons', lazy='dynamic')
    )

    def __init__(self, student_profile, **kwargs):
        db.Model.__init__(
            self,
            student_profile=student_profile,
            **kwargs
        )

    def __repr__(self):
        return '<Lesson %r>' % self.id
