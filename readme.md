## 1. Overview

Earthbrain's core value is real-time, 3D visualization of on-site activity. This MVP replicates that by showing:

- A Three.js scene of the construction area.
- Live updates of simulated users (workers, vehicles) via WebSockets.

## 2. Objectives

- **Visualize** construction progress in 3D with interactive controls.
- **Simulate** on-site users sending location/status in real time.
- **Evaluate** a simple, maintainable tech stack (framework or plain HTML) for MVP.

## 3. Project Structure

```
src/
├── lib/                    # Shared components and utilities
│   ├── constructionView/   # Construction site 3D visualization
│   │   ├── ConstructionView.svelte
│   │   └── components/     # Sub-components for the construction view
│   │       ├── Ground.svelte
│   │       ├── Markers.svelte
│   │       └── Controls.svelte
│   └── utils/             # Utility functions and helpers
├── routes/                # SvelteKit routes
│   ├── +page.svelte      # Main construction view
│   └── simulate/         # Simulation control page
└── app.css               # Global styles
```

## 4. MVP Feature List

1. **3D Construction View**
   - Orbit controls for zoom / rotate / pan.
   - Clickable markers to inspect individual elements.
2. **Real-Time User Simulation**
   - WebSocket-driven position/status updates.
   - On-screen markers moving in sync with backend data.
3. **Excavation Detection for Digging Machines**
   - Interpret z-axis changes: when a digging machine marker lowers below ground (z decreases), visualize excavation levels (e.g., floor –1).

## 5. Pages & Flows

### 5.1 Construction Area Page (`/`)

- **Three.js scene**: ground plane + placeholder structures.
- **Markers**: dots or basic meshes representing trucks/workers.
- **Interactions**:
  - `OrbitControls` for camera navigation.
  - Raycasting for pointer events: click to show a tooltip (e.g., "Worker A: 2nd floor").
- **Data**:
  - On load: fetch all active points/users.
  - Subscribe to real-time updates via WebSocket or backend service.

### 5.2 Simulation Control Page (`/simulate`)

- **UI form**: choose entity type (worker/truck), initial coords, status.
- **Controls**:
  - Buttons to move entities (e.g., "move up floor", "drive forward").
- **Data flow**:
  - Send updates through WebSocket to backend.
  - Backend broadcasts to all clients.

## 6. Tech Stack

- **Frontend**:
  - Option A: **SvelteKit** + Three.js
  - Option B: **Plain HTML/JavaScript** + Three.js
- **Realtime Backend**: PocketBase (built-in WebSocket) or SpacetimeDB
- **Database**: SQLite (via PocketBase) or SpacetimeDB's engine
- **Hosting**:
  - Frontend: Vercel, GitHub Pages, or static web server
  - Backend: DigitalOcean droplet, Heroku free tier, or self-hosted

> _Rationale_: Both SvelteKit and plain HTML setups can render Three.js. PocketBase offers zero-backend overhead, while SpacetimeDB adds advanced real-time tools if needed.

## 7. Data Model

Each construction site has its own 3D map definition, stored in a `maps` collection so the environment geometry and metadata can be loaded dynamically.

| Collection | Fields                                                                                              |
| ---------- | --------------------------------------------------------------------------------------------------- |
| `maps`     | `id`, `name`, `mapDefinition` (JSON defining shapes: planes, boxes, etc.), `metadata` (e.g., scale) |
| `points`   | `id`, `mapId`, `x`, `y`, `z`, `label`, `type`                                                       |
| `users`    | `id`, `mapId`, `name`, `position` `{x, y, z}`, `status`                                             |

#### mapDefinition Example

```json
{
	"shapes": [
		{
			"type": "plane",
			"width": 100,
			"height": 100,
			"position": { "x": 0, "y": 0, "z": 0 },
			"rotation": { "x": -1.5708, "y": 0, "z": 0 }
		},
		{
			"type": "box",
			"width": 20,
			"height": 10,
			"depth": 20,
			"position": { "x": 0, "y": 5, "z": 0 }
		},
		{
			"type": "box",
			"width": 10,
			"height": 15,
			"depth": 10,
			"position": { "x": 30, "y": 7.5, "z": -20 }
		}
	],
	"metadata": { "scale": 1 }
}
```

## 8. Real-Time Data Flow

- Client connects to backend WebSocket.
- Subscribes to points and users channels.
- On record change (create/update), server emits an event.
- Frontend handler updates Three.js objects accordingly.

## 9. Implementation Roadmap & TODOs

**Week 1: Project Setup & Core Scene**  
Deliverable: Scaffold project, load Three.js scene, and generate map geometry from basic shapes.

**TODOs:**

- Choose framework (SvelteKit) or plain HTML template.
- Install Three.js and OrbitControls.
- Define maps collection with mapDefinition schema (JSON describing planes, boxes, etc.).
- Initialize camera, lighting, and ground plane.
- Parse mapDefinition to create basic shape meshes in the scene.
- Verify local build, map geometry loading, and rendering.

**Week 2: Backend & Data Fetch**  
Deliverable: Define schema and fetch initial data.

**TODOs:**

- Set up PocketBase (or SpacetimeDB) instance.
- Define points and users collections.
- Seed dummy records for testing.
- Implement REST API calls to fetch collections on load.

**Week 3: Real-Time Integration**  
Deliverable: Subscribe to real-time updates.

**TODOs:**

- Establish WebSocket connection.
- Subscribe to change events for both collections.
- Handle create/update events to add/move markers.
- Test synchronization across multiple clients.

**Week 4: Simulation UI & Testing**  
Deliverable: Build simulation page and end-to-end QA.

**TODOs:**

- Create /simulate page with entity controls.
- Emit position/status updates via WebSocket.
- Ensure updates reflect in the 3D view instantly.
- Conduct cross-browser and multi-tab tests.
- Prepare deployment scripts.

## 10. Timeline & Milestones

- **Week 1:** Project Setup & Core Scene
- **Week 2:** Backend & Data Fetch
- **Week 3:** Real-Time Integration
- **Week 4:** Simulation UI & Testing

## 11. Future Enhancements

- Evaluate advanced features of SpacetimeDB for peer-to-peer syncing.
- Add authentication & role-based access (admin vs. viewer).
- Integrate GIS maps or BIM models for realistic site layouts.
- Extend to mobile-optimized controls and touch gestures.

```

```
