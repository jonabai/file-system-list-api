# File System Listing API

This repository contains sources of the File System Listing API. 
It is an HTTP GraphQL API that exposes the interface to list files in a file system folder.
It follows the Clean Architecture principles and has 100% of test code coverage.

## Getting started (< 2mn)

```
git clone git@github.com:jonabai/file-system-list-api.git
cd file-system-list-api
npm install
npm test
npm start
```

In a browser, open [http://localhost:3000/graphiql](http://localhost:3000/graphiql).

## Running in a Docker container (< 5mn)

```
docker build --tag file-system-list-api .
docker run -p 3000:3000 -v /home/ubuntu:/exposed-folder --name file-system-list-api -dit file-system-list-api
```

In a browser, open [http://localhost:3000/graphiql](http://localhost:3000/graphiql).

The docker container exposes port 3000. Also exposes the volume /exposed-folder. 
This folder will act as root folder for the application.

## GraphQL example query
In a browser, open [http://localhost:3000/graphiql](http://localhost:3000/graphiql).

Paste this query:

```
query{
  files(params: { rootPath: "/",  pageSize: 10, page: 1}) {
    paginationInfo {
      count,
      total,
      page,
      pageSize
    },
    results {
      id,
      fileName,
      fileType,
      fileSize,
      fullPath,
      attributes {
        uid,
        gid,
        mode,
        atimeMs,
        mtimeMs,
        ctimeMs
      }
    }
  }
}
```

## Domain Driven Architectures

Software design is a very hard thing. From years, a trend has appeared to put the business logic, a.k.a. the (Business) Domain, and with it the User, in the heart of the overall system. Based on this concept, different architectural patterns was imaginated.

One of the first and main ones was introduced by E. Evans in its [Domain Driven Design approach](http://dddsample.sourceforge.net/architecture.html).

Based on it or in the same time, other applicative architectures appeared like [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/) (by. J. Palermo), [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/) (by A. Cockburn) or [Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html) (by. R. Martin).

This repository is an exploration of this type of architecture, mainly based on DDD and Clean Architecture, on a concrete and modern NodeJs TypeScript application.

### DDD and Clean Architecture

The application follows the Uncle Bob "[Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)" principles and project structure :

#### Project anatomy

```
app 
 └ bin                              → Application binaries
   └ app.ts                         → Main application entry point
 └ config                           → Configurations folder
 └ node_modules (generated)         → NPM dependencies
 └ src                              → Application sources 
    └ adapters                      → Application infrastructure implementations
       └ driven                     → Outbound adapters
          └ file-system             → File system adapter abstraction
          └ logger                  → Logger adapter abstraction
       └ driving                    → Inbound adapters. Point of entrance to the application
          └ graphql                 → GraphQl route handlers
          └ rest-api                → REST route handlers, implemented using Koa. for now it just includes the /api/health endpoint   
    └ core                          → Application business layer
       └ domain                     → Enterprise core business layer such as domain model objects (Aggregates, Entities, Value Objects)
       └ gateways                   → Application infrastructure interfaces 
       └ use-cases                  → Application business rules
    └ application.ts                → Koa application abstraction    
 └ tests                            → Source folder for e2e tests and test helpers
```

## Tests
This implementation got 100% of code coverage.
To run all tests with code coverage:
```
npm test
```

Tests are distributed by type in the folders:

src/core        -> unit tests
```
npm run test:unit
```

src/adapters    -> integration tests
```
npm run test:integration
```

src/tests/e2e   -> e2e tests
```
npm run test:e2e
```
