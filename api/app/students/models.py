from datetime import datetime
from app.extentions import db


class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    age = db.Column(db.Integer)
    info = db.Column(db.String(120))
    contact = db.Column(db.String(120))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # noqa: E501 -  move to special util function later
    user = db.relationship(
      'User',
      backref=db.backref('students', lazy='dynamic')
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __init__(self, name, age, info, contact, user, **kwargs):
        db.Model.__init__(
            self,
            name=name,
            age=age,
            info=info,
            contact=contact,
            user=user
        )

    def update_student(self, **kwargs):
        for key, value in kwargs.items():
            if key in self.__dict__:
                setattr(self, key, value)
        self.save()
        return self

    @staticmethod
    def get_by_user(user):
        return Student.query.filter_by(user=user).all()

    def __repr__(self):
        return '<Student %r>' % self.name
