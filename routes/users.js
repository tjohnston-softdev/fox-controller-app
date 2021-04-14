var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next)
{
  res.send('respond with a resource');
});


router.get('/sub', function(req, res, next)
{
	res.send("Sub");
});

module.exports = router;
