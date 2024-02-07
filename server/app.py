from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from models import Users, Guitars, Bids, Exchanges, UserLikes, db
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
api = Api(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'your_database_uri_here'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
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
        url = ""
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
class GuitarResource(Resource):
    pass 

class UserLikesResource(Resource):
    def get(self):
        user_likes = [ul.to_dict() for ul in UserLikes.query.all()]
        return user_likes

    def post(self):
        user_likes_data = request.get_json()
        user_likes = UserLikes(**user_likes_data)
        db.session.add(user_likes)
        db.session.commit()
        return user_likes.to_dict(), 201

class UserLikeResource(Resource):
    def get(self, id):
        user_likes = UserLikes.query.get(id)
        return user_likes.to_dict()

    def delete(self, id):
        user_likes = UserLikes.query.get(id)
        if user_likes:
            db.session.delete(user_likes)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'UserLikes not found'}, 404


# Flask routes endpoints

api.add_resource(GuitarsResource, '/guitars')
api.add_resource(GuitarResource, '/guitar/<id>')





if __name__ == '__main__':
    app.run(debug=True)

    
    
    
     
    























if __name__ == "__main__":
    app.run(debug=True)