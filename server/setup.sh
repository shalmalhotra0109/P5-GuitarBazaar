rm -rf instance
rm -rf migrations
flask db init
flask db migrate -m "initialization"
flask db upgrade
python seed.py