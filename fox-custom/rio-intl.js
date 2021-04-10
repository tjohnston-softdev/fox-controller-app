const deviceModelClass = require("../fox-devices/_classes/device-model.class");

function runDeviceInitializationLoop(deviceArray, ioArray)
{
	var deviceIndex = 0;
	var currentDevice = {};
	var currentModule = null;
	
	for (deviceIndex = 0; deviceIndex < deviceArray.length; deviceIndex = deviceIndex + 1)
	{
		currentDevice = deviceArray[deviceIndex];
		currentModule = new deviceModelClass.StoredDevice(currentDevice);
		
		if (currentDevice.isEnabled === true && currentModule !== undefined)
		{
			ioArray[currentDevice.id] = currentModule;
		}
	}
}


function runInitializationCallbackLoop(callbackArr)
{
	var callbackIndex = 0;
	var currentCallback = null;
	
	for (callbackIndex = 0; callbackIndex < callbackArr.length; callbackIndex = callbackIndex + 1)
	{
		currentCallback = callbackArr[callbackIndex];
		currentCallback();
	}
}



module.exports =
{
	runInitializationLoop: runDeviceInitializationLoop,
	runCallbackLoop: runInitializationCallbackLoop
};