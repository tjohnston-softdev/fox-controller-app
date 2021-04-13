# Changelog

**./fox-devices/remote_io/remote_io.settings.js**
* parseIoPrefixString, parseIoIndexValue
	* Renamed parameter to 'ioSetId'
	* Declared variable 'splitArr'
	* Splitting is performed locally and not through a secondary function.
	* Replaced 'extractIoSetPart' call with `splitArr[x]`
* Removed the function 'extractIoSetPart'
