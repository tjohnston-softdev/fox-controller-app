const fs = require("fs-extra");
const series = require("run-series");
const forEachItem = require("async-each");
const contFolders = require("./settings");
const rioIndex = require("./fox-devices/remote_io/remote-io.index");
const restartTime = 1000;
const maxSize = 64000000;

class Controller
{
	constructor()
	{
		this.temperature = -1;
        this.humidity = -1;
	}
	
	getHealth(healthCallback)
	{
		var healthRes = {};
		return healthCallback(healthRes);
	}
	
	getEnvironment(envCallback)
	{
		var randTemp = Math.random() * 100;
		var randHumid = Math.random() * 100;
		var environmentRes = {};
		
		environmentRes["temperature"] = Math.round(randTemp * 10) / 10;
		environmentRes["humidity"] = Math.round(randHumid * 10) / 10;
		
		return envCallback(environmentRes);
	}
	
	getDiskSpace(diskCallback)
	{
		var randBytes = Math.random() * maxSize;
		return diskCallback(randBytes);
	}
	
	getDatabaseSize(sizeCallback)
	{
		var randBytes = Math.random() * maxSize;
		return sizeCallback(randBytes);
	}
	
	getLogSize(logCallback)
	{
		var randBytes = Math.random() * maxSize;
		return logCallback(randBytes);
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