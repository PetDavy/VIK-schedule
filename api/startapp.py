from app.app import create_app
from app.settings import Config as CONFIG

app = create_app(CONFIG)