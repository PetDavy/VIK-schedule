import datetime as dt
from app.extentions import db
from werkzeug.security import generate_password_hash


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=dt.datetime.utcnow)

    def __init__(self, username, email, password):
        db.Model.__init__(
            self,
            username=username,
            email=email,
            password=password
        )

        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def __repr__(self):
        return '<User %r>' % self.username
