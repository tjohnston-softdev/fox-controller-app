# Changelog

**Test Status**
* Wrote emulation for the '/api/devices/status/:deviceType/:deviceId' endpoint.
* All tests pass successfully.

---

**./fox-api/device-params.js**
* New file - Functions to read parameters for Device API endpoints.

---

**./routes/storage.js**
* Added requirement for '../fox-api/device-params'
* Emulated '/status/' endpoint.
