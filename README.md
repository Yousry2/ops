# <a alt="Rentman logo" href="https://rentman.io/" target="_blank" rel="noreferrer"><img src="https://rentman-ops.netlify.app/rentman-logo.svg" width="40"></a> Rentman Ops

<a alt="Rentman logo" href="https://rentman-ops.netlify.app/checkbox.png" target="_blank" rel="noreferrer"><img src="https://rentman-ops.netlify.app/checkbox.png" width="250" ></a>

## ✨ ** [Check Live Demo](https://rentman-ops.netlify.app/assets).✨ **

> [!CAUTION]
> Please note this demo is published on netlify so in order to refresh the app please **Always** navigate to assets page https://rentman-ops.netlify.app/assets and **DON'T** use the homepage url https://rentman-ops.netlify.app/

<br>

## Tasks to be completed

-   [[Done]] ~~Implement the new algorithm to convert folders and items into DFS Tree to easily traverse all items~~

-   [[Done]] ~~Add TanStack Query instead of http resource and use for memoization and auto retrials~~

-   [[Done]] ~~Add input signals to main components~~

-   [[Done]] ~~Implement the new Signal Store~~

-   [[Done]] ~~Add withStorageSync to automatically save selection from signal store~~

-   [[Done]] ~~Add tailwind presets as separate library and extend it in assets app~~

-   [[Done]] ~~Use Json Server and apply configuration to run it locally with development settings~~

-   [[Done]] ~~Deploy on Netlify~~

-   [[Done]] ~~Use Nerlify functions to publish the json backend mocks~~

-   Generate JsDocs

-   Add E2E Testing

<br>

## Run Application locally

1- Make sure you have the latest npm installed in your machine [Download NPM ](https://nodejs.org/en/download). locally I use node v20.9.0

2- Clone the application repository in your machine and using your operating system terminal navigate to the repository root file path

3- Install app libraries using npm

```
npm i
```

4- Start json mock server

```
json-server --watch assets.json
```

5- Run Rentman Assets App

```
npm start
```

<br>

## App Architecture

<img src="https://rentman-ops.netlify.app/graph.png" width="400">

Run the following command in repository root path and then open your browser, navigate to to http://127.0.0.1:4211/projects to check application dependencies and architecture

```
npx nx graph
```

The application consists of the following applications/libraries :

**1- Assets** : Scaffold application which will import all libraries features along with their dependencies and integrate them

**2- Assets-Dashboard** : Feature library that contains all pages/components related to the the feature module

**3- Assets-Store** : Feature library that contains all pages/components related to the the user auth module

[Removed] ~~**4- Asset-Data-Access** : Services Library will handle all domain models, api services~~

**5- Utils** : Utility library to handle all common services and type definitions

**6- Tailwind-Presets** : Contains all tailwind configurations, presets, themes and fonts

**7- environments** : Utility library to contain environment configuration files for all projects

<br>

## Tests

1- [To Be added later] E2E Testing (Playwright)

<br>

## Dependencies :

-   Nx monorepo 20.8

-   Angular 19.2

-   tanstack/angular-query-experimental

-   Angular Signals

-   Angular Signals store NGRX/store

-   Tailwindcss version 3

-   Json-Server

-   angular-architects/ngrx-toolkit
