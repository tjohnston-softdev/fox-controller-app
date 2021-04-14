# Changelog

**Test Status**
* Express server boots successfully on port 3000
* 'Online check' testing works.
* For this emulator, the 'offline' testing still works even when the controller is online.
	* This is because the original controller runs script files in the background whereas the emulated files don't.
	* There is still an error because the tests check whether the controller is offline.

---

**./app.js**
* Renamed to 'server.js'

---

**./bin/www**
* Updated requirement path to '../server.js'
* Renamed variables:
	* 'app' to 'serverFile'
	* 'server' to 'serverObject'
