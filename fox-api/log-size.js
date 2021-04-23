const sizeFactors = require("../fox-custom/size-factors");
const randomValues = require("../fox-custom/random-values");
const folderItem = require("../fox-custom/folder-item");

// Randomly generates log metadata for Admin Health API.
function getLogSizeObject()
{
	var logSizeBytes = randomValues.generateVolume(8, sizeFactors.KB);
	var logUpdateTime = Date.now();
	var logCreateTime = 1524710340000;			// 2018-04-26 12:39:00 - Optim job listing posted.
	
	
	var infoObject = folderItem.defineItem("fox-controller.log", logSizeBytes, false, logUpdateTime, logCreateTime);
	var logRes = [infoObject];
	return logRes;
}



module.exports =
{
	getObject: getLogSizeObject
};