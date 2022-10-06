# PrivateSellersSpa (angular_site)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Project Structure

```
|-- app
     |-- modules
       |-- sellers
           |-- [childs modules] // inculding auth, layout, and other modules
           |-- [main_sellers_component]  // has the sellers layout structure
           |-- sellers-routing.module.ts
           |-- sellers.module.ts
       |-- default
           |-- [childs modules] // inculding auth, layout, and other modules
           |-- [main_default_component]  // has the default layout structure
           |-- default-routing.module.ts
           |-- default.module.ts
     |-- core
       |-- [+] guards
       |-- [+] http
       |-- [+] interceptors
       |-- [+] mocks
       |-- [+] services
     |-- shared
          |-- [+] components
          |-- [+] directives
          |-- [+] pipes
          |-- [+] models
          |-- [+] constants
          |-- [+] schemas
     |-- state
          |-- [+] actions
          |-- [+] reducers
|-- assets
     |-- [+] components
     |-- [+] images
     |-- global.scss
     |-- template.scss
     |-- variables.scss
     |-- tvb-utils.scss

```

## State Management

Read [this doc](./docs/state-management.md) to understand how to work with NgRx in this project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Resolving CORS issues

To get data from server without CORS issues, we need to run chrome with disabled security features.

#### For Windows Users
Start menu => search for "run"=> open it
once opened , type the following line in there:
`chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security`

#### For Mac users

```bash
open -na Google\ Chrome --args --disable-web-security --disable-site-isolation-trials
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Deploy to Dev Enviroment

Run `npm run buildMainSSRDev`, then zip the `/dist` folder to `dist.zip`.
Go to [Jenkins](https://dev.thevintagebardev.com:8080/job/Deploy%20angular%20website%20zip/build?delay=0sec) and upload the zip file.
Click on "build" button and let it run.
It may take some time to upload the file to the server.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
