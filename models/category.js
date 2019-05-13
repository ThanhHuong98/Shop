var  db = require('../db');

exports.all = function(cb)
{
    var collection = db.get().collection('Category');

    collection.find().toArray(function(err, docs){
       cb(err, docs)
    })
}


