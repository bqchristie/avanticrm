db.getCollection('customers').createIndex( { "name": 1 }, { unique: true } )