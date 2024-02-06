from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from models import User, Guitar, Sellers, SellerGuitars, UserLikes, Categories, Subcategories, db
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, jsonify



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
# Flask routes endpoints
@app.route('/api/users/<int:user_id>/seller-mode', methods=['POST'])
def toggle_seller_mode(user_id):
    user = User.query.get_or_404(user_id)
    user.seller_mode = not user.seller_mode
    db.session.commit()
    return jsonify({'message': 'Seller mode updated successfully'})

@app.route('/api/users/<int:user_id>/seller-options', methods=['POST'])
def update_seller_options(user_id):
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    # Update fields based on the data received
    user.accept_bids = data.get('accept_bids', user.accept_bids)
    user.accept_exchange = data.get('accept_exchange', user.accept_exchange)
    # Add more fields as needed

    db.session.commit()
    return jsonify({'message': 'Seller options updated successfully'})

    
    
    
     
    























if __name__ == "__main__":
    app.run(debug=True)