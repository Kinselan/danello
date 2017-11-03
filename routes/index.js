var express = require('express'),
    path = require("path"),
    _ = require("underscore"),
    Lists = require(path.resolve(path.dirname(__dirname), "modules/lists")),
    router = express.Router();


// Get all lists
router.get('/', function(req, res, next) {
  res.render('index', {
    list_data: Lists.get()
  });
});

// Create a new list
router.post('/', function(req, res) {
  console.log('into POST route');
  var list = req.body,
      lists = Lists.get();

  list.listID = (Lists.getLastID() + 1).toString();
  list.cards = [];
  lists.push(list);

  Lists.set(lists);

  res.json(list); // ajax call needs this to display immediately!
});

// edit a list (including adding a card)
router.put('/', function(req, res) {
      var lists = Lists.get();
      current_list = _(lists).findWhere({ listID: req.body.listID });
      _.extend(current_list, req.body);
      Lists.set(lists);
      res.status(200).end();
});

// delete a list... not implemented
router.delete('/', function(req, res) {
  var lists = _(Lists.get()).reject(function(a) {
    return a.list_id === +req.body.list_id;
  });

  Lists.set(lists);

  res.status(200).end();
});

module.exports = router;
