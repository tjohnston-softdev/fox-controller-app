# Changelog

**Test Status**

The cached Moxa device test fails for front-end API requests. This is because that the Control array is empty when it shouldn't be. However, with close inspection, it appears to be a fault with the tests and not the Controller emulation. The same tests failed for the original controller as well.
