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
│   │   │   └── campaign-large-medium-screen.spec.js]
│   │   ├── {module-name}/
│   │   │   ├── {module-name}-common.spec.js
│   │   │   └── {module-name}-${screen-size}.spec.js
│   │   └── ...other modules
│   └── utilis/
│       ├── interaction.utils.js
│       └── ...other utils
└── project-related-files

```