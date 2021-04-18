var path = require("path");
var express = require('express');
var bodyParser = require("body-parser");
var httpErrors = require("http-errors");
var contPaths = require("../settings");
var folderInfo = require("../fox-api/folder-info");
var downloadPrep = require("../fox-api/download-prep");
var serviceMain = require("../service.main");
var router = express.Router();

router.use(bodyParser.urlencoded({extended: false}));


router.get('/', function(req, res, next)
{
	res.send("Storage root");
});


router.get('/user-files/list', function(req, res, next)
{
	var errorObject = null;
	
	folderInfo.getContents(contPaths.userStoragePath, function (storageContentsErr, storageContentsRes)
	{
		if (storageContentsErr !== null)
		{
			errorObject = httpErrors(storageContentsErr);
			return next(errorObject);
		}
		else
		{
			res.send(storageContentsRes);
		}
	});
});


router.get('/user-files/download/:fileName', function(req, res, next)
{
	var preparedFileName = downloadPrep.readFileName(req.params.fileName);
	var downloadPath = path.join(contPaths.userStoragePath, preparedFileName);
	var complete = false;
	var errorObject = null;
	
	downloadPrep.checkDownloadExists(downloadPath, function (existErr, existRes)
	{
		if (existErr !== null)
		{
			errorObject = httpErrors(existErr);
			return next(errorObject);
		}
		else
		{
			res.download(downloadPath, preparedFileName, function (sendErr)
			{
				complete = true;
			});
		}
	});
});


router.get('/global/status', function(req, res, next)
{
	serviceMain.controller.getDiskSpace(function (retrievedDiskSpace)
	{
		res.send(retrievedDiskSpace);
	});
});



module.exports = router;