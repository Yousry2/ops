# Ops

# Rentman Assets App

<a alt="Rentman logo" href="https://rentman-ops.netlify.app/assets" target="_blank" rel="noreferrer"><img src="https://rentman-ops.netlify.app/rentman-logo.svg" width="800"></a>

## ✨ ** [Check Live Demo](https://rentman-ops.netlify.app/assets).✨ **

<br>

> [!CAUTION]
> Please note this demo is published on static github pages so in order to refresh the app please **Always** navigate back to the root page https://rentman-ops.netlify.app/assets and **DON'T** use the homepage url https://rentman-ops.netlify.app/ **OR** the refresh button

<br>

## Tasks to be completed

-   [[Done]] ~~Implement the new algorithm to convert folders and items into DFS Tree to easily traverse all items~~

-   [[Done]] ~~Add TanStack Query instead of http resource and use for memoization and auto retrials ~

-   [[Done]] ~~Add responsive design for mobile and tablet screens~~

-   [[Done]] ~~Add input signals to main components~~

-   [[Done]] ~~Implement the new Signal Store ~~

-   [[Done]] ~~Add withStorageSync to automatically save selection from signal store~~

-   [[Done]] Add tailwind presets as separate library and extend it in assets app

-   Generate JsDocs

-   Add E2E Testing

<br>

## Run Application locally

1- Make sure you have the latest npm installed in your machine [Download NPM ](https://nodejs.org/en/download).

2- Clone the application repository in your machine and using your operating system termminal navigate to the repository root file path

3- Install app libraries using npm

```
npm i
```

4- Run Rentman Assets App

```
npm start
```

<br>

## App Architecture

<img src="https://rentman-ops.netlify.app/graph.jpg" width="800">

Run the following command in repository root path and then navigate open your browser to http://localhost:4200/ to check application dependencies and architecture

```
nx graph
```

The application consists of the following applications/libraries :

**1- Assets** : Scaffold application which will import all libraries features along with their dependencies and integrate them

**2- Assets-Dashboard** : Feature library that contains all pages/components related to the the feature module

**3- Assets-Store** : Feature library that contains all pages/components related to the the user auth module

~~**4- Asset-Data-Access** : Services Library will handle all domain models, api services~~

**5- Utils** : Utility library to handle all common services and type definitions

**6- Tailwind-Presets** : Contains all tailwind configurations, presets, themes and fonts

**7- environments** : Utility library to contain environment configuration files for all projects

<br>

## Tests

### 1- [To Be added later] E2E Testing (Playwright) :

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
