const fs = require("fs");
const forEachItem = require("async-each");
const folderItem = require("../fox-custom/folder-item");


function getFolderContents(folderPathString, foldContsCallback)
{
	var targetFolderExists = fs.existsSync(folderPathString);
	var entryArrayObject = [];
	
	if (targetFolderExists === true)
	{
		readTargetFolder(folderPathString, entryArrayObject, foldContsCallback);
	}
	else
	{
		return foldContsCallback(null, entryArrayObject);
	}
}


function readTargetFolder(folderPathStr, entryArrayObj, readFolderCallback)
{
	fs.readdir(folderPathStr, function(folderErr, contentEntries)
	{
		if (folderErr !== undefined && folderErr !== null)
		{
			return readFolderCallback(folderErr, null);
		}
		else
		{
			loopFolderContents(folderPathStr, contentEntries, entryArrayObj, readFolderCallback);
		}
	});
}


function loopFolderContents(folderPath, contentsArray, entryArray, contentLoopCallback)
{
	forEachItem(contentsArray,
	function (currentName, iterationCallback)
	{
		folderItem.readItem(folderPath, currentName, entryArray, iterationCallback);
	},
	function (loopErr, loopRes)
	{
		if (loopErr !== undefined && loopErr !== null)
		{
			return contentLoopCallback(loopErr, null);
		}
		else
		{
			return contentLoopCallback(null, entryArray);
		}
	});
}




module.exports =
{
	getContents: getFolderContents
};