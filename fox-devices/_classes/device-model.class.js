/*
	Contains classes related to Remote IO devices.
	Original FOX Controller file.
*/


const deviceSettings = require("../device.settings");
const rioSettings = require("../remote_io/remote_io.settings");
const validationTasks = require("../../fox-custom/validation-tasks");



// DeviceModel
function defineDeviceModel(inputModelObj, inputIpAddress)
{
	class DeviceModel
	{
		constructor(inpModel, inpIpAddress)
		{
			this.modelType = inpModel.modelType;
			this.ipAddress = inputIpAddress;
			this.infoUrl = inpModel.infoUrl;
			this.ioContainers = setDeviceIoContainers(inpModel.ioConfigs);
			
			return this;
		}
	}
	
	var defineRes = new DeviceModel(inputModelObj, inputIpAddress);
	return defineRes;
}


// IoContainer
function defineIoContainer(inputIoType, inputIoPrefix, inputIoLength)
{
	class IoContainer
	{
		constructor(inputType, inputPrefix, inputLength)
		{
			this.ioType = inputType;
			this.ioPrefix = inputPrefix;
			this.controlValues = [];
			this.length = inputLength;
			this.commsError = "";
			
			return this;
		}
	}
	
	var defineRes = new IoContainer(inputIoType, inputIoPrefix, inputIoLength);
	return defineRes;
}


// StoredDevice
class StoredDevice
{
	constructor(inputDeviceObj)
	{
		// Local variables.
		var conName = this.constructor.name;
		var validContext = "construction";
		var resultObject = null;
		
		// Validate definition object type.
		validationTasks.checkBaseObject(inputDeviceObj, "device");
		
		// Validate input and set properties.
		this.id = validationTasks.checkStringProp("id", inputDeviceObj.id, null, conName, validContext);
		this.deviceType = validationTasks.checkDeviceTypeProp("deviceType", inputDeviceObj.deviceType, deviceSettings.deviceType.remoteIo);
		this.maker = validationTasks.checkReferenceStringProp("maker", inputDeviceObj.maker, deviceSettings.listRioMakers);
		this.model = validationTasks.checkReferenceStringProp("model", inputDeviceObj.model, deviceSettings.listRioModelTypes);
		this.name = validationTasks.checkStringProp("name", inputDeviceObj.name, null, conName, validContext);
		this.desc = validationTasks.checkStringProp("desc", inputDeviceObj.desc, "", conName, validContext);
		this.ipAddress = validationTasks.checkIpAddressProp("ipAddress", inputDeviceObj.ipAddress);
		this.username = validationTasks.checkStringProp("username", inputDeviceObj.username, "", conName, validContext);
		this.password = validationTasks.checkStringProp("password", inputDeviceObj.password, "", conName, validContext);
		this.isEnabled = validationTasks.checkBooleanProp("isEnabled", inputDeviceObj.isEnabled, null, conName, validContext);
		this.macAddress = validationTasks.checkStringProp("macAddress", inputDeviceObj.macAddress, null, conName, validContext);
		this.isDeleted = validationTasks.checkBooleanProp("isDeleted", inputDeviceObj.isDeleted, false, conName, validContext);
		this.__modified = validationTasks.checkNumberProp("__modified", inputDeviceObj.__modified, 0, conName, validContext);
		
		
		// Initializes SET property event.
		resultObject = new Proxy(this,
		{
			set: handlePropertyUpdate
		});
		
		return resultObject;
	}
}



// Runs when 'StoredDevice' property is changed.
function handlePropertyUpdate(pObject, updKey, updValue)
{
	if (updKey === "id" && updValue !== null)
	{
		// Set ID.
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "id")
	{
		// Null ID.
		pObject[updKey] = null;
	}
	else if (updKey === "deviceType" || updKey === "name" || updKey === "ipAddress" || updKey === "macAddress")
	{
		// General string.
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "maker" || updKey === "model")
	{
		// Reference string.
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "isEnabled" || updKey === "isDeleted")
	{
		// Boolean.
		pObject[updKey] = validationTasks.checkBooleanProp(updKey, updValue, null, "StoredDevice", "setting");
	}
	else if (updKey === "__modified")
	{
		// Modification timestamp.
		pObject[updKey] = validationTasks.checkNumberProp(updKey, updValue, 0, "StoredDevice", "setting");
	}
	else
	{
		// Default string.
		pObject[updKey] = validationTasks.checkStringProp(updKey, updValue, "", "StoredDevice", "setting");
	}
	
	
	return true;
}



// Create IO container objects for 'DeviceModel' class.
function setDeviceIoContainers(configArr)
{
	var configIndex = 0;
	var currentConfigObject = {};
	var currentType = "";
	var currentPrefix = "";
	var currentLength = -1;
	var currentPrepared = null;
	
	var setRes = {};
	
	// Loop IO config objects.
	for (configIndex = 0; configIndex < configArr.length; configIndex = configIndex + 1)
	{
		// Read current IO config.
		currentConfigObject = configArr[configIndex];
		currentType = currentConfigObject.ioType;
		currentPrefix = currentConfigObject.ioPrefix;
		currentLength = currentConfigObject.length;
		
		// Define 'IoContainer' object.
		currentPrepared = defineIoContainer(currentType, currentPrefix, currentLength);
		setRes[currentPrefix] = currentPrepared;
	}
	
	return setRes;
}


module.exports =
{
	DeviceModel: defineDeviceModel,
	IoContainer: defineIoContainer,
	StoredDevice: StoredDevice
};