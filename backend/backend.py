# backend.py

import os
from pymongo import MongoClient
from flask import Flask
import uuid
from flask import request
from flask_cors import CORS
import json

app = Flask(__name__)
client = MongoClient("mongodb://localhost:27012/")
db = client["userdb"]

CORS(app)

@app.route('/user/create')
def user_create():
    user_id = uuid.uuid4()
    password = request.form["password"]
    username = request.form["username"]
    db.users.insertOne({'userId': user_id, username: username, password: password})
    
@app.route('/user/login', methods=['POST'])
def user_login():

    form = json.loads(request.data)
    password = form["password"]
    username = form["username"]

    query = list(db.users.find({'username': username, 'password': password}))

    if len(query) == 0:
        userId = str(uuid.uuid4())
        db.users.insert_one({ 'userId': userId, 'username': username, 'password': password })
    else:
        userId = query[0]['userId']

    return { 'userId': userId, 'username': username, 'password': password }

##### Balances

@app.route('/balances/<string:userId>', methods=['GET'])
def get_balances(userId):

    foundBalances = list(db.balances.find({'userId': userId}))
    balances = map(lambda x: {'id': x['id'], 'userId': x['userId'], 'name': x['name'], 'balance': x['balance']}, foundBalances)

    return list(balances)

@app.route('/balances', methods=['POST'])
def add_balance():

    form = json.loads(request.data)
    user = form["user"]
    name = form["name"]
    balance = form["balance"]
    balanceId = str(uuid.uuid4())
    new_balance = { 'id': balanceId, 'userId': user['userId'], 'name': name, 'balance': balance }

    db.balances.insert_one({ **new_balance })

    return new_balance

@app.route('/balances/<string:balanceId>', methods=['DELETE'])
def delete_balance(balanceId):

    db.balances.delete_one({ 'id': balanceId })

    return ''

@app.route('/balances', methods=['PUT'])
def update_balance():

    balance = json.loads(request.data)

    db.balances.update_one(
        { 'id': balance['id'] },
        {
            '$set': {
                'name': balance['name'],
                'balance': balance['balance']
            }
        })

    return balance

##### Shares

@app.route('/shares/<string:userId>', methods=['GET'])
def get_shares(userId):

    foundShares = list(db.shares.find({'userId': userId}))
    shares = map(lambda x: {'id': x['id'], 'userId': x['userId'], 'symbol': x['symbol'], 'quantity': x['quantity']}, foundShares)

    return list(shares)

@app.route('/shares', methods=['POST'])
def add_share():

    form = json.loads(request.data)
    user = form["user"]
    symbol = form["symbol"]
    quantity = form["quantity"]
    shareId = str(uuid.uuid4())
    new_share = { 'id': shareId, 'userId': user['userId'], 'symbol': symbol, 'quantity': quantity }

    db.shares.insert_one({ **new_share })

    return new_share

@app.route('/shares/<string:shareId>', methods=['DELETE'])
def delete_share(shareId):

    db.shares.delete_one({ 'id': shareId })

    return ''

@app.route('/shares', methods=['PUT'])
def update_share():

    share = json.loads(request.data)

    db.shares.update_one(
        { 'id': share['id'] },
        {
            '$set': {
                'symbol': share['symbol'],
                'quantity': share['quantity']
            }
        })

    return share

print(list(db.shares.find({})))

if __name__ == "__main__":

    server_port = int(os.environ.get("PORT", 5001)) 
    app.run(debug=False, host="0.0.0.0", port=server_port)
    