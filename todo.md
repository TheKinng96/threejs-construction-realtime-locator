# Earthbrain MVP TODO

This checklist outlines the concrete steps to fulfill all requirements for the Earthbrain MVP, based on the project overview and roadmap.

---

## Week 1: Project Setup & Core Scene

- [x] **Decide on Frontend Stack**

  - [x] Choose between SvelteKit + Three.js or Plain HTML/JS + Three.js
  - [x] Initialize project (npm, git, etc.)
  - [x] Install Three.js and OrbitControls

- [x] **Basic Scene Setup** (Next Priority)

  - [x] Set up Three.js renderer, camera, and lighting
  - [x] Add a ground plane to the scene
  - [x] Add placeholder structures (boxes, etc.)

- [ ] **Dynamic Map Loading**

  - [ ] Define `maps` collection schema (with `mapDefinition` JSON)
  - [ ] Implement parser to read `mapDefinition` and generate meshes

- [ ] **Controls & Interactions**

  - [x] Add OrbitControls for camera navigation
  - [ ] Implement raycasting for pointer events (clickable markers)
  - [ ] Show tooltip on marker click (e.g., "Worker A: 2nd floor")

- [ ] **Verification**
  - [ ] Verify local build, map geometry loading, and rendering

---

## Week 2: Backend & Data Fetch

- [ ] **Backend Setup**

  - [ ] Set up PocketBase (or SpacetimeDB) instance

- [ ] **Database Schema**

  - [ ] Define `maps`, `points`, and `users` collections

- [ ] **Seed Data**

  - [ ] Add dummy records for maps, points, and users

- [ ] **API Integration**
  - [ ] Implement REST API calls to fetch collections on load
  - [ ] Load all active points/users on frontend

---

## Week 3: Real-Time Integration

- [ ] **WebSocket Integration**

  - [ ] Establish WebSocket connection to backend

- [ ] **Subscriptions**

  - [ ] Subscribe to change events for `points` and `users` collections

- [ ] **Frontend Sync**

  - [ ] Handle create/update events to add/move markers in Three.js scene
  - [ ] Ensure marker positions/status update in real time

- [ ] **Testing**
  - [ ] Test synchronization across multiple clients/tabs

---

## Week 4: Simulation UI & Testing

- [ ] **Simulation Control Page (`/simulate`)**

  - [ ] Create UI form to choose entity type (worker/truck), initial coords, status
  - [ ] Add controls/buttons to move entities (e.g., "move up floor", "drive forward")
  - [ ] Emit position/status updates via WebSocket

- [ ] **3D View Sync**

  - [ ] Ensure updates from simulation page reflect instantly in 3D view

- [ ] **QA**
  - [ ] Conduct cross-browser and multi-tab tests
  - [ ] Prepare deployment scripts

---

## Feature-Specific TODOs

- [ ] **Excavation Detection**

  - [ ] Detect when a digging machine's z-axis drops below ground
  - [ ] Visualize excavation levels (e.g., floor –1) in the scene

- [ ] **Map Loading**
  - [ ] Support dynamic loading of different construction site maps from the `maps` collection

---

## Future Enhancements (Post-MVP)

- [ ] Evaluate SpacetimeDB advanced features (peer-to-peer sync)
- [ ] Add authentication & role-based access (admin vs. viewer)
- [ ] Integrate GIS maps or BIM models for realistic layouts
- [ ] Extend to mobile-optimized controls and touch gestures

---

**Legend:**  
☐ = Not started ☑ = Complete

---

_This file should be updated as tasks are completed or requirements change._
