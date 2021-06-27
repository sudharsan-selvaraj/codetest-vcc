# WebdriverIO e2e boilerplate

## Project Structure

```
.
├── baseline-images/
│   ├── desktop_chrome
│   └── desktop_firefox
├── test/
│   ├── pages/
│   │   ├── components
│   │   ├── campaign/
│   │   │   ├── components/
│   │   │   ├── sections/
│   │   │   └── index.js
│   │   └── ..pageobjects for other modules
│   ├── services/
│   │   ├── browser-capabilities.services.js
│   │   ├── fluent-element.service.js
│   │   └── ...other services
│   ├── specs/
│   │   ├── campaign/
│   │   │   ├── campaign-common.spec.js
│   │   │   ├── campaign-small-screen.spec.js
│   │   │   └── campaign-large-medium-screen.spec.js
│   │   ├── {module-name}/
│   │   │   ├── {module-name}-common.spec.js
│   │   │   └── {module-name}-${screen-size}.spec.js
│   │   └── ...other modules
│   └── utilis/
│       ├── interaction.utils.js
│       └── ...other utils
└── project-related-files
```

## Local setup:

1. Download and install nodejs(preferably version >= v14.x) based on the Operating system
from [NodeJs download page](https://nodejs.org/en/download/)

2. Download and install docker from [Docker download](https://docs.docker.com/desktop/)

3. Clone the repo to the local machine

```java
git clone 
```

4. Change the working directory to the cloned repo

```
cd 
```

5. Install the dependencies

```
npm install
```

6. Install required browsers (eg. chrome or firefox)

7. Start the selenium server.

```java
npm run webdriver:update
npm run webdriver:start
```

The above command will download and install selenium server jar file and necessary driver executables and starts the
selenium server at `http://localhost:4444/wd/hub`

8. Run the tests

```java
npm run test
```