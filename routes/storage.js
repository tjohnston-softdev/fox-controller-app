var path = require("path");
var express = require('express');
var contPaths = require("../settings");
var folderInfo = require("../fox-api/folder-info");
var downloadPrep = require("../fox-api/download-prep");
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
			res.status(400).send(storageContentsErr.message);
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
	
	downloadPrep.checkDownloadExists(downloadPath, function (existErr, existRes)
	{
		if (existErr !== null)
		{
			res.status(400).send(existErr.message);
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