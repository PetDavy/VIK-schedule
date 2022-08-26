from datetime import datetime

from app.extentions import db


class ClassTable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    price = db.Column(db.Integer)
    duration = db.Column(db.Float, default=1.0)
    student_profile_id = db.Column(db.Integer, db.ForeignKey('student_profile.id'))  # noqa: E501
    student_profile = db.relationship(
        'StudentProfile',
        backref=db.backref('classes_done', lazy='dynamic'),
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
