# <a alt="Rentman logo" href="https://rentman.io/" target="_blank" rel="noreferrer"><img src="https://rentman-ops.netlify.app/rentman-logo.svg" width="40"></a> Rentman Ops

<a alt="Rentman logo" href="https://rentman-ops.netlify.app/checkbox.png" target="_blank" rel="noreferrer"><img src="https://rentman-ops.netlify.app/checkbox.png" width="250" ></a>

## ✨ ** [Check Live Demo](https://rentman-ops.netlify.app/assets).✨ **

> [!CAUTION]
> Please note this demo is published on netlify so in order to refresh the app please **Always** navigate to assets page https://rentman-ops.netlify.app/assets and **DON'T** use the homepage url https://rentman-ops.netlify.app/

<br>

## Tasks to be completed

-   [[Done]] Implement the new algorithm to convert folders and items into DFS Tree to easily traverse all items

-   [[Done]] Add TanStack Query instead of http resource and use for memoization and auto retrials

-   [[Done]] Add input signals to main components

-   [[Done]] Implement the new Signal Store

-   [[Done]] Add withStorageSync to automatically save selection from signal store

-   [[Done]] Add tailwind presets as separate library and extend it in assets app

-   [[Done]] Use Json Server and apply configuration to run it locally with development settings

-   [[Done]] Deploy on Netlify

-   [[Done]] Configure Netlify to serve asset json file using netlify functions

-   [[Done]] Generate JsDocs

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
json-server --watch assets-data.json
```

5- Run Rentman Assets App

```
npm start
```

6- Open your browser and navigate to http://localhost:4200


<br>

## Project Overview

Run the following command in repository root path and then open your browser, navigate to to http://127.0.0.1:4211/projects to check application dependencies and architecture

```
npx nx graph
```

<img src="https://rentman-ops.netlify.app/graph.png" width="400">


The application consists of the following apps/libraries :

**1- Assets** : Scaffold application which will import all libraries features along with their dependencies and integrate them
**2- Assets-Dashboard** : Feature library that contains all pages/components related to the the feature module
**3- Assets-Store** : Feature library that contains all pages/components related to the the user auth module
**4- Asset-Data-Access** : Services Library will handle all state management , domain models, api services
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



# Project Documentation [[ this section is auto generated ]]

## Project Overview

Rentman Ops is an Angular-based asset management application built with a modern architecture using Nx workspace, Angular 19.2, Signal Store (NGRX/signals), TanStack Query, and Tailwind CSS. The application allows users to browse a hierarchical tree of assets (folders and items), select items, and manage these selections.

## Architecture

The application is structured into the following main components:

```
├── apps/
│   ├── assets/                # Main application shell
│   └── assets-e2e/            # End-to-end tests (Playwright)
└── libs/
    ├── assets/
    │   ├── dashboard/         # Asset dashboard feature library
    │   └── store/             # Asset state management
    └── shared/
        ├── environments/      # Environment configuration
        ├── tailwind-presets/  # Shared Tailwind CSS configuration
        └── utils/             # Shared utilities and types
```

## Core Components and Their Relationships

### 1. Asset Dashboard Components

#### AssetsDashboardComponent
The main container component that displays the asset tree and handles the overall layout.

**Key Functions**:
- Displays the hierarchical tree of assets
- Provides a clear selection button
- Uses `viewChildren` to manage child components

#### AssetNodeComponent
Recursive component that represents a single node (folder or item) in the asset tree.

**Key Functions**:
- Toggles expansion of folders
- Handles asset selection
- Manages selection propagation (parent/child relationships)
- Computes indeterminate states for checkboxes

#### SelectionResultComponent
Displays the currently selected assets.

**Key Functions**:
- Shows a list of selected asset IDs
- Updates automatically when selections change

### 2. Store and State Management

#### AssetsStore
Signal-based store using NGRX/signals to manage application state.

**Key Functions**:
- `setData(assets: RawData)`: Processes raw asset data into a tree structure
- `clearSelection()`: Clears all selected assets
- `toggleAsset(hero: TreeNode, checked: boolean)`: Manages asset selection state

**State Structure**:
```typescript
interface AssetsState {
  data: TreeNode[];        // Asset tree data
  loading: boolean;        // Loading state flag
  selection: number[];     // Selected asset IDs
}
```

**Features**:
- Integration with TanStack Query for data fetching
- Local storage synchronization with `withStorageSync`
- Lifecycle hooks for initialization

#### AssetsApiService
Service for making API calls to retrieve asset data.

**Key Functions**:
- `getAll()`: Fetches all asset data from the API

### 3. Utilities and Data Models

#### Data Models
- `TreeNode`: Represents a node in the asset tree (folder or item)
- `RawData`: Raw data structure from the API
- `FolderRow`: Type for folder data in raw format
- `ItemRow`: Type for item data in raw format

#### Utility Functions
- `buildFolderTree(rawData: RawData)`: Transforms raw data into a hierarchical tree structure

#### TanStack Query Integration
Custom integration with TanStack Query for efficient data fetching with:
- Automatic retries with exponential backoff
- Caching (5-minute stale time)
- Query status management

## Data Flow

1. **Data Fetching**:
   - `AssetsApiService.getAll()` fetches raw data from the API
   - TanStack Query handles caching, retries, and error handling
   - `onInit` lifecycle hook in `AssetsStore` processes data when it arrives

2. **Data Processing**:
   - Raw data is converted to tree structure using `buildFolderTree()`
   - Tree structure is stored in the `AssetsStore` data property

3. **UI Rendering**:
   - `AssetsDashboardComponent` subscribes to the store's data signal
   - Renders `AssetNodeComponent` instances recursively for each node
   - Each node manages its own expanded/collapsed and checked states

4. **Selection Management**:
   - Selecting a node calls `toggleAsset()` in the store
   - Selection propagates to children for folder nodes
   - Selected IDs are stored in the selection property of `AssetsStore`
   - `SelectionResultComponent` displays the current selection

5. **Persistence**:
   - Selection state is automatically synchronized with local storage
   - When the app reloads, selection state is restored from local storage

