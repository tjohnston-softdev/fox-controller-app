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
	
	loadRes["listDevices"] = placeholder;
	loadRes["listAllDevices"] = placeholder;
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


function placeholder()
{
	return true;
}



module.exports = loadDatabase;