// Secondary functions for initializing Remote IO index.

const deviceModelClass = require("../fox-devices/_classes/device-model.class");


// Run initialization.
function runDeviceInitializationLoop(deviceArray, ioArray)
{
	var deviceIndex = 0;
	var currentDevice = {};
	var currentModule = null;
	
	// Loop creates 'StoredDevice' class objects from existing database entries.
	for (deviceIndex = 0; deviceIndex < deviceArray.length; deviceIndex = deviceIndex + 1)
	{
		currentDevice = deviceArray[deviceIndex];
		currentModule = new deviceModelClass.StoredDevice(currentDevice);
		
		if (currentDevice.isEnabled === true && currentModule !== undefined)
		{
			// Set device as running.
			ioArray[currentDevice.id] = currentModule;
		}
	}
}


// Run callback functions.
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