const settings = require("./remote_io.settings");
const modelTemplate = require("../../fox-custom/model-template");
const modelsArray = [];

defineFirstObject();
defineSecondObject();
modelTemplate.addManufacturer("Sonoff", modelsArray);


function defineFirstObject()
{
	var modelObject = modelTemplate.createModel("Sonoff TH16", "http", 3, 200);
	
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.AI, 2, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.control, settings.ioPrefixes.RO, 1, modelObject.ioConfigs);
	
	modelsArray.push(modelObject);
}


function defineSecondObject()
{
	var modelObject = modelTemplate.createModel("Sonoff Basic", "http", 1, 200);
	modelTemplate.addConfig(settings.ioTypes.control, settings.ioPrefixes.RO, 1, modelObject.ioConfigs);
	modelsArray.push(modelObject);
}


module.exports = modelsArray;