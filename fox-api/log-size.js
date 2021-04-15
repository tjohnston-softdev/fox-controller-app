const sizeFactors = require("../fox-custom/size-factors");
const randomValues = require("../fox-custom/random-values");


function getLogSizeObject()
{
	var infoObject = {};
	
	infoObject["name"] = "fox-controller.log";
	infoObject["size"] = randomValues.generateVolume(8, sizeFactors.KB);
	infoObject["isDirectory"] = false;
	infoObject["modified"] = Date.now();
	infoObject["created"] = 1524710340000;			// 2018-04-26 12:39:00
	
	var logRes = [infoObject];
	return logRes;
}



module.exports =
{
	getObject: getLogSizeObject
};