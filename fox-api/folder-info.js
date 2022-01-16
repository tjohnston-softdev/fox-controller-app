// Reads folder contents and returns metadata array.

const fs = require("fs");
const forEachItem = require("async-each");
const folderItem = require("../fox-custom/folder-item");


// Main function.
function getFolderContents(folderPathString, foldContsCallback)
{
	var targetFolderExists = fs.existsSync(folderPathString);
	var entryArrayObject = [];
	
	if (targetFolderExists === true)
	{
		// Read contents.
		readTargetFolder(folderPathString, entryArrayObject, foldContsCallback);
	}
	else
	{
		// Return empty array without error.
		return foldContsCallback(null, entryArrayObject);
	}
}


// Retrieve contents.
function readTargetFolder(folderPathStr, entryArrayObj, readFolderCallback)
{
	fs.readdir(folderPathStr, function(folderErr, contentEntries)
	{
		if (folderErr !== undefined && folderErr !== null)
		{
			// Error reading folder.
			return readFolderCallback(folderErr, null);
		}
		else
		{
			// Read successful - Loop contents.
			loopFolderContents(folderPathStr, contentEntries, entryArrayObj, readFolderCallback);
		}
	});
}



// Defines metadata objects from folder contents.
function loopFolderContents(folderPath, contentsArray, entryArray, contentLoopCallback)
{
	// Loop items.
	forEachItem(contentsArray,
	function (currentName, iterationCallback)
	{
		// Define current item.
		folderItem.readItem(folderPath, currentName, entryArray, iterationCallback);
	},
	function (loopErr, loopRes)
	{
		// End loop.
		
		if (loopErr !== undefined && loopErr !== null)
		{
			// Error
			return contentLoopCallback(loopErr, null);
		}
		else
		{
			// Successful
			return contentLoopCallback(null, entryArray);
		}
	});
}


module.exports =
{
	getContents: getFolderContents
};