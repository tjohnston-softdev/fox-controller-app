const hexValues = [];
const deviceTypes = [];
const minTime = 3408220800000;				// 2078-01-01
const maxTime = 32503680000000;				// 3000-01-01

hexValues.push('0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
hexValues.push('a', 'b', 'c', 'd', 'e', 'f');

deviceTypes.push("Device", "Model", "Unit", "Host", "Node");


function generateRandomTime()
{
	var timestampNumber = chooseRandomInteger(minTime, maxTime);
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


function generateRandomGigahertz()
{
	var baseValue = Math.random() * 5.1;
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



function chooseRandomInteger(lowerLimit, upperLimit)
{
	var difference = upperLimit - lowerLimit;
	var seedValue = Math.random() * difference;
	var numRes = Math.round(lowerLimit + seedValue);
	return numRes;
}


function chooseRandomElement(subjectArray)
{
	var seedValue = Math.random() * subjectArray.length;
	var charIndex = Math.floor(seedValue);
	var hexRes = subjectArray[charIndex];
	return hexRes;
}



module.exports =
{
	generateTime: generateRandomTime,
	generateIpAddress: generateRandomIpAddress,
	generateMacAddress: generateRandomMacAddress,
	generateHost: generateRandomHost,
	generateGigahertz: generateRandomGigahertz,
	generateCoreCount: generateRandomCoreCount,
	generateVolume: generateRandomVolume
};