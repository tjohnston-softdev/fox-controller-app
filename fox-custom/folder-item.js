const path = require("path");
const fs = require("fs");


function readFolderItem(basePath, entryName, resultArray, entryCallback)
{
	var fullPath = path.join(basePath, entryName);
	
	fs.stat(fullPath, function (statErr, entryObject)
	{
		if (statErr !== null)
		{
			return entryCallback(statErr, null);
		}
		else
		{
			handleStatObject(entryName, entryObject, resultArray, entryCallback);
		}
	});
}

function handleStatObject(eName, fileStats, resArr, statCallback)
{
	var correctNameType = checkNameType(eName);
	var correctObjectType = (fileStats instanceof fs.Stats);
	var prepEntry = {};
	
	if (correctNameType === true && correctObjectType === true)
	{
		prepEntry["name"] = eName;
		prepEntry["size"] = fileStats.size;
		prepEntry["isDirectory"] = fileStats.isDirectory();
		prepEntry["modified"] = Math.round(fileStats.mtimeMs);
		prepEntry["created"] = Math.round(fileStats.birthtimeMs);
		
		resArr.push(prepEntry);
		return statCallback(null, true);
	}
	else if (correctNameType === true)
	{
		return statCallback(new Error('fileStats must be an instance of fs.Stats'), null);
	}
	else
	{
		return statCallback(new Error('name must be a string'), null);
	}
	
}


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
	readItem: readFolderItem
};