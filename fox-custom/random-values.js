const hexValues = [];
const deviceTypes = [];

hexValues.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
hexValues.push('a', 'b', 'c', 'd', 'e', 'f');

deviceTypes.push("Device", "Model", "Unit", "Host", "Node");


function generateRandomTime(tsObject)
{
	var timestampNumber = chooseRandomInteger(tsObject.min, tsObject.max);
	return timestampNumber;
}


function generateRandomIpAddress()
{
	var currentNumber = -1;
	var chosenNumbers = [];
	
	while (chosenNumbers.length < 4)
	{
		currentNumber = chooseRandomInteger(0, 255);
		chosenNumbers.push(currentNumber);
	}
	
	var addressString = chosenNumbers.join(".");
	return addressString;
}


function generateRandomIpSix()
{
	var currentPart = "";
	var addressParts = [];
	
	while (addressParts.length < 8)
	{
		currentPart = "";
		
		while (currentPart.length < 4)
		{
			currentPart += chooseRandomElement(hexValues);
		}
		
		addressParts.push(currentPart);
	}
	
	var addressString = addressParts.join(":");
	return addressString;
}


function generateRandomMacAddress()
{
	var currentFirst = "";
	var currentSecond = "";
	var currentPart = "";
	var addressParts = [];
	
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


function generateRandomHost()
{
	var wildcardFlag = chooseRandomInteger(1, 100);
	var descPart = "";
	var numberPart = "";
	
	var hostString = "";
	
	if (wildcardFlag > 30 && wildcardFlag <= 40)
	{
		hostString = "*";
	}
	else
	{
		descPart = chooseRandomElement(deviceTypes);
		numberPart = chooseRandomInteger(1, 9999);
		hostString = descPart + "-" + numberPart;
	}
	
	return hostString;
}


function generateRandomUptime()
{
	var baseValue = process.uptime();
	var multFactor = chooseRandomFloat(1.05, 50.00);
	var uptimeDecimal = baseValue * multFactor;
	var uptimeRounded = Math.round(uptimeDecimal) + 3;
	
	return uptimeRounded;
}


function generateRandomGigahertz()
{
	var baseValue = Math.random() * 5.25;
	var formatValue = baseValue.toFixed(2);
	var ghzNumber = parseFloat(formatValue);
	return ghzNumber;
}


function generateRandomCoreCount()
{
	var baseValue = chooseRandomInteger(1, 16);
	var oddFlag = baseValue % 2;
	var coreCount = baseValue;
	
	if (coreCount > 2)
	{
		coreCount = coreCount - oddFlag;
	}
	
	return coreCount;
}


function generateRandomVolume(maxVol, unitSize)
{
	var baseValue = chooseRandomInteger(1, maxVol);
	var oddFlag = baseValue % 2;
	var unitCount = baseValue;
	
	if (unitCount > 2)
	{
		unitCount = unitCount - oddFlag;
	}
	
	var memoryBytes = unitCount * unitSize;
	return memoryBytes;
}


function generateRandomUsagePercent()
{
	var percentRes = chooseRandomFloat(0.05, 0.95);
	return percentRes;
}



function chooseRandomInteger(lowerLimit, upperLimit)
{
	var difference = upperLimit - lowerLimit;
	var seedValue = Math.random() * difference;
	var intRes = Math.round(lowerLimit + seedValue);
	return intRes;
}


function chooseRandomFloat(lowerLimit, upperLimit)
{
	var difference = upperLimit - lowerLimit;
	var seedValue = Math.random() * difference;
	var floatRes = lowerLimit + seedValue;
	return floatRes;
}


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
	generateInteger: chooseRandomInteger,
	generateFloat: chooseRandomFloat,
	generateArrayElement: chooseRandomElement
};