# Changelog

**./fox-custom/validation-tasks.js**
* Removed 'ip-regex' requirement.
* Required '../validator/isIP'
* IP validation is now handled using the 'validator' library.
	* Before: `ipRegex(ipOpts).test(propValue);`
	* After: `isIP(propValue);`
* Removed 'ipOpts' global object.