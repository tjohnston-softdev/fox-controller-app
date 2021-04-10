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
	
	
	function callCreateDevice(addInputObject, addCallback)
	{
		callUpdateDevice(null, addInputObject, addCallback);
	}
	
	
	function callReadDevice(targetID, readCallback)
	{
		var retrievedObject = null;
		
		loadedDatabaseObject.get(targetID, function (readErr, readRes)
		{
			if (readErr !== null)
			{
				return readCallback(readErr, null);
			}
			else
			{
				retrievedObject = JSON.parse(readRes);
				return readCallback(null, retrievedObject);
			}
		});
	}
	
	
	function callUpdateDevice(targetID, updateInputObject, updateCallback)
	{
		var objectDefinition = "";
		
		if (updateInputObject === undefined)
		{
			return updateCallback(new Error("Missing entity"), undefined);
		}
		
		updateInputObject["__modified"] = Date.now();
		updateInputObject["id"] = targetID;
		objectDefinition = JSON.stringify(updateInputObject);
		
		loadedDatabaseObject.put(targetID, objectDefinition, function (updateErr, updateRes)
		{
			if (updateErr !== null)
			{
				return updateCallback(updateErr, null);
			}
			else
			{
				return updateCallback(null, updateInputObject.id);
			}
		});
	}
	
	
	
	loadRes["listDevices"] = callListDevices;
	loadRes["listAllDevices"] = callListAllDevices;
	loadRes["createDeviceEntity"] = callCreateDevice;
	loadRes["readDeviceEntity"] = callReadDevice;
	loadRes["updateDeviceEntity"] = callUpdateDevice;
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
		parsedEntry = null;
	}
}


function placeholder()
{
	return true;
}



module.exports = loadDatabase;