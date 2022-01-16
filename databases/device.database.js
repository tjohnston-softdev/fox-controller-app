/*
	NoSQL database for Remote IO devices.
	Powered by LevelDB.
	Original FOX Controller file.
*/


const path = require("path");
const fs = require("fs");
const level = require("level");
const hashGen = require("hashids");
const createFolder = require("../fox-custom/create-folder");
const databaseHelp = require("../fox-custom/database-help");
const pathSettings = require("../settings");


// Creates database root folder upon start.
createFolder(pathSettings.dbsPath);


// Main function creates LevelDB object.
function loadDatabase(dbName)
{
	var dbFolderPath = path.join(pathSettings.dbsPath, dbName);
	var dbHash = new hashGen(dbName);
	var loadedDatabaseObject = null;
	var loadRes = {};
	
	
	// Create or load database.
	createFolder(dbFolderPath);
	loadedDatabaseObject = level(dbFolderPath);
	
	
	// Read active device entries.
	function callListDevices(listCallback)
	{
		callListAllDevices(false, listCallback);
	}
	
	
	// List device entries.
	function callListAllDevices(deleteStatus, listAllCallback)
	{
		var retrievedEntries = [];
		var readStreamObject = loadedDatabaseObject.createReadStream();
		
		// Read current row.
		readStreamObject.on("data", function (currentEntry)
		{
			addRetrievedEntry(currentEntry, deleteStatus, retrievedEntries);
		});
		
		// Row stream end.
		readStreamObject.on("end", function()
		{
			return listAllCallback(null, retrievedEntries);
		});
	}
	
	
	// Create new device.
	function callCreateDevice(addInputObject, addCallback)
	{
		callUpdateDevice(null, addInputObject, addCallback);
	}
	
	
	// Read existing device.
	function callReadDevice(readTargetID, readCallback)
	{
		var retrievedObject = null;
		
		loadedDatabaseObject.get(readTargetID, function (readErr, readRes)
		{
			if (readErr !== null)
			{
				// Error
				return readCallback(readErr, null);
			}
			else
			{
				// Successful.
				retrievedObject = JSON.parse(readRes);
				return readCallback(null, retrievedObject);
			}
		});
	}
	
	
	// Update existing device.
	function callUpdateDevice(updateTargetID, updateInputObject, updateCallback)
	{
		var preparedID = databaseHelp.generateID(updateTargetID, dbHash);
		var jsonSyntaxObject = {definition: ""};
		
		// Validate and prepare update input.
		databaseHelp.checkUpdateInput(updateInputObject, preparedID, jsonSyntaxObject, function (inpCheckErr, inpCheckRes)
		{
			if (inpCheckErr !== null)
			{
				// Input error.
				return updateCallback(inpCheckErr, null);
			}
			else
			{
				// Execute update.
				handlePut(preparedID, jsonSyntaxObject.definition, updateCallback);
			}
		});
		
	}
	
	// Delete existing device.
	function callDeleteDevice(delTargetID, delPerm, deleteCallback)
	{
		if (delPerm === true)
		{
			// Full deletion.
			loadedDatabaseObject.del(delTargetID, deleteCallback);
		}
		else
		{
			// Set inactive.
			getDeviceForDeletion(delTargetID, deleteCallback);
		}
	}
	
	
	// Close device database.
	function callDatabaseClose(dbCloseCallback)
	{
		loadedDatabaseObject.close(dbCloseCallback);
	}
	
	
	// Secondary - Retrieve device so it can be set inactive.
	function getDeviceForDeletion(delTgtID, getDeleteCallback)
	{
		callReadDevice(delTgtID, function (getDeleteErr, getDeleteRes)
		{
			if (getDeleteErr !== null)
			{
				// Error retrieving device.
				return getDeleteCallback(getDeleteErr, null);
			}
			else
			{
				// Set delete status.
				getDeleteRes.isDeleted = true;
				updateDeleteStatus(delTgtID, getDeleteRes, getDeleteCallback);
			}
		});
	}
	
	
	// Secondary - Save device delete status.
	function updateDeleteStatus(delTgt, delProps, deleteStatusCallback)
	{
		callUpdateDevice(delTgt, delProps, function (statUpdateErr, statUpdateRes)
		{
			if (statUpdateErr !== null)
			{
				// Status update error.
				return deleteStatusCallback(statUpdateErr, null);
			}
			else
			{
				// Status updated successfully.
				return deleteStatusCallback(null, true);
			}
		});
	}
	
	
	
	// Secondary - Execute PUT query.
	function handlePut(putID, putSyntax, putCallback)
	{
		loadedDatabaseObject.put(putID, putSyntax, function (putErr, putRes)
		{
			if (putErr !== undefined && putErr !== null)
			{
				// Error
				return putCallback(putErr, null);
			}
			else
			{
				// Successful.
				return putCallback(null, putID);
			}
		});
	}
	
	// Set database object properties.
	loadRes["listDevices"] = callListDevices;
	loadRes["listAllDevices"] = callListAllDevices;
	loadRes["createDeviceEntity"] = callCreateDevice;
	loadRes["readDeviceEntity"] = callReadDevice;
	loadRes["updateDeviceEntity"] = callUpdateDevice;
	loadRes["deleteDeviceEntity"] = callDeleteDevice;
	loadRes["closeDatabase"] = callDatabaseClose
	
	return loadRes;
}


// Secondary - Read database entry and save to list.
function addRetrievedEntry(dataObj, delStat, entryArr)
{
	var parsedEntry = {};
	
	try
	{
		// Parse string data into JSON.
		parsedEntry = JSON.parse(dataObj.value);
		
		if (delStat === true || parsedEntry.isDeleted !== true)
		{
			// Save.
			entryArr.push(parsedEntry);
		}
	}
	catch(e)
	{
		// Thrown error.
		parsedEntry = null;
	}
}


module.exports = loadDatabase;