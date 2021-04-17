var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next)
{
	res.send("Storage root");
});


router.get('/user-files/list', function(req, res, next)
{
	// Todo
	var emptyArr = [];
	res.send(emptyArr);
});


router.get('/user-files/download/:fileName', function(req, res, next)
{
	// Todo
	res.send("Download");
});


router.get('/global/status', function(req, res, next)
{
	// Todo
	res.send("Global Status");
});



module.exports = router;