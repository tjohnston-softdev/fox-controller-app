const fs = require("fs");
const forEachItem = require("async-each");
const folderItem = require("../fox-custom/folder-item");


function getDatabaseInformation(rootPathString, dbInfoCallback)
{
	var databaseFolderExists = fs.existsSync(rootPathString);
	var databaseArrayObject = [];
	
	if (databaseFolderExists === true)
	{
		readDatabaseFolder(rootPathString, databaseArrayObject, dbInfoCallback);
	}
	else
	{
		return dbInfoCallback(null, databaseArrayObject);
	}
}


function readDatabaseFolder(rootPathStr, databaseArrayObj, readFolderCallback)
{
	fs.readdir(rootPathStr, function(folderErr, contentEntries)
	{
		if (folderErr !== undefined && folderErr !== null)
		{
			return readFolderCallback(folderErr, null);
		}
		else
		{
			loopFolderContents(rootPathStr, contentEntries, databaseArrayObj, readFolderCallback);
		}
	});
}


function loopFolderContents(rootPath, contentsArray, databaseArray, contentLoopCallback)
{
	forEachItem(contentsArray,
	function (currentName, iterationCallback)
	{
		folderItem.readItem(rootPath, currentName, databaseArray, iterationCallback);
	},
	function (loopErr, loopRes)
	{
		if (loopErr !== undefined && loopErr !== null)
		{
			return contentLoopCallback(loopErr, null);
		}
		else
		{
			return contentLoopCallback(null, databaseArray);
		}
	});
}




module.exports =
{
	getDatabases: getDatabaseInformation
};