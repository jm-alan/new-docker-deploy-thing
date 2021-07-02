from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Conversation

conversation_routes = Blueprint('conversations', __name__)

@conversation_routes.route('/', methods=['GET', 'POST'])
@login_required
def all_conversations():
  if request.method == 'GET':
    return {'conversations': [conversation.to_dict() for conversation in current_user.conversations]}

  elif request.method == 'POST':
    try:
      errors = []
      data = request.json
      for key in data:
        if key not in ['name', 'userIds']:
          del data[key]

      new_conversation = Conversation(name=data['name'])

      if not len(data['userIds']):
        errors.append('Please select at least one person to start a chat')
      elif len(data['userIds']) > 9:
        errors.append('Conversations are currently limited to 10 users')
      else:
        new_conversation.users.append(current_user)
        for userId in data['userIds']:
          if userId != current_user.id:
            if user := User.query.get(userId):
              new_conversation.users.append(user)
      if len(errors):
        return {'errors': errors}

      db.session.add(new_conversation)
      db.session.commit()
    except:
      return {'errors': ['Malformed request']}, 400
