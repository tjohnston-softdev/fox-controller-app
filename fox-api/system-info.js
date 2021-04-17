const osPlatform = require("../fox-custom/os-platform");
const sizeFactors = require("../fox-custom/size-factors");
const randomValues = require("../fox-custom/random-values");
const fsDrive = require("../fox-custom/fs-drive");
const netInterface = require("../fox-custom/net-interface");


function getTimeObject()
{
	var infoRes = {};
	
	infoRes["current"] = Date.now();
	infoRes["uptime"] = randomValues.generateUptime();
	infoRes["timezone"] = "GMT+0000";
	infoRes["timezoneName"] = "Coordinated Universal Time (UTC)";
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
	var memPercent = randomValues.generateUsagePercent();
	var memUsedBytes = Math.floor(memTotal * memPercent);
	var memFreeBytes = memTotal - memUsedBytes;
	
	var swapTotal = Math.floor(memTotal / 2);
	var swapPercent = randomValues.generateUsagePercent();
	var swapUsedBytes = Math.floor(swapTotal * swapPercent);
	var swapFreeBytes = swapTotal - swapUsedBytes;
	
	var infoRes = {};
	
	infoRes["total"] = memTotal;
	infoRes["free"] = memFreeBytes;
	infoRes["used"] = memUsedBytes;
	infoRes["active"] = memUsedBytes;
	infoRes["available"] = memFreeBytes;
	infoRes["buffcache"] = randomValues.generateVolume(500, sizeFactors.MB);
	infoRes["swaptotal"] = swapTotal;
	infoRes["swapused"] = swapUsedBytes;
	infoRes["swapfree"] = swapFreeBytes;
	
	return infoRes;
}


function getFileSystemArray()
{
	var loopNumber = 1;
	var driveCount = randomValues.generateInteger(1, 6);
	
	var currentDriveObject = {};
	var infoRes = [];
	
	for (loopNumber = 1; loopNumber <= driveCount; loopNumber = loopNumber + 1)
	{
		currentDriveObject = createFileSystemObject(loopNumber);
		infoRes.push(currentDriveObject);
	}
	
	return infoRes;
}


function getNetworkInterfaceArray()
{
	var loopNumber = 1;
	var networkCount = randomValues.generateInteger(2, 5);
	
	var currentNetworkObject = {};
	var infoRes = [];
	
	for (loopNumber = 1; loopNumber <= networkCount; loopNumber = loopNumber + 1)
	{
		currentNetworkObject = netInterface.initializeObject();
		
		if (loopNumber === 1)
		{
			netInterface.setInternal(currentNetworkObject);
		}
		else
		{
			currentNetworkObject.iface = "Network Interface " + loopNumber;
			currentNetworkObject.ip4 = randomValues.generateIpAddress();
			currentNetworkObject.ip6 = randomValues.generateIpSix();
			currentNetworkObject.mac = randomValues.generateMacAddress();
		}
		
		infoRes.push(currentNetworkObject);
	}
	
	return infoRes;
}


function getMainDiskObject()
{
	var infoRes = createFileSystemObject(1);
	return infoRes;
}



function createFileSystemObject(fsNum)
{
	var currentCapacity = randomValues.generateVolume(3000, sizeFactors.GB);
	var currentUsed = randomValues.generateUsagePercent();
	var newFsObject = fsDrive.initializeObject();
	
	newFsObject.size = String(currentCapacity);
	newFsObject.used = Math.floor(currentCapacity * currentUsed);
	newFsObject.use = currentUsed * 100;
	fsDrive.setFileSystem(fsNum, newFsObject, osPlatform.name);
	
	return newFsObject;
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
	getMemory: getMemoryObject,
	getFileSystems: getFileSystemArray,
	getNetworkInterfaces: getNetworkInterfaceArray,
	getMainDisk: getMainDiskObject
};