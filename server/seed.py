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
            
        #   id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, nullable=True)
    # brand = db.Column(db.String(200))
    # model = db.Column(db.String(200))
    # material = db.Column(db.String(200))
    # description = db.Column(db.String(350))
    # accept_bids = db.Column(db.Boolean, default=False, nullable=False)
    # accept_exchange
            guitar1 = Guitars(user_id=1, brand='Squier',model='Paranormal Jazzmaster XII', material='Body: Poplar, Neck: Maple, Fingerboard: Laurel, Finish: gloss polyurethane')
            guitar2 = Guitars(user_id=2, brand='Gibson',model='Billie Joe Armstrong Les Paul Junior', material='Body: Mahogany, Neck: Mahogany, Fingerboard: Rosewood, Finish: ebony gloss')
            guitar3 = Guitars(user_id=3, brand='Fender',model='Jimmy Page Telecaster', material='Body: Solid Ash, Neck: Maple, Fingerboard: Rosewood, Finish: satin lacquer')
            guitar4 = Guitars(user_id=4, brand='PRS',model='Private Stock Carlos Santana Crossroads edition', material='Body: Mahogany, Neck: Maple, Fingerboard: Brazilian Rosewood, Finish: gloss nitrocellulose lacquer')
            guitar5 = Guitars(user_id=5, brand='PRS',model='Private Stock Carlos Santana Crossroads edition', material='Body: Mahogany, Neck: Maple, Fingerboard: Brazilian Rosewood, Finish: gloss nitrocellulose lacquer')
            guitar6 = Guitars(user_id=6, brand='PRS',model='Private Stock Carlos Santana Crossroads edition', material='Body: Mahogany, Neck: Maple, Fingerboard: Brazilian Rosewood, Finish: gloss nitrocellulose lacquer')
            guitar7 = Guitars(user_id=1, brand='PRS',model='Private Stock Carlos Santana Crossroads edition', material='Body: Mahogany, Neck: Maple, Fingerboard: Brazilian Rosewood, Finish: gloss nitrocellulose lacquer')
            
            

            db.session.add_all([user1, user2, user3, user4, user5, user6, user7, guitar1, guitar2, guitar3, guitar4])
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