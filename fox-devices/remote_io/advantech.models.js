const settings = require("./remote_io.settings");
const modelTemplate = require("./model-template");
const modelsArray = [];

defineFirstObject();
defineSecondObject();
modelTemplate.addManufacturer("Advantech", modelsArray);



function defineFirstObject()
{
	var modelObject = modelTemplate.createModel("ADV-1", "modbus", 3, 100);
	
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.DI, 4, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.control, settings.ioPrefixes.RO, 4, modelObject.ioConfigs);
	
	modelsArray.push(modelObject);
}


function defineSecondObject()
{
	var modelObject = modelTemplate.createModel("ADV-2", "modbus", 4, 100);
	
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.AI, 4, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.DI, 4, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.control, settings.ioPrefixes.DO, 2, modelObject.ioConfigs);
	
	modelsArray.push(modelObject);
}



module.exports = modelsArray;