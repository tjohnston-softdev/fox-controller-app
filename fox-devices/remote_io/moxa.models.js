const settings = require("./remote_io.settings");
const modelTemplate = require("../../fox-custom/model-template");
const modelsArray = [];

defineModelObject();
modelTemplate.addManufacturer("Moxa", modelsArray);



function defineModelObject()
{
	var modelObject = modelTemplate.createModel("ioLogik E1242", "modbus", 2, 100);
	
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.DI, 8, modelObject.ioConfigs);
	modelTemplate.addConfig(settings.ioTypes.status, settings.ioPrefixes.AI, 4, modelObject.ioConfigs);
	
	modelsArray.push(modelObject);
}


module.exports = modelsArray;