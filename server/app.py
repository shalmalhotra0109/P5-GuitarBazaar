from flask import Flask, request, make_response
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from models import Users, Guitars, Bids, Exchanges, UserLikes, db
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, jsonify

app = Flask(__name__)
api = Api(app)


app.config["SQLALCHEMY_DATABASE_URI"] = "your_database_uri_here"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
CORS(app)
# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

user_parser = reqparse.RequestParser()
user_parser.add_argument('username', type=str, required=True, help='Username is required')
user_parser.add_argument('password', type=str, required=True, help='Password is required')

# Parser for creating or updating a guitar
guitar_parser = reqparse.RequestParser()
guitar_parser.add_argument('user_id', type=int, required=True, help='User ID is required')
guitar_parser.add_argument('brand', type=str, required=True, help='Brand is required')
guitar_parser.add_argument('model', type=str, required=True, help='Model is required')
guitar_parser.add_argument('material', type=str, required=True, help='Material is required')
guitar_parser.add_argument('description', type=str, required=True, help='Description is required')
guitar_parser.add_argument('accept_bids', type=bool, required=True, help='Accept bids is required')
guitar_parser.add_argument('accept_exchange', type=bool, required=True, help='Accept exchange is required')

# Parser for creating or updating a user like
user_like_parser = reqparse.RequestParser()
user_like_parser.add_argument('guitar_id', type=int, required=True, help='Guitar ID is required')
user_like_parser.add_argument('user_id', type=int, required=True, help='User ID is required')

# Parser for creating or updating a bid
bid_parser = reqparse.RequestParser()
bid_parser.add_argument('guitar_id', type=int, required=True, help='Guitar ID is required')
bid_parser.add_argument('user_id', type=int, required=True, help='User ID is required')
bid_parser.add_argument('offer_price', type=float, required=True, help='Offer price is required')

# Parser for creating or updating an exchange
exchange_parser = reqparse.RequestParser()
exchange_parser.add_argument('guitar_id', type=int, required=True, help='Guitar ID is required')
exchange_parser.add_argument('user_id', type=int, required=True, help='User ID is required')

class UsersResource(Resource):
    def get(self):
        users = [u.to_dict() for u in Users.query.all()]
        return users

    def post(self):
        user_data = request.get_json()
        user = Users(**user_data)
        db.session.add(user)
        db.session.commit()
        return user.to_dict(), 201

class UserResource(Resource):
    def get(self, id):
        user = Users.query.get(id)
        return user.to_dict()

    def delete(self, id):
        user = Users.query.get(id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return "", 204
        else:
            return {"error": "User not found"}, 404

class GuitarsResource(Resource):
    def get(self):
        guitars = [g.to_dict() for g in Guitars.query.all()]
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

    def post(self, id):
        user_data = request.get_json()
        user_likes = UserLikes(**user_data)
        db.session.add(user_likes)
        db.session.commit()
        return user_likes.to_dict(), 201

    def delete(self, id):
        user_likes = UserLikes.query.get(id)
        if user_likes:
            db.session.delete(user_likes)
            db.session.commit()
            return "", 204
        else:
            return {"error": "UserLikes not found"}, 404
class BidsResource(Resource):
    def get(self):
        bids = [b.to_dict() for b in Bids.query.all()]
        return bids

    def post(self):
        bid_data = request.get_json()
        bid = Bids(**bid_data)
        db.session.add(bid)
        db.session.commit()
        return bid.to_dict(), 201

class BidResource(Resource):
    def get(self, id):
        bid = Bids.query.get(id)
        return bid.to_dict()

    def delete(self, id):
        bid = Bids.query.get(id)
        if bid:
            db.session.delete(bid)
            db.session.commit()
            return "", 204
        else:
            return {"error": "Bid not found"}, 404

class ExchangesResource(Resource):
    def get(self):
        exchanges = [e.to_dict() for e in Exchanges.query.all()]
        return exchanges

    def post(self):
        exchange_data = request.get_json()
        exchange = Exchanges(**exchange_data)
        db.session.add(exchange)
        db.session.commit()
        return exchange.to_dict(), 201

class ExchangeResource(Resource):
    def get(self, id):
        exchange = Exchanges.query.get(id)
        return exchange.to_dict()

    def delete(self, id):
        exchange = Exchanges.query.get(id)
        if exchange:
            db.session.delete(exchange)
            db.session.commit()
            return "", 204
        else:
            return {"error": "Exchange not found"}, 404

# Flask routes endpoints
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

    
    
    
     
    






















