from datetime import datetime

from app.extentions import db


class ClassTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    day = db.Column(db.String(10))
    time = db.Column(db.Time, default=datetime.utcnow)
    duration = db.Column(db.Integer, default=45)
    student_profile_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'))  # noqa: E501
    student_profile = db.relationship(
        'StudentProfile',
        backref=db.backref('schedule_dates', lazy='dynamic'),
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, student_profile, **kwargs):
        db.Model.__init__(
            self,
            student_profile=student_profile,
            **kwargs
        )

    def __repr__(self):
        return '<ClassTable %r>' % self.id
