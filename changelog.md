# Changelog

**Test Status**
* Test results unaffected by IP validation change.

---

**./package.json**
* Uninstalled 'validator'
* Installed 'ip-regex'

---

**./fox-custom/validation-tasks.js**
* Removed 'validator' module requirement.
* Required 'ip-regex' module.
* Declared 'ipOpts' global variable.
	* Contains IP address validation settings
* checkIpAddressProperty
	* Replaced `validator.isIP` with `ipRegex(ipOpts).test`
