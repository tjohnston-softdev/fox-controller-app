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
const restartTime = 1000;

class Controller
{
	constructor()
	{
		this.temperature = -1;
        this.humidity = -1;
	}
	
	getHealth(healthCallback)
	{
		var envFunc = this.getEnvironment;
		var databaseFunc = this.getDatabaseSize;
		var logFunc = this.getLogSize;
		
		var healthRes = {};
		
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
		
		series(
		[
			function (setEnvCb)
			{
				envFunc(function(envRes)
				{
					healthRes.environment = envRes;
					return setEnvCb(null, true);
				});
			},
			
			function (setDatabaseCb)
			{
				databaseFunc(function(dbRes)
				{
					healthRes.databaseSize = dbRes;
					return setDatabaseCb(null, true);
				});
			},
			
			function (setLogCb)
			{
				logFunc(function(logRes)
				{
					healthRes.logSize = logRes;
					return setLogCb(null, true);
				});
			}
		],
		function (batchErr, batchRes)
		{
			return healthCallback(healthRes);
		});
		
	}
	
	getEnvironment(envCallback)
	{
		var environmentRes = envSensors.getInfo();
		return envCallback(environmentRes);
	}
	
	getDiskSpace(diskCallback)
	{
		var diskSpaceRes = systemInfo.getMainDisk();
		return diskCallback(diskSpaceRes);
	}
	
	getDatabaseSize(sizeCallback)
	{
		folderInfo.getContents(contFolders.dbsPath, function (getDbSizesErr, getDbSizesRes)
		{
			return sizeCallback(getDbSizesRes);
		});
	}
	
	getLogSize(logCallback)
	{
		var sizeRes = logSize.getObject();
		return logCallback(sizeRes);
	}
	
	stopFlows(stopCallback)
	{
		stopCallback();
	}
	
	startFlows(startCallback)
	{
		startCallback();
	}
	
	restartProcess()
	{
		setTimeout(function()
		{
			process.exit();
		}, restartTime);
	}
	
	
	rebootController()
	{
		this.restartProcess();
	}
	
	
	factoryReset(factResetCallback)
	{
		var callControllerRestart = this.restartProcess;
		
		rioIndex.listRemoteIoDevices(function(deviceQueryErr, deviceQueryRes)
		{
			if (deviceQueryErr !== null)
			{
				return factResetCallback(deviceQueryErr, null);
			}
			else
			{
				clearDatabase(deviceQueryRes, factResetCallback);
			}
		});
		
		
		
		function clearDatabase(deviceListArray, clearCallback)
		{
			forEachItem(deviceListArray,
			function (currentDevice, currentCallback)
			{
				rioIndex.delRemoteIoDevice(currentDevice.id, true, currentCallback);
			},
			function (clearErr, clearRes)
			{
				if (clearErr !== undefined && clearErr !== null)
				{
					return clearCallback(clearErr, null);
				}
				else
				{
					deleteSaveFiles(clearCallback);
				}
			});
		}
		
		
		
		function deleteSaveFiles(deleteCallback)
		{
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
				if (deleteErr !== null)
				{
					return deleteCallback(deleteErr, null);
				}
				else
				{
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