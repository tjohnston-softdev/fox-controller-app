// Defines size unit factors.

function calculateSizeFactors()
{
	var baseAmount = 1000;
	var mbSize = baseAmount * baseAmount;
	var gbSize = mbSize * baseAmount;
	var factorObject = {};
	
	factorObject["KB"] = baseAmount;
	factorObject["MB"] = mbSize;
	factorObject["GB"] = gbSize;
	
	return factorObject;
}


module.exports = calculateSizeFactors();