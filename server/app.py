from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from models import User, Guitar, Sellers, SellerGuitars, UserLikes, Categories, Subcategories, db
from flask_migrate import Migrate
from flask_cors import CORS



app = Flask(__name__)
api = Api(app)

CORS(app)
# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)



class UsersResource(Resource):
    def get(self):
        users = [u.to_dict() for u in User.query.all()]
        return users
    def post(self):
        user_data = request.get_json()
        user = User(**user_data)
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201
    def create_user(self, username):
        url =   # Update with your API URL
        data = {'username': username}
        response = requests.post(url, json=data)
        if response.status_code == 201:
            print(f"User '{username}' created successfully!")
        else:
            print(f"Failed to create user '{username}'")
class UserResource(Resource):
    def get(self, id):
        user = User.query.get(id)
        return user.to_dict()
    
    def delete(self, id):
        user = User.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'User not found'}, 404
class GuitarsResource(Resource):
    def get(self):
        guitars = [g.to_dict() for g in Guitar.query.all()]
        return guitars

    
    
    
     
    























if __name__ == "__main__":
    app.run(debug=True)