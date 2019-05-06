exports.index = function(req, res, next) {
    res.render('pages/home/index', { title: 'Express' });
}
exports.users = function(req, res, next) {
  res.send('respond with a resource');
}