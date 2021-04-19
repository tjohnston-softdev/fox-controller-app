const path = require("path");
const fs = require("fs");
const level = require("level");
const hashGen = require("hashids");
const createFolder = require("../fox-custom/create-folder");
const databaseHelp = require("../fox-custom/database-help");
const databaseRoot = "../fox-dbs";
createFolder(databaseRoot);


function loadDatabase(dbName)
{
	var dbFolderPath = path.join(databaseRoot, dbName);
	var dbHash = new hashGen(dbName);
	var loadedDatabaseObject = null;
	var loadRes = {};
	
	createFolder(dbFolderPath);
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
			addRetrievedEntry(currentEntry, deleteStatus, retrievedEntries);
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
		var preparedID = databaseHelp.generateID(updateTargetID, dbHash);
		var objectDefinition = "";
		
		// TODO: Callback Restructure
		databaseHelp.checkUpdateInput(updateInputObject, updateCallback);
		
		updateInputObject["__modified"] = Date.now();
		updateInputObject["id"] = preparedID;
		objectDefinition = JSON.stringify(updateInputObject);
		
		loadedDatabaseObject.put(preparedID, objectDefinition, function (updateErr)
		{
			if (updateErr !== undefined && updateErr !== null)
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
	
	
	function callDatabaseClose(dbCloseCallback)
	{
		loadedDatabaseObject.close(dbCloseCallback);
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
	loadRes["closeDatabase"] = callDatabaseClose
	
	return loadRes;
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



module.exports = loadDatabase;