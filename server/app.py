from flask import Flask, request, make_response
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from models import Users, Guitars, Bids, Exchanges, UserLikes, db
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, jsonify


# Rest of your code...




    # Register blueprints, routes, etc.

   

app = Flask(__name__)
api = Api(app)

app.secret_key = "b'hy\x91fg\x85\x8c\rq\x00&\xa5\xc3\xa4\xb8\xea'"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db.init_app(app)
CORS(app, resources={r"/*": {"origins": "*"}})
# create a Migrate object to manage schema modifications
migrate  = Migrate(app, db, render_as_batch=True)
class Signup(Resource):
  def post(self):
    username = request.get_json().get('username')
    password = request.get_json().get('password')
    if username and password and not Users.query.filter(Users.username == username).first():
        new_user = Users(
        username = username,
        password = password
        )
        
        try:
            
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        except ValueError:
            return {'error': '422 Unprocessable Entity'}, 422

class Login(Resource):
  def post(self):
    data = request.get_json()
    username = data['username']
    password = data['password']
    user = Users.query.filter(Users.username == username).first()
    if user :
        if user.password == password:
            return make_response(user.to_dict(only=('username', 'id')), 200)
        return {'error': "Unauthorized"}, 401
    return {'error': "User Not Found"}, 404
class CheckSession(Resource):
  def get(self, id):
    user = Users.query.filter(Users.id == id).first()
    if user:
        return make_response(user.to_dict(), 200)
    return {'error': 'Unauthorized'}, 401

class UsersResource(Resource):
    def get(self):
        users = [u.to_dict() for u in Users.query.all()]
        return users
# Create a new User
    # def post(self):
    #     user_data = request.get_json()
    #     user = Users(**user_data)
    #     db.session.add(user)
    #     db.session.commit()
    #     return user.to_dict(), 201
# get a user
class UserResource(Resource):
    def get(self, id):
        user = Users.query.filter(Users.id == id).first()
        if user:
            print(user.to_dict())
        return make_response(user.to_dict(), 200)
# delete a user
    def delete(self, id):
        user = Users.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return "", 204
        else:
            return {"error": "User not found"}, 404
# get all guitars
class GuitarsResource(Resource):
    def get(self):
        guitars = [g.to_dict() for g in Guitars.query.all()]
        return guitars

    def post(self):
        data = request.get_json()
        guitar = Guitars(**data)
        db.session.add(guitar)
        db.session.commit()
        return make_response(guitar.to_dict(), 201)

class GuitarResource(Resource):
    def get(self, id):
        guitars = Guitars.query.filter(Guitars.user_id==id).all()
        return make_response([guitar.to_dict() for guitar in guitars], 200)

    def delete(self, id):
        guitar = Guitars.query.get_or_404(id)
        db.session.delete(guitar)
        db.session.commit()
        return '', 204

    def patch(self, id):
        guitar = Guitars.query.filter(Guitars.id==id).first()
        data = request.get_json()
        for key, value in data.items():
            setattr(guitar, key, value)
        db.session.commit()
        return make_response(guitar.to_dict(), 203)

# get all user likes
class UserLikesResource(Resource):
    def get(self):
        user_likes = [ul.to_dict() for ul in UserLikes.query.all()]
        return user_likes
# new user like
    def post(self):
        user_likes_data = request.get_json()
        user_likes = UserLikes(**user_likes_data)
        db.session.add(user_likes)
        db.session.commit()
        return user_likes.to_dict(), 201
# get user like
class UserLikeResource(Resource):
 
    def get(self, id):
        # Fetch all UserLikes entries for the user
        user_likes_ids = UserLikes.query.filter(UserLikes.user_id == id).all()
        guitar_ids = [like.guitar_id for like in user_likes_ids]

        # Assuming guitar_ids is not empty, fetch all Guitars in a single query
        if guitar_ids:
            likes = Guitars.query.filter(Guitars.id.in_(guitar_ids)).all()
            rb = [like.to_dict() for like in likes]
        else:
            rb = []

        return make_response(rb, 200)

    def post(self, id):
        data = request.get_json()
        guitar_id = data.get('guitar_id')
        existing_like = UserLikes.query.filter(UserLikes.user_id == id, UserLikes.guitar_id == int(guitar_id)).first()
        if existing_like:
            db.session.delete(existing_like)
            db.session.commit()
            return make_response({guitar_id:'none'}, 204)
        else:    
            user_likes = UserLikes(
                user_id = int(id),
                guitar_id = int(guitar_id)
            )
            db.session.add(user_likes)
            db.session.commit()
            return make_response(user_likes.to_dict(), 201)

# all bids
class BidsResource(Resource):
    def get(self):
        bids = [b.to_dict() for b in Bids.query.all()]
        return bids
# new bid
    def post(self):
        bid_data = request.get_json()
        bid = Bids(**bid_data)
        db.session.add(bid)
        db.session.commit()
        return bid.to_dict(), 201
# get bid
class BidResource(Resource):
    def get(self, id):
        bid = Bids.query.get(id)
        return bid.to_dict()
# delete bid
    def delete(self, id):
        bid = Bids.query.get(id)
        if bid:
            db.session.delete(bid)
            db.session.commit()
            return "", 204
        else:
            return {"error": "Bid not found"}, 404
# get all exchanges
class ExchangesResource(Resource):
    def get(self):
        exchanges = [e.to_dict() for e in Exchanges.query.all()]
        return exchanges
# create new exchange
    def post(self):
        exchange_data = request.get_json()
        exchange = Exchanges(**exchange_data)
        db.session.add(exchange)
        db.session.commit()
        return exchange.to_dict(), 201
# get exchange
class ExchangeResource(Resource):
    def get(self, id):
        exchange = Exchanges.query.get(id)
        return exchange.to_dict()
# delete exchange
    def delete(self, id):
        exchange = Exchanges.query.get(id)
        if exchange:
            db.session.delete(exchange)
            db.session.commit()
            return "", 204
        else:
            return {"error": "Exchange not found"}, 404

# Flask routes endpoints
api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session/<id>', endpoint='check_session')
api.add_resource(Login, '/login')
api.add_resource(UsersResource, "/users")
api.add_resource(UserResource, "/user/<id>")
api.add_resource(GuitarsResource, "/guitars")
api.add_resource(GuitarResource, "/guitar/<id>")
api.add_resource(UserLikesResource, "/user-likes")
api.add_resource(UserLikeResource, "/user-like/<id>")
api.add_resource(BidsResource, "/bids")
api.add_resource(BidResource, "/bid/<id>")
api.add_resource(ExchangesResource, "/exchanges")
api.add_resource(ExchangeResource, "/exchange/<id>")

if __name__ == "__main__":
    app.run(debug=True)

    
    
    
     
    






















