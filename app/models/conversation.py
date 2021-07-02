from .db import db
from .conversations_users import conversations_users


class Conversation(db.Model):
  __tablename__ = 'conversations'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))

  users = db.relationship('User', secondary=conversations_users, backref='conversations')

  def to_dict(self):
    return {
      'name': self.name,
      'messages': [message.to_dict() for message in self.messages],
      'users': [user.to_dict() for user in self.users]
    }
