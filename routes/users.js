var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var userlist = [{"name":"caojian"},{"name":"Lq"}]
router.get('/users', function(req, res, next) {
  res.send(JSON.stringify(userlist));
});


module.exports = router;
