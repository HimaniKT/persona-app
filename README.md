# `Persona App` — AngularJS apps to maintain persona details

This project is built on top of angular-seed app

## Getting Started

To get you started you can simply clone the `persona-app` repository and install the dependencies:

### Prerequisites

You need git to clone the `persona-app` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `persona-app`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `persona-app`

Clone the `persona-app` repository using git:

```
git clone https://github.com/persona-app.git
cd persona-app
```

### Install Dependencies

```
npm install
```

Behind the scenes this will also call `npm run copy-libs`, which copies the AngularJS files and
other front end dependencies. After that, you should find out that you have two new directories in
your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/lib` - contains the AngularJS framework files and other front end dependencies

*Note copying the AngularJS files from `node_modules` to `app/lib` makes it easier to serve the
files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`http://localhost:8000/#!/persona`].


## Directory Layout

```
app/                  --> all of the source files for the application
   modules/                -->  template and logic for the application
     persona/              -->  template and logic for view persona
        views/
         card.html            --> the partial template
         persona.html         --> template for view persona
        controllers/
         persona-controller.js --> controller logic for view persona
           test/
             persona-controller-spec.js --> unit test cases for persona controller
        services/
         persona-service.js       --> service for view persona
        styles/
         app.css              --> Stylesheet for vew persona
        models/
         model.js            --> model for view persona
        directives/
         droppable-directive.js  --> directive for view persona
   app.js                --> main application module
   index.html            --> app layout file (the main html template file of the app)
  e2e-tests/            --> end-to-end tests
  protractor-conf.js    --> Protractor config file
  scenarios.js          --> end-to-end scenarios to be run by Protractor
karma.conf.js         --> config file for running unit tests with Karma
package.json          --> Node.js specific metadata, including development tools dependencies
package-lock.json     --> Npm specific metadata, including versions of installed development tools dependencies
```


## Testing

There are two kinds of tests in the `persona-app` application: Unit tests and end-to-end tests.

### Running Unit Tests

The `persona-app` app comes preconfigured with unit tests. These are written in [Jasmine][jasmine],
which we run with the [Karma][karma] test runner. Karma configuration is provided file to run them.

* The configuration is found at `karma.conf.js`.
* The unit tests are found next to the code they are testing and have a `.spec.js` suffix (e.g.
  `persona-controller.spec.js`).

The easiest way to run the unit tests is to use the supplied npm script:

```
npm test
```

This script will start the Karma test runner to execute the unit tests. Moreover, Karma will start
watching the source and test files for changes and then re-run the tests whenever any of them
changes.
This is the recommended strategy; if your unit tests are being run every time you save a file then
you receive instant feedback on any changes that break the expected code functionality.

You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to
check that a particular version of the code is operating as expected. The project contains a
predefined script to do this:

```
npm run test-single-run
```


<a name="e2e-testing"></a>
### Running End-to-End Tests

The `persona-app` app comes with end-to-end tests, again written in [Jasmine][jasmine]. These tests
are run with the [Protractor][protractor] End-to-End test runner. It uses native events and has
special features for AngularJS applications.

* The configuration is found at `e2e-tests/protractor-conf.js`.
* The end-to-end tests are found in `e2e-tests/scenarios.js`.

Protractor simulates interaction with our web app and verifies that the application responds
correctly. Therefore, our web server needs to be serving up the application, so that Protractor can
interact with it.

**Before starting Protractor, open a separate terminal window and run:**

```
npm start
```

In addition, since Protractor is built upon WebDriver, we need to ensure that it is installed and
up-to-date. The `persona-app` project is configured to do this automatically before running the
end-to-end tests, so you don't need to worry about it. If you want to manually update the WebDriver,
you can run:

```
npm run update-webdriver
```

Once you have ensured that the development web server hosting our application is up and running, you
can run the end-to-end tests using the supplied npm script:

```
npm run protractor
```

This script will execute the end-to-end tests against the application being hosted on the
development server.

**Note:**
Under the hood, Protractor uses the [Selenium Standalone Server][selenium], which in turn requires
the [Java Development Kit (JDK)][jdk] to be installed on your local machine. Check this by running
`java -version` from the command line.

If JDK is not already installed, you can download it [here][jdk-download].


## Updating AngularJS and other dependencies

Since the AngularJS framework library code and tools are acquired through package managers (e.g.
npm) you can use these tools to easily update the dependencies. Simply run the preconfigured script:

```
npm run update-deps
```

This will call `npm update` and `npm run copy-libs`, which in turn will find and install the latest
versions that match the version ranges specified in the `package.json` file.

If you want to update a dependency to a version newer than what the specificed range would permit,
you can change the version range in `package.json` and then run `npm run update-deps` as usual.


## Serving the Application Files

While AngularJS is client-side-only technology and it is possible to create AngularJS web apps that
do not require a backend server at all, we recommend serving the project files using a local
web server during development to avoid issues with security restrictions (sandbox) in browsers. The
sandbox implementation varies between browsers, but quite often prevents things like cookies, XHR,
etc to function properly when an HTML page is opened via the `file://` scheme instead of `http://`.

### Running the App during Development

The `persona-app` project comes preconfigured with a local development web server. It is a Node.js
tool called [http-server][http-server]. You can start this web server with `npm start`, but you may
choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from any folder by running:

```
http-server -a localhost -p 8000
```

Alternatively, you can choose to configure your own web server, such as Apache or Nginx. Just
configure your server to serve the files under the `app/` directory.

### Running the App in Production


AngularJS apps are really just a bunch of static HTML, CSS and JavaScript files that need to be
hosted somewhere they can be accessed by browsers.

Persona-app is currently hosted here : https://my-app-56544.firebaseapp.com/#!/persona

## Contact

For more information on AngularJS please check out [angularjs.org][angularjs].


[angularjs]: https://angularjs.org/
[git]: https://git-scm.com/
[http-server]: https://github.com/indexzero/http-server
[jasmine]: https://jasmine.github.io/
[jdk]: https://wikipedia.org/wiki/Java_Development_Kit
[jdk-download]: http://www.oracle.com/technetwork/java/javase/downloads
[karma]: https://karma-runner.github.io/
[local-app-url]: http://localhost:8000/index.html
[node]: https://nodejs.org/
[npm]: https://www.npmjs.org/
[protractor]: http://www.protractortest.org/
[selenium]: http://docs.seleniumhq.org/
[travis]: https://travis-ci.org/
[travis-docs]: https://docs.travis-ci.com/user/getting-started
