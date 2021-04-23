// Secondary functions for reading file system entries from a folder.

const path = require("path");
const fs = require("fs");


// Main function - Read individual item.
function readFolderItem(basePath, entryName, resultArray, entryCallback)
{
	var fullPath = path.join(basePath, entryName);
	
	// Read file.
	fs.stat(fullPath, function (statErr, entryObject)
	{
		if (statErr !== null)
		{
			// Error.
			return entryCallback(statErr, null);
		}
		else
		{
			// Successful.
			handleStatObject(entryName, entryObject, resultArray, entryCallback);
		}
	});
}


// Processes folder item entry.
function handleStatObject(eName, fileStats, resArr, statCallback)
{
	var correctNameType = checkNameType(eName);
	var correctObjectType = (fileStats instanceof fs.Stats);
	var dirStatus = false;
	var prepEntry = {};
	
	if (correctNameType === true && correctObjectType === true)
	{
		// Entry input valid - Use metadata.
		dirStatus = fileStats.isDirectory();
		prepEntry = defineItemObject(eName, fileStats.size, dirStatus, fileStats.mtimeMs, fileStats.birthtimeMs);
		resArr.push(prepEntry);
		return statCallback(null, true);
	}
	else if (correctNameType === true)
	{
		// Stat object error.
		return statCallback(new Error('fileStats must be an instance of fs.Stats'), null);
	}
	else
	{
		// Name string error.
		return statCallback(new Error('name must be a string'), null);
	}
	
}


// Defines entry metadata object.
function defineItemObject(itemName, itemSize, itemDir, itemModifiedTs, itemCreatedTs)
{
	var defineRes = {};
	
	defineRes["name"] = itemName;
	defineRes["size"] = itemSize
	defineRes["isDirectory"] = itemDir
	defineRes["modified"] = Math.round(itemModifiedTs);
	defineRes["created"] = Math.round(itemCreatedTs);
	
	return defineRes;
}


// Validates name input.
function checkNameType(nValue)
{
	var givenType = typeof nValue;
	var checkRes = false;
	
	if (givenType === "string" && nValue.length > 0)
	{
		checkRes = true;
	}
	
	return checkRes;
}



module.exports =
{
	readItem: readFolderItem,
	defineItem: defineItemObject
};