// handler for homepage
exports.index = function(req, res) {
  res.render('index', { title: 'My Title'});
};

