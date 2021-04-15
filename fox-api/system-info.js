const sizeFactors = require("../fox-custom/size-factors");
const randomValues = require("../fox-custom/random-values");


function getTimeObject()
{
	var infoRes = {};
	
	infoRes["current"] = Date.now();
	infoRes["uptime"] = process.uptime();
	infoRes["timezone"] = "GMT+0000";
	infoRes["timezoneName"] = "Universal";
	infoRes["process"] = process.uptime();
	
	return infoRes;
}


function getCpuObject()
{
	var infoRes = {};
	var cpuCores = randomValues.generateCoreCount();
	var currentSpeed = -1;
	var totalSpeed = 0;
	
	infoRes["min"] = undefined;
	infoRes["max"] = undefined;
	infoRes["avg"] = undefined;
	infoRes["cores"] = [];
	
	while (infoRes.cores.length < cpuCores)
	{
		currentSpeed = randomValues.generateGigahertz();
		infoRes.cores.push(currentSpeed);
		totalSpeed = totalSpeed + currentSpeed;
		
		if (infoRes.min === undefined || currentSpeed < infoRes.min)
		{
			infoRes.min = currentSpeed;
		}
		
		if (infoRes.max === undefined || currentSpeed > infoRes.max)
		{
			infoRes.max = currentSpeed;
		}
		
		currentSpeed = null;
	}
	
	infoRes.avg = calculateCpuAverage(cpuCores, totalSpeed);
	return infoRes;
}


function getMemoryObject()
{
	var memTotal = randomValues.generateVolume(64, sizeFactors.GB);
	var memPercent = Math.random();
	var memUsedBytes = Math.floor(memTotal * memPercent);
	var memFreeBytes = memTotal - memUsedBytes;
	
	var swapTotal = randomValues.generateVolume(8, sizeFactors.GB);
	var swapPercent = Math.random();
	var swapUsedBytes = Math.floor(swapTotal * swapPercent);
	var swapFreeBytes = swapTotal - swapUsedBytes;
	
	var infoRes = {};
	
	infoRes["total"] = memTotal;
	infoRes["free"] = memFreeBytes;
	infoRes["used"] = memUsedBytes;
	infoRes["active"] = memUsedBytes;
	infoRes["available"] = memFreeBytes;
	infoRes["buffcache"] = 0;
	infoRes["swaptotal"] = swapTotal;
	infoRes["swapused"] = swapUsedBytes;
	infoRes["swapfree"] = swapFreeBytes;
	
	return infoRes;
}


function calculateCpuAverage(coreCount, totalSpd)
{
	var divAmount = totalSpd / coreCount;
	var formatValue = divAmount.toFixed(2);
	var calcRes = parseFloat(formatValue);
	return calcRes;
}



module.exports =
{
	getTime: getTimeObject,
	getCPU: getCpuObject,
	getMemory: getMemoryObject
};