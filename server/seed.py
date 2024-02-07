from app import create_app
from models import db, Users, Guitars, UserLikes, Bids, Exchanges

app = create_app()

with app.app_context():
    def seed():
        try:
            # FOR DEMO:
            # users:
            # 'id': ''
            # 'username': ''
            # 'password': ''
            
            restaurant1 = Restaurant(name='Napex', address='123 Main St, Anytown, USA')
            restaurant2 = Restaurant(name='PLazusus', address='456 Oak St, Cityville, USA')

            pizza1 = Pizza(name='Veggie Delight', ingredients='Dough, Tomato Sauce, Cheese, Mushrooms, Bell Peppers')
            pizza2 = Pizza(name='Meat Lovers', ingredients='Dough, Tomato Sauce, Cheese, Pepperoni, Sausage, Bacon')

            db.session.add_all([restaurant1, restaurant2, pizza1, pizza2])
            db.session.commit()

            restaurant_pizza1 = RestaurantPizza(price=12, pizza=pizza1, restaurant=restaurant1)
            restaurant_pizza2 = RestaurantPizza(price=18, pizza=pizza2, restaurant=restaurant1)
            restaurant_pizza3 = RestaurantPizza(price=22, pizza=pizza1, restaurant=restaurant2)

            db.session.add_all([restaurant_pizza1, restaurant_pizza2, restaurant_pizza3])
            db.session.commit()

            print("Database seeded successfully!")
        except Exception as e:
            print(f"An error occurred while seeding the database: {e}")
            db.session.rollback()

    if __name__ == '__main__':
        seed()