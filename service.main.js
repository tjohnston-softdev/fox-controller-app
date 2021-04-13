const restartTime = 2000;

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
		var randBytes = Math.random() * 500000000000;
		return diskCallback(randBytes);
	}
	
	getDatabaseSize(sizeCallback)
	{
		var randBytes = Math.random() * 100000;
		return sizeCallback(randBytes);
	}
	
	getLogSize(logCallback)
	{
		var randBytes = Math.random() * 50000;
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
		setTimeout(function()
		{
			process.exit();
		}, restartTime);
	}
}


const controllerObject = new Controller();

module.exports =
{
	controller: controllerObject
};