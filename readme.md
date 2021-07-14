# FOX Controller Emulator
This is a Node JS program I wrote which is used to simulate a prototype build of the FOX Controller, which I helped develop throughout 2018 and wrote a [unit testing script](https://github.com/tjohnston-softdev/fox-controller-app-tests) for.


The reason I wrote a separate emulator is because the original was bloated with too many non-essential libraries and code. It was difficult to navigate, and understand. For the public release of my test script, I decided to reverse-engineer the build and write a stripped-down version that is designed for the unit tests with as little overhead as possible.

---

## Getting Started

1. Download a copy of this repository.
2. Install third-party packages with `npm install`
3. To launch the Controller, run`SET DEBUG=fox-controller-app:* & npm start`
4. Download a copy of [fox-controller-app-tests](https://github.com/tjohnston-softdev/fox-controller-app-tests) and place it in the same root folder as 'fox-controller-app'
5. Run `npm install` on the test script.
6. Run `npm test` to execute the test script.
7. Refer to [fox-controller-app-tests](https://github.com/tjohnston-softdev/fox-controller-app-tests) for further instructions on running the test script.

---

## Size Comparison

| Build     | Size          | Libraries | Front-End |
|-----------|---------------|-----------|-----------|
| Prototype | At least 63MB | Too Many  | Angular   |
| Emulator  | Approx. 9MB   | Minimal   | Raw HTML  |

---

## Disclaimer
This project is licensed under [MIT](https://opensource.org/licenses/MIT). It is only intended to be used with the [test script](https://github.com/tjohnston-softdev/fox-controller-app-tests) I wrote for the FOX Controller but you are free to use this as a basis for your own projects.

This project is the result of reverse-engineering a prototype build of the FOX Controller dated approximately 29 November 2018. All of the code written here is original unless strictly necessary to comply with unit tests. A local copy of the build was kept and used with permission from Optim Controls as a then-employee.

I only claim copyright for the unit testing script and the emulator. I do not take any ownership of the FOX Controller product or Optim Controls as a company. The usage and sharing of this repository does not imply endorsement from Optim Controls and how you use this software is your responsibility.


