/*
	Service Main
	Original FOX Controller file.
*/

const os = require("os");
const fs = require("fs-extra");
const series = require("run-series");
const forEachItem = require("async-each");
const contFolders = require("./settings");
const rioIndex = require("./fox-devices/remote_io/remote-io.index");
const deviceInfo = require("./fox-api/device-info");
const systemInfo = require("./fox-api/system-info");
const envSensors = require("./fox-api/env-sensors");
const folderInfo = require("./fox-api/folder-info");
const logSize = require("./fox-api/log-size");
const databaseArray = require("./fox-api/database-array");
const restartTime = 1000;


// FOX Controller class
class Controller
{
	constructor()
	{
		// Set sensor properties.
		this.temperature = -1;
        this.humidity = -1;
	}
	
	// Get Controller status object.
	getHealth(healthCallback)
	{
		var envFunc = null;
		var databaseFunc = null;
		var logFunc = null;
		var healthRes = {};
		
		// Save local functions.
		envFunc = this.getEnvironment;
		databaseFunc = this.getDatabaseSize;
		logFunc = this.getLogSize;
		
		
		// Set health properties.
		healthRes.version = "0.1.0";
		healthRes.serialNumber = os.hostname();
		healthRes.device = deviceInfo.getObject();
		healthRes.time = systemInfo.getTime();
		healthRes.cpuCurrentSpeed = systemInfo.getCPU();
		healthRes.mem = systemInfo.getMemory();
		healthRes.fsSize = systemInfo.getFileSystems();
		healthRes.environment = {};
		healthRes.networkInterfaces = systemInfo.getNetworkInterfaces();
		healthRes.databaseSize = {};
		healthRes.logSize = {};
		
		
		// Assign properties with async controller functions in sequence.
		series(
		[
			function (setEnvCb)
			{
				// environment
				envFunc(function(envRes)
				{
					healthRes.environment = envRes;
					return setEnvCb(null, true);
				});
			},
			
			function (setDatabaseCb)
			{
				// databaseSize
				databaseFunc(function(dbRes)
				{
					healthRes.databaseSize = dbRes;
					return setDatabaseCb(null, true);
				});
			},
			
			function (setLogCb)
			{
				// logSize
				logFunc(function(logRes)
				{
					healthRes.logSize = logRes;
					return setLogCb(null, true);
				});
			}
		],
		function (batchErr, batchRes)
		{
			// Complete
			return healthCallback(healthRes);
		});
		
	}
	
	
	// Get environment sensor information.
	getEnvironment(envCallback)
	{
		var environmentRes = envSensors.getInfo();
		return envCallback(environmentRes);
	}
	
	
	// Get Controller disk space.
	getDiskSpace(diskCallback)
	{
		var diskSpaceRes = systemInfo.getMainDisk();
		return diskCallback(diskSpaceRes);
	}
	
	
	// Get database sizes.
	getDatabaseSize(sizeCallback)
	{
		var dbSizeRes = [];
		
		folderInfo.getContents(contFolders.dbsPath, function (dbFolderErr, dbFolderRes)
		{
			if (dbFolderErr !== null)
			{
				return sizeCallback(dbSizeRes);
			}
			else
			{
				dbSizeRes = databaseArray.prepareArray(dbFolderRes);
				return sizeCallback(dbSizeRes);
			}
		});
	}
	
	// Get log size.
	getLogSize(logCallback)
	{
		var sizeRes = logSize.getObject();
		return logCallback(sizeRes);
	}
	
	
	// Stop flows.
	stopFlows(stopCallback)
	{
		stopCallback();
	}
	
	
	// Start flows.
	startFlows(startCallback)
	{
		startCallback();
	}
	
	
	// Restart Controller process.
	restartProcess()
	{
		setTimeout(function()
		{
			// One second delay.
			process.exit();
		}, restartTime);
	}
	
	
	// Reboot Controller device.
	rebootController()
	{
		this.restartProcess();
	}
	
	
	// Factory reset.
	factoryReset(factResetCallback)
	{
		var callControllerRestart = this.restartProcess;
		
		
		// Retrieve Remote IO devices so they can be deleted.
		rioIndex.listRemoteIoDevices(function(deviceQueryErr, deviceQueryRes)
		{
			if (deviceQueryErr !== null)
			{
				// Query error.
				return factResetCallback(deviceQueryErr, null);
			}
			else
			{
				// Delete devices.
				clearDatabase(deviceQueryRes, factResetCallback);
			}
		});
		
		
		
		// Secondary - Clear Remote IO database.
		function clearDatabase(deviceListArray, clearCallback)
		{
			
			// Loop devices.
			forEachItem(deviceListArray,
			function (currentDevice, currentCallback)
			{
				// Delete current device.
				rioIndex.delRemoteIoDevice(currentDevice.id, true, currentCallback);
			},
			function (clearErr, clearRes)
			{
				// Complete.
				if (clearErr !== undefined && clearErr !== null)
				{
					// Error
					return clearCallback(clearErr, null);
				}
				else
				{
					// Successful.
					deleteSaveFiles(clearCallback);
				}
			});
		}
		
		
		// Delete FOX Controller data.
		function deleteSaveFiles(deleteCallback)
		{
			
			// Perform actions in sequence.
			series(
			[
				rioIndex.closeRioDatabase.bind(null),
				fs.remove.bind(null, contFolders.flowsPath),
				fs.remove.bind(null, contFolders.dbsPath),
				fs.remove.bind(null, contFolders.userStoragePath),
				fs.remove.bind(null, contFolders.logsPath)
			],
			function (deleteErr, deleteRes)
			{
				// Complete.
				if (deleteErr !== null)
				{
					// File delete error.
					return deleteCallback(deleteErr, null);
				}
				else
				{
					// All saved data deleted - Reset device.
					callControllerRestart();
					return deleteCallback(null, true);
				}
			});
		}
	}
}


const controllerObject = new Controller();



module.exports =
{
	controller: controllerObject
};