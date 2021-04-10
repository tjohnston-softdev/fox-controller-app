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
	
	
	function callReadDevice(readTargetID, readCallback)
	{
		var retrievedObject = null;
		
		loadedDatabaseObject.get(readTargetID, function (readErr, readRes)
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
	
	
	function callUpdateDevice(updateTargetID, updateInputObject, updateCallback)
	{
		var preparedID = getEntryID(updateTargetID, dbHash);
		var objectDefinition = "";
		
		handleUpdateInputError(updateInputObject, updateCallback);
		
		updateInputObject["__modified"] = Date.now();
		updateInputObject["id"] = preparedID;
		objectDefinition = JSON.stringify(updateInputObject);
		
		loadedDatabaseObject.put(preparedID, objectDefinition, function (updateErr, updateRes)
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
	
	
	function callDeleteDevice(delTargetID, delPerm, deleteCallback)
	{
		if (delPerm === true)
		{
			loadedDatabaseObject.del(delTargetID, deleteCallback);
		}
		else
		{
			getDeviceForDeletion(delTargetID, deleteCallback);
		}
	}
	
	
	function getDeviceForDeletion(delTgtID, getDeleteCallback)
	{
		callReadDevice(delTgtID, function (getDeleteErr, getDeleteRes)
		{
			if (getDeleteErr !== null)
			{
				return getDeleteCallback(getDeleteErr, null);
			}
			else
			{
				getDeleteRes.isDeleted = true;
				updateDeleteStatus(delTgtID, getDeleteRes, getDeleteCallback);
			}
		});
	}
	
	
	function updateDeleteStatus(delTgt, delProps, deleteStatusCallback)
	{
		callUpdateDevice(delTgt, delProps, function (statUpdateErr, statUpdateRes)
		{
			if (statUpdateErr !== null)
			{
				return deleteStatusCallback(statUpdateErr, null);
			}
			else
			{
				return deleteStatusCallback(null, true);
			}
		});
	}
	
	loadRes["listDevices"] = callListDevices;
	loadRes["listAllDevices"] = callListAllDevices;
	loadRes["createDeviceEntity"] = callCreateDevice;
	loadRes["readDeviceEntity"] = callReadDevice;
	loadRes["updateDeviceEntity"] = callUpdateDevice;
	loadRes["deleteDeviceEntity"] = callDeleteDevice;
	
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


function getEntryID(existingValue, hashObj)
{
	var existType = typeof existingValue;
	var randomSeed = null;
	var resultID = null;
	
	if (existType === "string" && existingValue.length > 0)
	{
		resultID = existingValue;
	}
	else
	{
		randomSeed = Date.now();
		resultID = hashObj.encode(randomSeed);
	}
	
	return resultID;
}


function handleUpdateInputError(inpObj, errorCallback)
{
	if (inpObj === undefined)
	{
		return errorCallback(new Error("Missing entity"), null);
	}
}



module.exports = loadDatabase;