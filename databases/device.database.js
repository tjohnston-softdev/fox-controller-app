const path = require("path");
const fs = require("fs");
const level = require("level");
const hashGen = require("hashids");
const databaseRoot = "../fox-dbs";
createDatabaseFolder(databaseRoot);


function loadDatabase(dbName)
{
	var dbFolderPath = path.join(databaseRoot, dbName);
	var dbHash = new hashGen(dbName);
	var loadedDatabaseObject = null;
	var loadRes = {};
	
	createDatabaseFolder(dbFolderPath);
	loadedDatabaseObject = level(dbFolderPath);
	
	
	function callListDevices(listCallback)
	{
		callListAllDevices(false, listCallback);
	}
	
	
	function callListAllDevices(deleteStatus, listAllCallback)
	{
		var retrievedEntries = [];
		var readStreamObject = loadedDatabaseObject.createReadStream();
		
		readStreamObject.on("data", function (currentEntry)
		{
			addRetrievedEntry(currentEntry);
		});
		
		readStreamObject.on("end", function()
		{
			return listAllCallback(null, retrievedEntries);
		});
	}
	
	
	
	loadRes["listDevices"] = callListDevices;
	loadRes["listAllDevices"] = callListAllDevices;
	loadRes["createDeviceEntity"] = placeholder;
	loadRes["readDeviceEntity"] = placeholder;
	loadRes["updateDeviceEntity"] = placeholder;
	loadRes["deleteDeviceEntity"] = placeholder;
	
	return loadRes;
}



function createDatabaseFolder(targetPath)
{
	var folderOpts = {recursive: true};
	var folderExists = fs.existsSync(targetPath);
	
	if (folderExists !== true)
	{
		fs.mkdirSync(targetPath, folderOpts);
	}
}


function addRetrievedEntry(dataObj, delStat, entryArr)
{
	var parsedEntry = {};
	
	try
	{
		parsedEntry = JSON.parse(dataObj.value);
		
		if (delStat === true || parsedEntry.isDeleted !== true)
		{
			entryArr.push(parsedEntry);
		}
	}
	catch(e)
	{
		console.log(e.message);
	}
}


function placeholder()
{
	return true;
}



module.exports = loadDatabase;