/*
	Adventech model definitions.
	Original FOX Controller file.
*/

const settings = require("./remote_io.settings");
const modelTemplate = require("../../fox-custom/model-template");
const modelsArray = [];

defineFirstObject();
defineSecondObject();
modelTemplate.addManufacturer("Advantech", modelsArray);


// WISE-4060
function defineFirstObject()
{
	var modelObject = modelTemplate.createModel("WISE-4060", "modbus", 3, 100);
	
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.DI, 4, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.control, settings.ioPrefixes.RO, 4, modelObject.ioConfigs);
	
	modelsArray.push(modelObject);
}


// WISE-4012
function defineSecondObject()
{
	var modelObject = modelTemplate.createModel("WISE-4012", "modbus", 4, 100);
	
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.AI, 4, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.DI, 4, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.control, settings.ioPrefixes.DO, 2, modelObject.ioConfigs);
	
	modelsArray.push(modelObject);
}



module.exports = modelsArray;