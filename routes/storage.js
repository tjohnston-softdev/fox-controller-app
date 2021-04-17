var express = require('express');
var contPaths = require("../settings");
var folderInfo = require("../fox-api/folder-info");
var serviceMain = require("../service.main");
var router = express.Router();


router.get('/', function(req, res, next)
{
	res.send("Storage root");
});


router.get('/user-files/list', function(req, res, next)
{
	folderInfo.getContents(contPaths.userStoragePath, function (storageContentsErr, storageContentsRes)
	{
		if (storageContentsErr !== null)
		{
			res.status(400).send(storageContentsErr);
		}
		else
		{
			res.send(storageContentsRes);
		}
	});
});


router.get('/user-files/download/:fileName', function(req, res, next)
{
	// Todo
	res.send("Test File Contents");
});


router.get('/global/status', function(req, res, next)
{
	serviceMain.controller.getDiskSpace(function (retrievedDiskSpace)
	{
		res.send(retrievedDiskSpace);
	});
});



module.exports = router;