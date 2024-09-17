# ENTITY REPOSITORTY PATTERN

The entity repository pattern is a front-end design pattern that allows the centralization & collocation of business logic under the umbrella of a single entity, mainly to build back-office applications.

It uses a few patterns to achieve this:
- Schema-driven UI (Tables, Forms, Data display ...)
- Function-driven UI interactions (Render a form within a modal through a promise, ...)

It also embraces the full power of typescript & nuxt, alongside the powerful reactivity of vue to give developpers a very good developper experience, while keeping the codebase very simple, enforcing consistency and maintainability.

## Entities

Under the `entities` directory, you'll find sub-directories for each entity. Each entity is a directory that contains:
- A `schema.ts` file that defines the schema for the entity's tables, profiles, forms, etc.
- A `action.ts` file that defines the actions that can be performed on the entity.
- A `render.tsx` file that defines the rendering logic for the entity.
- A `utils.ts` file that defines utility functions for the entity.
- A `filter.ts` file that defines the filters for the entity's tables.

## Components

Under the `components/Entity` directory, you'll find sub-directories for each entity, each containing the actual forms / tables / profiles / etc. These components are fairly simple, since most of the logic is defined in the schema files, and the form / tables abstractions are provided by the `sweettools` package.b