var express = require('express');
var router = express.Router();

// FOX Controller home page.
router.get('/', function(req, res, next)
{
  var params = {title: "FOX Controller Emulator"};
  res.render('index', params);
});

module.exports = router;
