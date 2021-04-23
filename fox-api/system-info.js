// Generates system information objects for Admin Health API.

const osPlatform = require("../fox-custom/os-platform");
const sizeFactors = require("../fox-custom/size-factors");
const randomValues = require("../fox-custom/random-values");
const fsDrive = require("../fox-custom/fs-drive");
const netInterface = require("../fox-custom/net-interface");


// System Time.
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


// CPU Cores.
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
	
	
	// Core loop.
	while (infoRes.cores.length < cpuCores)
	{
		// Generate current core speed.
		currentSpeed = randomValues.generateGigahertz();
		infoRes.cores.push(currentSpeed);
		totalSpeed = totalSpeed + currentSpeed;
		
		
		// Update min speed.
		if (infoRes.min === undefined || currentSpeed < infoRes.min)
		{
			infoRes.min = currentSpeed;
		}
		
		// Update max speed.
		if (infoRes.max === undefined || currentSpeed > infoRes.max)
		{
			infoRes.max = currentSpeed;
		}
		
		// End iteration.
		currentSpeed = null;
	}
	
	// Calculate average and return result.
	infoRes.avg = calculateCpuAverage(cpuCores, totalSpeed);
	return infoRes;
}


// Random Access Memory.
function getMemoryObject()
{
	var memTotal = -1;
	var memPercent = -1;
	var memUsedBytes = -1;
	var memFreeBytes = -1;
	var swapTotal = -1;
	var swapPercent = -1;
	var swapUsedBytes = -1;
	var swapFreeBytes = -1;
	var infoRes = {};
	
	
	// Generate main memory.
	memTotal = randomValues.generateVolume(64, sizeFactors.GB);
	memPercent = randomValues.generateUsagePercent();
	memUsedBytes = Math.floor(memTotal * memPercent);
	memFreeBytes = memTotal - memUsedBytes;
	
	// Generate swap cache.
	swapTotal = Math.floor(memTotal / 2);
	swapPercent = randomValues.generateUsagePercent();
	swapUsedBytes = Math.floor(swapTotal * swapPercent);
	swapFreeBytes = swapTotal - swapUsedBytes;
	
	// Assign result properties.
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


// File System Volumes.
function getFileSystemArray()
{
	var loopNumber = 1;
	var driveCount = randomValues.generateInteger(1, 6);
	
	var currentDriveObject = {};
	var infoRes = [];
	
	for (loopNumber = 1; loopNumber <= driveCount; loopNumber = loopNumber + 1)
	{
		// Generate current volume.
		currentDriveObject = createFileSystemObject(loopNumber);
		infoRes.push(currentDriveObject);
	}
	
	return infoRes;
}


// Network Interfaces.
function getNetworkInterfaceArray()
{
	var loopNumber = 1;
	var networkCount = randomValues.generateInteger(2, 5);
	
	var currentNetworkObject = {};
	var infoRes = [];
	
	// Interface loop.
	for (loopNumber = 1; loopNumber <= networkCount; loopNumber = loopNumber + 1)
	{
		currentNetworkObject = netInterface.initializeObject();
		
		if (loopNumber === 1)
		{
			// The first interface is internal.
			netInterface.setInternal(currentNetworkObject);
		}
		else
		{
			// Others are external.
			currentNetworkObject.iface = "Network Interface " + loopNumber;
			currentNetworkObject.ip4 = randomValues.generateIpAddress();
			currentNetworkObject.ip6 = randomValues.generateIpSix();
			currentNetworkObject.mac = randomValues.generateMacAddress();
		}
		
		
		infoRes.push(currentNetworkObject);
	}
	
	return infoRes;
}


// Disk Space.
function getMainDiskObject()
{
	// Generate single volume.
	var infoRes = createFileSystemObject(1);
	return infoRes;
}



// Generates individual volume object.
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


// Calculates average speed across CPU cores.
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