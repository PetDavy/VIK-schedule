from datetime import datetime
from app.extentions import db


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer)
    info = db.Column(db.String(120))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # noqa: E501 -  move to special util function later
    user = db.relationship(
      'User',
      backref=db.backref('students', lazy='dynamic')
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, age, info, user, **kwargs):
        db.Model.__init__(
            self,
            name=name,
            age=age,
            info=info,
            user=user
        )

    def __repr__(self):
        return '<Student %r>' % self.name
