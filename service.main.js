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
		rioIndex.listRemoteIoDevices(function(deviceQueryErr, deviceQueryRes)
		{
			return factResetCallback(deviceQueryErr, deviceQueryRes);
		});
	}
}


const controllerObject = new Controller();

module.exports =
{
	controller: controllerObject
};