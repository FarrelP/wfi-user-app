# Users Management App (Nuxt + Pinia)

This project is a Nuxt-based user management application built with focus in **clean architecture, strong separation of concerns, and predictable state management**, while fulfilling all functional and technical requirements.

---

## 1. Setup Instructions

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Lint the project
npm run lint
```

The app will be available at:

```
http://localhost:3000
```

---

## 2. Functionality Requirements Assessment

| Requirement          | Details                                                                                                      | Status |
| -------------------- | ------------------------------------------------------------------------------------------------------------ | ------ |
| User List View       | Identity (ID, Avatar, Full Name), Demographics (Birth Date, Age, Gender), Role Badge, Contact (Email, Phone) | ✅      |
| User Detail Page     | Header, Personal Stats, Location, Employment & Education, Finance & Tech sections                            | ✅      |
| CRUD Simulation      | Client-side create, update, delete with immediate UI feedback                                                | ✅      |
| Filter, Search, Sort | Search by name/email, filter by role, sort by name/email/age                                                 | ✅      |
| Pagination           | Page-based pagination with configurable page size                                                            | ✅      |
| Responsive Design    | Optimized for desktop & mobile layouts                                                                       | ✅      |
---


## 3. Technical Requirements Assessment

| Requirement                           | Status           |
| ------------------------------------- | ---------------- |
| Vue 3 (`<script setup>`)              | ✅ Yes (via Nuxt) |
| Pinia for state management            | ✅ Yes            |
| DummyJSON Users API                   | ✅ Yes            |
| Server-derived vs UI state separation | ✅ Yes            |
| No external UI libraries              | ✅ Yes            |
| Tailwind CSS                          | ✅ Yes            |
| Vite dev environment                  | ✅ Yes (via Nuxt) |
---

## 4. Bonus Features Achieved

The following bonus points have been implemented:

* ✅ **Linter setup** (ESLint)
* ✅ **Animations** (UI transitions for list changes and modal interactions)
* ✅ **URL-based state** (pagination, filters, sorting)
* ✅ **Form validation and error handling**
* ✅ **Using Nuxt**
* ✅ **Optimistic UI updates**
* ✅ **Smart client-side caching with request deduplication**

---

## 5. Brief Description of the Solution

This application is built with **Nuxt** as the application framework and **Pinia** for state management. The primary goal of the solution is to demonstrate a **clean, scalable frontend architecture** rather than a minimal demo implementation.

### Architecture Overview

The project follows a **layered architecture** with clear responsibility boundaries:

#### 1. Project Structure
```text
app/
├── assets/
│   └── css/
│       └── main.css
│       # Global styles (Tailwind CSS entry)
│
├── components/
│   ├── ConfirmModal.vue
│   └── users/
│       ├── CardList.vue
│       ├── Table.vue
│       ├── Filter.vue
│       ├── Pagination.vue
│       └── FormModal.vue
│       # Reusable UI components (list, cards, filters, modals)
│
├── composables/
│   └── useUsersView.ts
│   # View-model layer for filtering, sorting, pagination
│
├── pages/
│   └── users/
│       ├── index.vue
│       └── [id].vue
│       # Route-based pages (User List & User Detail)
│
├── plugins/
│   └── apiFetch.ts
│   # API client / fetch abstraction
│
├── services/
│   └── userService.ts
│   # API service layer (DummyJSON Users API)
│
├── stores/
│   ├── users.server.ts
│   └── users.ui.ts
│   # Pinia stores
│   # - server: normalized data, cache, mutations
│   # - ui: page, filter, sort, pagination state
│
├── types/
│   └── user.ts
│   # Shared TypeScript types & interfaces
│
└── app.vue
    # Application root
```

#### 2. Server Store Layer (`users.server.ts`)

* Owns all **server-derived state**
* Responsible for async data fetching from the DummyJSON API
* Normalizes user data into `byId` / `allIds` structures
* Applies smart client-side caching and request deduplication
* Never contains UI-specific logic

#### 3. UI Store Layer (`users.ui.ts`)

* Manages **pure UI state** such as modals, form state, and optimistic mutation flags
* Coordinates optimistic updates and rollback logic
* Decoupled from data-fetching concerns

#### 4. View Model Layer (`useUsersView.ts`)

* Acts as a presentation-focused layer
* Handles filtering, sorting, searching, and pagination
* Consumes reactive inputs but remains independent from Pinia and Nuxt
* Improves testability and reuse

#### 5. Page & Component Layer

* Pages orchestrate data flow between stores and view models
* Components are kept presentational and stateless where possible
* Animations and UX behaviors are implemented at this layer

This separation ensures:

* Predictable state flow
* Improved maintainability
* Easier future extension (SSR, testing, new data sources)

---

## 6. Async Data, Filtering, Sorting, and Pagination Handling

### Async Data

* Data is fetched from the DummyJSON Users API
* Requests are deduplicated to avoid duplicate network calls
* Cached data is reused across list and detail pages

### Filtering & Sorting

* Implemented inside a dedicated view-model composable (`useUsersView`)
* Filtering, sorting, and searching are computed-based and reactive
* Query state is derived from the URL

### Pagination

* Pagination is computed on the client side
* Current page and page size are synced with the URL
* Ensures shareable and reload-safe state

---

## 7. Optimistic UI Strategy

* UI updates are applied immediately
* A backup of previous state is kept during mutations
* If an operation fails, state is rolled back safely

This approach improves perceived performance and UX.

---

## 8. Final Notes

This project emphasizes **clarity, maintainability, and correctness over shortcuts**. Architectural decisions were made to reflect real-world production patterns rather than minimal demo implementations.
