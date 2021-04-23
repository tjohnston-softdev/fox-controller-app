// Functions for generating random values.

const hexValues = [];
const deviceTypes = [];

// Hex values.
hexValues.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
hexValues.push('a', 'b', 'c', 'd', 'e', 'f');

// Device types.
deviceTypes.push("Device", "Model", "Unit", "Host", "Node");


// Timestamp within range.
function generateRandomTime(tsObject)
{
	var timestampNumber = chooseRandomInteger(tsObject.min, tsObject.max);
	return timestampNumber;
}


// IPv4 Address
function generateRandomIpAddress()
{
	var currentNumber = -1;
	var chosenNumbers = [];
	
	// Generate 8-bit values.
	while (chosenNumbers.length < 4)
	{
		currentNumber = chooseRandomInteger(0, 255);
		chosenNumbers.push(currentNumber);
	}
	
	var addressString = chosenNumbers.join(".");
	return addressString;
}


// IPv6 Address.
function generateRandomIpSix()
{
	var currentPart = "";
	var addressParts = [];
	
	// Outer loop generates groups.
	while (addressParts.length < 8)
	{
		currentPart = "";
		
		// Inner loop generates hex values.
		while (currentPart.length < 4)
		{
			currentPart += chooseRandomElement(hexValues);
		}
		
		addressParts.push(currentPart);
	}
	
	var addressString = addressParts.join(":");
	return addressString;
}


// MAC Address.
function generateRandomMacAddress()
{
	var currentFirst = "";
	var currentSecond = "";
	var currentPart = "";
	var addressParts = [];
	
	// 6 groups of 2 hex values.
	while (addressParts.length < 6)
	{
		currentFirst = chooseRandomElement(hexValues);
		currentSecond = chooseRandomElement(hexValues);
		currentPart = currentFirst + currentSecond;
		addressParts.push(currentPart);
	}
	
	var addressString = addressParts.join(":");
	return addressString;
}


// DHCP Host Name
function generateRandomHost()
{
	var wildcardFlag = chooseRandomInteger(1, 100);
	var descPart = "";
	var numberPart = "";
	
	var hostString = "";
	
	
	if (wildcardFlag > 30 && wildcardFlag <= 40)
	{
		// 10% chance of wildcard.
		hostString = "*";
	}
	else
	{
		// Specific name.
		descPart = chooseRandomElement(deviceTypes);
		numberPart = chooseRandomInteger(1, 9999);
		hostString = descPart + "-" + numberPart;
	}
	
	return hostString;
}


// System uptime.
function generateRandomUptime()
{
	var baseValue = process.uptime();
	var multFactor = chooseRandomFloat(1.05, 50.00);
	var uptimeDecimal = baseValue * multFactor;
	var uptimeRounded = Math.round(uptimeDecimal) + 3;
	
	return uptimeRounded;
}


// CPU core speed in Gigahertz.
function generateRandomGigahertz()
{
	var baseValue = Math.random() * 5.25;
	var formatValue = baseValue.toFixed(2);
	var ghzNumber = parseFloat(formatValue);
	return ghzNumber;
}


// CPU core count.
function generateRandomCoreCount()
{
	var baseValue = chooseRandomInteger(1, 16);
	var oddFlag = baseValue % 2;
	var coreCount = baseValue;
	
	if (coreCount > 2)
	{
		// Round to even.
		coreCount = coreCount - oddFlag;
	}
	
	return coreCount;
}


// Volume size.
function generateRandomVolume(maxVol, unitSize)
{
	var baseValue = chooseRandomInteger(1, maxVol);
	var oddFlag = baseValue % 2;
	var unitCount = baseValue;
	
	if (unitCount > 2)
	{
		// Round to even.
		unitCount = unitCount - oddFlag;
	}
	
	var memoryBytes = unitCount * unitSize;
	return memoryBytes;
}


// Volume usage percent.
function generateRandomUsagePercent()
{
	var percentRes = chooseRandomFloat(0.05, 0.95);
	return percentRes;
}


// Alarm Node ID.
function generateRandomNodeID()
{
	var currentHex = "";
	var firstPart = "";
	var secondPart = "";
	
	// First part.
	while (firstPart.length < 8)
	{
		currentHex = chooseRandomElement(hexValues);
		firstPart += currentHex;
	}
	
	// Second part.
	while (secondPart.length < 6)
	{
		currentHex = chooseRandomElement(hexValues);
		secondPart += currentHex;
	}
	
	var nodeRes = firstPart + "." + secondPart;
	return nodeRes;
}


// Binary value.
function generateRandomFlag()
{
	var seedValue = Math.random();
	var flagRes = Math.round(seedValue);
	return flagRes;
}


// Whole number.
function chooseRandomInteger(lowerLimit, upperLimit)
{
	var difference = upperLimit - lowerLimit;
	var seedValue = Math.random() * difference;
	var intRes = Math.round(lowerLimit + seedValue);
	return intRes;
}


// Decimal number.
function chooseRandomFloat(lowerLimit, upperLimit)
{
	var difference = upperLimit - lowerLimit;
	var seedValue = Math.random() * difference;
	var floatRes = lowerLimit + seedValue;
	return floatRes;
}


// Array element.
function chooseRandomElement(subjectArray)
{
	var seedValue = Math.random() * subjectArray.length;
	var eIndex = Math.floor(seedValue);
	var elementRes = subjectArray[eIndex];
	return elementRes;
}



module.exports =
{
	generateTime: generateRandomTime,
	generateIpAddress: generateRandomIpAddress,
	generateIpSix: generateRandomIpSix,
	generateMacAddress: generateRandomMacAddress,
	generateHost: generateRandomHost,
	generateUptime: generateRandomUptime,
	generateGigahertz: generateRandomGigahertz,
	generateCoreCount: generateRandomCoreCount,
	generateVolume: generateRandomVolume,
	generateUsagePercent: generateRandomUsagePercent,
	generateNodeID: generateRandomNodeID,
	generateFlag: generateRandomFlag,
	generateInteger: chooseRandomInteger,
	generateFloat: chooseRandomFloat,
	generateArrayElement: chooseRandomElement
};