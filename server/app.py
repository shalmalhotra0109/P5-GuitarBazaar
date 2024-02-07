from flask import Flask, request, make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from models import User, Guitar, Sellers, SellerGuitars, UserLikes, Categories, Subcategories, db
from flask_migrate import Migrate
from flask_cors import CORS
from flask import Flask, request, jsonify



app = Flask(__name__)
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

class SellersResource(Resource):
    def get(self):
        sellers = [seller.to_dict() for seller in Sellers.query.all()]
        return sellers

    def post(self):
        seller_data = request.get_json()
        seller = Sellers(**seller_data)
        db.session.add(seller)
        db.session.commit()
        return seller.to_dict(), 201

class SellerResource(Resource):
    def get(self, id):
        seller = Sellers.query.get(id)
        return seller.to_dict()

    def delete(self, id):
        seller = Sellers.query.get(id)
        if seller:
            db.session.delete(seller)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Seller not found'}, 404

class SellerGuitarsResource(Resource):
    def get(self):
        seller_guitars = [sg.to_dict() for sg in SellerGuitars.query.all()]
        return seller_guitars

    def post(self):
        seller_guitar_data = request.get_json()
        seller_guitar = SellerGuitars(**seller_guitar_data)
        db.session.add(seller_guitar)
        db.session.commit()
        return seller_guitar.to_dict(), 201

class SellerGuitarResource(Resource):
    def get(self, id):
        seller_guitar = SellerGuitars.query.get(id)
        return seller_guitar.to_dict()

    def delete(self, id):
        seller_guitar = SellerGuitars.query.get(id)
        if seller_guitar:
            db.session.delete(seller_guitar)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Seller Guitar not found'}, 404
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

class CategoriesResource(Resource):
    def get(self):
        categories = [category.to_dict() for category in Categories.query.all()]
        return categories

    def post(self):
        categories_data = request.get_json()
        categories = Categories(**categories_data)
        db.session.add(categories)
        db.session.commit()
        return categories.to_dict(), 201

class CategoryResource(Resource):
    def get(self, id):
        category = Categories.query.get(id)
        return category.to_dict()

    def delete(self, id):
        category = Categories.query.get(id)
        if category:
            db.session.delete(category)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Category not found'}, 404

class SubcategoriesResource(Resource):
    def get(self):
        subcategories = [subcategory.to_dict() for subcategory in Subcategories.query.all()]
        return subcategories

    def post(self):
        subcategories_data = request.get_json()
        subcategories = Subcategories(**subcategories_data)
        db.session.add(subcategories)
        db.session.commit()
        return subcategories.to_dict(), 201

class SubcategoryResource(Resource):
    def get(self, id):
        subcategory = Subcategories.query.get(id)
        return subcategory.to_dict()

    def delete(self, id):
        subcategory = Subcategories.query.get(id)
        if subcategory:
            db.session.delete(subcategory)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Subcategory not found'}, 404

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

if __name__ == '__main__':
    app.run(debug=True)

    
    
    
     
    























if __name__ == "__main__":
    app.run(debug=True)