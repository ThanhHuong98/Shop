var  db = require('../db');

//Read all Category
exports.all = function(cb)
{
    var collection = db.get().collection('Category');

    collection.find().toArray(function(err, docs){
       cb(err, docs)
    })
}


