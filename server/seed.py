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
            
            user1 = Users(id=1, username='shalwuzhere', password='shal123')
            user2 = Users(id=2, username='peyton319', password='peyton123')
            user3 = Users(id=3, username='codycoggins', password='cody123')
            user4 = Users(id=4, username='tommorello', password='tomrox123')
            user5 = Users(id=5, username='prince80', password='princeiscool123')
            user6 = Users(id=6, username='chilipeppers1', password='chili')
            user7 = Users(id=7, username='mickfleetwood', password='silversprings')
            

            guitar1 = Guitars(name='Veggie Delight', ingredients='Dough, Tomato Sauce, Cheese, Mushrooms, Bell Peppers')
            pizza2 = Guitars(name='Meat Lovers', ingredients='Dough, Tomato Sauce, Cheese, Pepperoni, Sausage, Bacon')

            db.session.add_all([user1, user2, user3, user4, user5, user6, user7, guitar1])
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